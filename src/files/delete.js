import { invalid, failed } from "../constants/messages.js";
import { getArgs } from "../utils/getArgs.js";
import { validateArgs } from "../utils/validateArgs.js";
import path from "path";
import fs from "fs";

export const rm = (data) => {
  const args = getArgs(data);
  if (!validateArgs(args, 1)) {
    invalid("wrong number of args");
    return;
  }
  const pathFile = path.resolve(process.cwd(), args[0]);
  fs.stat(pathFile, (err, stats) => {
    if (err) {
      failed();
      return;
    }
    if (!stats.isFile()) {
      invalid("choose file to delete");
      return;
    }

    fs.unlink(pathFile, (err) => {
      if (err) {
        failed();
      }
    });
  });
};
