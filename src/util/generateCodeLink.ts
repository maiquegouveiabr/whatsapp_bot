import QRCode from "qrcode";
import fs from "fs";

async function generateQRCodeImage(data: string, filePath: string) {
  try {
    await QRCode.toFile(filePath, data);
    console.log(`QR Code saved at: ${filePath}`);
  } catch (err) {
    console.error("Error generating QR code:", err);
  }
}
