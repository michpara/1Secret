import asyncio
import tornado.httputil as httputil
import tornado.httpserver
import tornado.ioloop
import tornado.web
from typing import Any

from onepasswordconnectsdk.client import (
    Client,
    new_client_from_environment
)

from tornado.platform.asyncio import AsyncIOMainLoop

class OneConnectInterface():
    def __init__(self):
        self.vault_id = "e2x45ok2bxzfdcla3yo5careme"
        self.client: Client = new_client_from_environment(
            "http://decode2021.cohix.ca:8080/")
        items = self.client.get_items(self.vault_id)
        for item in items:
            secret_data = self.client.get_item(item_id=item.id, vault_id=self.vault_id)
            print(secret_data)

    def check_existence(self, item_id: str):
        # check if it exists, return bool
        pass

class GenerateHandler(tornado.web.RequestHandler):

    def set_default_headers(self) -> None:
        self.set_header("Content-Type", "application/json")
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, DELETE, OPTIONS')

    def write_error(self, status_code: int, **kwargs: Any) -> None:
        self.set_header("Content-Type", "application/problem+json")
        title = httputil.responses.get(status_code, "Unknown")
        message = kwargs.get("message", self._reason)
        self.set_status(status_code)
        response_error = {"status": status_code, "title": title, "message": message}
        self.finish(response_error)
        
    def post(self):
        pass

    def options(self):
        print("options")
        self.set_status(204)
        self.finish()

class SecretHandler(tornado.web.RequestHandler):

    def set_default_headers(self) -> None:
        self.set_header("Content-Type", "application/json")
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")

    def write_error(self, status_code: int, **kwargs: Any) -> None:
        self.set_header("Content-Type", "application/problem+json")
        title = httputil.responses.get(status_code, "Unknown")
        message = kwargs.get("message", self._reason)
        self.set_status(status_code)
        response_error = {"status": status_code, "title": title, "message": message}
        self.finish(response_error)

    def get(self, secret_id):
        print("Received a get request for {secret}".format(secret=secret_id))
        pass



class NotFoundHandler(GenerateHandler):
    """
    Base handler for all invalid routes
    """

    async def prepare(self):
        self.write_error(status_code=404, message="Invalid Path")


def get_routes():
    routes = [
        (r"/api/v1/generate", GenerateHandler),
        (r"/api/v1/secret/([a-z0-9]{32})", SecretHandler)
    ]
    return routes


def make_app():
    app = tornado.web.Application(
        get_routes(),
        debug=True,
        xsrf_cookies=False,
        default_handler_class=NotFoundHandler,
    )
    return app


def main():

    app = make_app()
    server = tornado.httpserver.HTTPServer(app)

    port = 8080
    if port:
        server.bind(port)

    server.start()
    asyncio.get_event_loop().run_forever()


if __name__ == "__main__":
    AsyncIOMainLoop().install()
    main()

