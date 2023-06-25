import { createReadStream, createWriteStream } from "fs";
import { createBrotliDecompress } from "zlib";
import path from "path";
import { pipeline } from "stream";
import { invalid, failed } from "../constants/messages.js";
import { getArgs } from "../utils/getArgs.js";
import { validateArgs } from "../utils/validateArgs.js";

export const decompress = (data) => {
  const args = getArgs(data);
  if (!validateArgs(args, 2)) {
    invalid("wrong number of args");
    return;
  }

  const sourcePath = path.resolve(process.cwd(), args[0]);
  const destPath = path.resolve(process.cwd(), args[1]);
  const source = createReadStream(sourcePath);
  const destination = createWriteStream(destPath);

  pipeline(source, createBrotliDecompress(), destination, (err) => {
    if (err) {
      failed();
      return;
    }
  });
};
