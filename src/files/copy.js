import { invalid, failed } from "../constants/messages.js";
import path from "path";
import fs from "fs";

export const cp = (formatData) => {
  if (formatData.length != 3) {
    invalid("wrong number of args");
    return;
  }

  const originalFile = path.resolve(process.cwd(), formatData[1]);
  const destination = path.resolve(process.cwd(), formatData[2]);
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
