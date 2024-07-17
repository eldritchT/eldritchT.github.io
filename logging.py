from pyrogram import Client, types
from rich.console import Console

class UBFWMod:
    app = Client
    def __init__(self, client: Client, console: Console | None = None):
        self.app = client
        self.mod_name = "Logging"
        self.mod_author = "eldritchT"
        self.mod_desc = "Логирование обработчиков с помощью <a href=\"https://github.com/Textualize/rich\">rich</a>"
        self.mod_version = "1.0"
        self.console = console
        self.commands = []

    def handler(self, __: Client, message: types.Message):
        self.console.log(f"Message {message.id} handled")