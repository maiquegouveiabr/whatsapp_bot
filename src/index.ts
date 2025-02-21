import qrcode from "qrcode";
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
  puppeteer: {
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--disable-gpu",
    ],
  },
  authStrategy: new LocalAuth(),
});

client.on("qr", async (qr) => {
  try {
    const qrImage = await qrcode.toDataURL(qr); // Convert QR to Base64 image
    console.log("Scan this QR Code:", qrImage); // Log the Base64 image link
  } catch (err) {
    console.error("Error generating QR Code:", err);
  }
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
