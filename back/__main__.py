import asyncio
import tornado.httputil as httputil
import tornado.httpserver
import tornado.ioloop
import tornado.escape
import tornado.web
import urllib.parse

from typing import Any

from onepasswordconnectsdk.client import (
    Client,
    new_client_from_environment
)

from tornado.platform.asyncio import AsyncIOMainLoop

valid_expiry_times = [
    15 * 60, # 15 min
    30 * 60,
    45 * 60,
    60 * 60,
]

class OneConnectInterface():
    def __init__(self):
        self.vault_id = "e2x45ok2bxzfdcla3yo5careme"
        self.client: Client = new_client_from_environment(
            "http://decode2021.cohix.ca:8080/")
        # items = self.client.get_items(self.vault_id)
        # for item in items:
        #     secret_data = self.client.get_item(item_id=item.id, vault_id=self.vault_id)
        #     print(secret_data)

    def check_existence(self, vault_id: str, item_id: str):
        try:
            self.client.get_item(item_id=item_id, vault_id=vault_id)
        except Exception:
            return False
        # check if it exists, return bool
        return True

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
        try:
            data = tornado.escape.json_decode(self.request.body)
            expiry_time = data.get("expiry_time", None)
            if not expiry_time:
                raise ValueError("Invalid expiry_time")

            # TODO: check expiry time is valid
            expiry_time = int(expiry_time)

            if expiry_time < 0 or expiry_time not in valid_expiry_times:
                raise ValueError("Invalid expiry_time")

            link = data.get("link", None)
            if not link:
                raise ValueError("Invalid link")

            query_params = dict(urllib.parse.parse_qsl(urllib.parse.urlsplit(link).query))
            item_id = query_params.get("v")
            vault_id = query_params.get("i")
            if not one_connect_instance.check_existence(item_id, vault_id):
                raise ValueError("Invalid link")

        except ValueError as e:
            self.write_error(status_code=400, message=str(e))
        except Exception as e:
            self.write_error(status_code=500, message=str(e))
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
    one_connect_instance.check_existence(item_id="12", vault_id="12")

    app = make_app()
    server = tornado.httpserver.HTTPServer(app)

    port = 8080
    if port:
        server.bind(port)

    server.start()
    asyncio.get_event_loop().run_forever()


one_connect_instance = OneConnectInterface()

if __name__ == "__main__":
    AsyncIOMainLoop().install()
    main()

