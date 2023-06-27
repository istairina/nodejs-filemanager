import { invalid, failed } from "../constants/messages.js";
import { getArgs } from "../utils/getArgs.js";
import { validateArgs } from "../utils/validateArgs.js";
import path from "path";
import fs from "fs";

export const mv = (data) => {
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
      invalid("choose file to move");
      return;
    }
    fs.stat(destination, (err, stats) => {
      if (err) {
        failed();
        return;
      }
      if (!stats.isDirectory()) {
        invalid("choose folder for destination");
        return;
      }
      const newFile = path.resolve(destination, path.basename(originalFile));
      fs.open(newFile, (err) => {
        if (!err) {
          failed("file already exist");
          return;
        }
        const readable = fs.createReadStream(originalFile);
        const writable = fs.createWriteStream(newFile);
        try {
          readable.pipe(writable);
          writable.on("finish", () => {
            fs.unlink(originalFile, (err) => {
              if (err) failed();
            });
          });
        } catch (err) {
          failed();
        }
      });
    });
  });
};
