import { invalid, failed } from "../constants/messages.js";
import path from "path";
import fs from "fs";

export const rn = (formatData) => {
  if (formatData.length != 3) {
    invalid("wrong number of arguments");
    return;
  }
  const pathFile = path.resolve(process.cwd(), formatData[1]);
  const pathNewFile = path.resolve(process.cwd(), formatData[2]);
  if (path.basename(pathNewFile) != formatData[2]) {
    invalid("type just a new name without path");
    return;
  }
  fs.rename(pathFile, pathNewFile, (err) => {
    if (err) {
      failed();
    } else {
      console.log(`${formatData[1]} has been renamed to ${formatData[2]}`);
    }
  });
};
