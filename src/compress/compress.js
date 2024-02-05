import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress } from "zlib";
import path from "path";
import { pipeline } from "stream";
import { invalid, failed } from "../constants/messages.js";
import { getArgs } from "../utils/getArgs.js";
import { validateArgs } from "../utils/validateArgs.js";

export const compress = (data) => {
  const args = getArgs(data);
  if (!validateArgs(args, 2)) {
    invalid("wrong number of args");
    return;
  }
  const source = createReadStream(path.resolve(process.cwd(), args[0]));
  const destination = createWriteStream(path.resolve(process.cwd(), args[1]));

  pipeline(source, createBrotliCompress(), destination, (err) => {
    if (err) {
      failed();
      return;
    }
  });
};
