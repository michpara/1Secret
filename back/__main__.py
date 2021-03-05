import time
import asyncio
import tornado.httputil as httputil
import tornado.httpserver
import tornado.ioloop
import tornado.escape
import tornado.web
import urllib.parse
import json
import time

from typing import Any

from onepasswordconnectsdk.client import (
    Client,
    new_client_from_environment
)

import onepasswordconnectsdk.models
from onepasswordconnectsdk.models import FullItemAllOfFields

from tornado.platform.asyncio import AsyncIOMainLoop

import json

valid_expiry_times = [
    0.5 * 60, # 30 seconds
    15 * 60,
    30 * 60,
    1 * 60 * 60,
    6 * 60 * 60,
    12 * 60 * 60,
    24 * 60 * 60,
]

class OneConnectInterface():
    def __init__(self):
        self.vault_id = "e2x45ok2bxzfdcla3yo5careme"
        self.notes_vault_id = "vlgdgyczs2parhhs2aw3ihpclq"
        self.client: Client = new_client_from_environment(
            "http://decode2021.cohix.ca:8080/")
        
        print(self.client.get_items(self.notes_vault_id))

    def check_existence(self, vault_id: str, item_id: str):
        try:
            self.client.get_item(item_id=item_id, vault_id=vault_id)
        except Exception:
            return False
        # check if it exists, return bool
        return True

    def get_item(self, vault_id: str, item_id: str):
        try:
            item = self.client.get_item(item_id=item_id, vault_id=vault_id)
        except Exception:
            return None
        return item

    def get_secure_note(self, item_title: str):
        try:
            item = self.client.get_item(item_id=item_title, vault_id=self.notes_vault_id)
            return item
        except Exception:
            return None


    def create_item(self, vault_id: str, item_id: str, exp: int):
        exp_time = int(time.time()) + exp

        try:
            body = {
                "item": item_id,
                "vault": vault_id,
                "expires": exp_time
            }


            created_item = onepasswordconnectsdk.models.FullItem(
                                                        title=item_id,
                                                        category="SECURE_NOTE",
                                                        fields=[FullItemAllOfFields(value=json.dumps(body),
                                                                                     purpose="NOTES")]
                                                        )

            stored_item = self.client.create_item(vault_id=self.notes_vault_id, item=created_item)

            return stored_item, exp_time

        except Exception:
            return False

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

            expiry_time = int(expiry_time)

            if expiry_time < 0 or expiry_time not in valid_expiry_times:
                raise ValueError("Invalid expiry_time")

            link = data.get("link", None)
            if not link:
                raise ValueError("Invalid link")

            query_params = dict(urllib.parse.parse_qsl(urllib.parse.urlsplit(link).query))
            item_id = query_params.get("i")
            vault_id = query_params.get("v")
            if not one_connect_instance.check_existence(vault_id=vault_id, item_id=item_id):
                raise ValueError("Invalid link")

            # Will return either the stored_item or false - false will error on next step and go to except
            stored_item, exp_time = one_connect_instance.create_item(vault_id, item_id, expiry_time)
            self.finish({
                    "id": stored_item.id,
                    "expiry_time": exp_time
                })

        except ValueError as e:
            self.write_error(status_code=400, message=str(e))
        except Exception as e:
            self.write_error(status_code=500, message=str(e))

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

        try:
            item = one_connect_instance.get_secure_note(secret_id)
            if not item:
                raise ValueError()

            item_attributes = json.loads(item.fields[0].value)
            if int(time.time()) > item_attributes['expires']:
                raise ValueError()

            content_item = one_connect_instance.get_item(item_attributes['vault'], item_attributes['item'])
            if not content_item:
                raise ValueError()

            self.write(json.dumps(content_item.to_dict()['fields']))

        except Exception:
            self.write_error(status_code=404, message="Invalid")


class NotFoundHandler(GenerateHandler):
    """
    Base handler for all invalid routes
    """

    async def prepare(self):
        self.write_error(status_code=404, message="Invalid Path")


def get_routes():
    routes = [
        (r"/api/v1/generate", GenerateHandler),
        (r"/api/v1/secret/([a-z0-9]{26})", SecretHandler)
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

def delete_expired(self, vault_id):
    print("hi")
    notes = self.client.get_items(self.notes_vault_id)
    for note in notes:
        secret_data = self.client.get_item(note.id, self.notes_vault_id)
        note_attributes = json.loads(secret_data.fields[0].value)
        print(time.time())
        if int(time.time()) > note_attributes['expires']:
            self.client.delete_item(note.id, self.notes_vault_id)
def main():
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

