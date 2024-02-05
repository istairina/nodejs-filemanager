import { invalid, failed } from "../constants/messages.js";
import { getArgs } from "../utils/getArgs.js";
import { validateArgs } from "../utils/validateArgs.js";
import path from "path";
import fs from "fs";

export const add = (data) => {
  const args = getArgs(data);
  if (!validateArgs(args, 1)) {
    invalid("wrong number of args");
    return;
  }
  const pathFile = path.resolve(process.cwd(), args[0]);
  fs.open(pathFile, "wx", (err, file) => {
    if (err) {
      failed("file exists or folder doesn't");
      return;
    }
    process.stdout.write(`${args[0]} file has been created\n`);
  });
};
