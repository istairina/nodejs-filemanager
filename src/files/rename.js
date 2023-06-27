import { invalid, failed } from "../constants/messages.js";
import { getArgs } from "../utils/getArgs.js";
import { validateArgs } from "../utils/validateArgs.js";
import path from "path";
import fs from "fs";

export const rn = (data) => {
  const args = getArgs(data);
  if (!validateArgs(args, 2)) {
    invalid("wrong number of args");
    return;
  }
  const pathFile = path.resolve(process.cwd(), args[0]);
  const pathNewFile = path.resolve(path.dirname(pathFile), args[1]);
  if (path.basename(pathNewFile) != args[1]) {
    invalid("type just a new name without path");
    return;
  }

  fs.rename(pathFile, pathNewFile, (err) => {
    if (err) {
      failed();
    } else {
      console.log(`'${args[0]}' has been renamed to '${args[1]}'`);
    }
  });
};
