import { invalid, failed } from "../constants/messages.js";
import path from "path";
import fs from "fs";

export const add = (formatData) => {
  if (formatData.length != 2) {
    invalid("wrong number of args");
    return;
  }
  const pathFile = path.resolve(process.cwd(), formatData[1]);
  fs.open(pathFile, "wx", (err, file) => {
    if (err) {
      failed("file exists or folder doesn't");
      return;
    }
    process.stdout.write(`${formatData[1]} file has been created\n`);
  });
};
