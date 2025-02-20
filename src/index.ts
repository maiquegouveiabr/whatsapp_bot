import qrcode from "qrcode-terminal";
import { Client, LocalAuth } from "whatsapp-web.js";

import sendDelay from "./util/sendDelay";
import allReferences from "./db/queries/allReferences";
import {
  RESPONSE_MENU_1,
  RESPONSE_MENU_2,
  RESPONSE_MENU_3,
  RESPONSE_MENU_AREA_REFERENCE,
  RESPONSE_START,
} from "./util/responses";
import allReferencesToday from "./db/queries/allReferencesToday";
import { checkIfAreaExists } from "./util/areas";

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready.");
});

client.on("message", async (message) => {
  const content = message.body;
  const chatId = message.from;
  const chat = await message.getChat();

  await sendDelay(2000);
  await chat.sendStateTyping();
  await sendDelay(2000);

  if (content === "/start") {
    client.sendMessage(chatId, RESPONSE_START);
  } else if (content === "1") {
    const references = await allReferences();
    client.sendMessage(chatId, RESPONSE_MENU_1(references.length));
  } else if (content === "2") {
    const references = await allReferencesToday();
    client.sendMessage(chatId, RESPONSE_MENU_2(references));
  } else if (content === "3") {
    const response = await RESPONSE_MENU_3();
    client.sendMessage(chatId, response);
  } else if (checkIfAreaExists(Number(content))) {
    const response = await RESPONSE_MENU_AREA_REFERENCE(Number(content));
    client.sendMessage(chatId, response);
  } else {
    client.sendMessage(
      chatId,
      "Desculpe, ainda não conheço este comando. Por favor, digite '/start' para ver os comandos que conheço."
    );
  }
});

client.initialize();
