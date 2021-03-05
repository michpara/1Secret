import asyncio
import tornado.httputil as httputil
import tornado.httpserver
import tornado.ioloop
import tornado.web
from typing import Any

from tornado.platform.asyncio import AsyncIOMainLoop


class GenerateHandler(tornado.web.RequestHandler):

    def set_default_headers(self) -> None:
        self.set_header("Content-Type", "application/json")

    def write_error(self, status_code: int, **kwargs: Any) -> None:
        self.set_header("Content-Type", "application/problem+json")
        title = httputil.responses.get(status_code, "Unknown")
        message = kwargs.get("message", self._reason)
        self.set_status(status_code)
        response_error = {"status": status_code, "title": title, "message": message}
        self.finish(response_error)

    def post(self):
        print("Received a post request")
        pass


class NotFoundHandler(GenerateHandler):
    """
    Base handler for all invalid routes
    """

    async def prepare(self):
        self.write_error(status_code=404, message="Invalid Path")


def get_routes():
    routes = [
        (r"/api/generate", GenerateHandler),
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