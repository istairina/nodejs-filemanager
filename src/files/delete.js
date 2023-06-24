import { invalid, failed } from "../constants/messages.js";
import path from "path";
import fs from "fs";

export const rm = (formatData) => {
  if (formatData.length != 2) {
    invalid("wrong number of args");
    return;
  }
  const pathFile = path.resolve(process.cwd(), formatData[1]);
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
