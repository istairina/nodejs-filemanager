import { createReadStream, createWriteStream } from "fs";
import { createBrotliDecompress } from "zlib";
import path from "path";
import { pipeline } from "stream";
import { invalid, failed } from "../constants/messages.js";

export const decompress = (data) => {
  if (data.length != 3) {
    invalid("wrong number of arguments");
    return;
  }

  const sourcePath = path.resolve(process.cwd(), data[1]);
  const destPath = path.resolve(process.cwd(), data[2]);
  const source = createReadStream(sourcePath);
  const destination = createWriteStream(destPath);

  pipeline(source, createBrotliDecompress(), destination, (err) => {
    if (err) {
      failed();
      return;
    }
  });
};
