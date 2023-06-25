import { invalid, failed } from "../constants/messages.js";
import { getArgs } from "../utils/getArgs.js";
import { validateArgs } from "../utils/validateArgs.js";
import path from "path";
import fs from "fs";

export const cp = (data) => {
  const args = getArgs(data);
  if (!validateArgs(args, 2)) {
    invalid("wrong number of args");
    return;
  }

  const originalFile = path.resolve(process.cwd(), args[0]);
  const destination = path.resolve(process.cwd(), args[1]);
  fs.stat(originalFile, (err, stats) => {
    if (err) {
      failed();
      return;
    }
    if (!stats.isFile()) {
      invalid("type a file name to copy");
      return;
    }
    fs.stat(destination, (err, stats) => {
      if (err) {
        failed();
        return;
      }
      if (!stats.isDirectory()) {
        invalid("type a folder for destination");
        return;
      }
      const newFile = path.resolve(destination, path.basename(originalFile));
      const readable = fs.createReadStream(originalFile);
      const writable = fs.createWriteStream(newFile);
      readable.pipe(writable);
      readable.on("error", () => failed());
      writable.on("error", () => failed());
    });
  });
};
