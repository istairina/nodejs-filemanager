import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress } from "zlib";
import path from "path";
import { pipeline } from "stream";
import { invalid, failed } from "../constants/messages.js";

export const compress = (data) => {
  if (data.length != 3) {
    invalid("wrong number of arguments");
    return;
  }
  const source = createReadStream(path.resolve(process.cwd(), data[1]));
  const destination = createWriteStream(path.resolve(process.cwd(), data[2]));

  pipeline(source, createBrotliCompress(), destination, (err) => {
    if (err) {
      failed();
      return;
    }
  });
};
