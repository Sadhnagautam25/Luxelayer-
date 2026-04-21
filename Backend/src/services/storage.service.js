import ImageKit from "imagekit";
import { config } from "../config/config.js";

const client = new ImageKit({
  publicKey: config.IMAGEKIT.PUBLIC_KEY,
  privateKey: config.IMAGEKIT.PRIVATE_KEY,
  urlEndpoint: config.IMAGEKIT.URL_ENDPOINT,
});

const uploadFile = async ({ buffer, fileName, folder = "" }) => {
  const response = await client.upload({
    file: buffer,
    fileName,
    folder,
  });

  return response;
};

export default uploadFile;