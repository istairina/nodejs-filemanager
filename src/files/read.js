import { invalid, failed } from "../constants/messages.js";
import path from "path";
import fs from "fs";

export const cat = (formatData) => {
  if (formatData.length != 2) {
    invalid("wrong number of arguments");
    return;
  }

  const checkFile = path.resolve(process.cwd(), formatData[1]);
  fs.stat(checkFile, (err) => {
    if (!err) {
      const fileStream = fs.createReadStream(checkFile);
      fileStream.on("data", (chunk) => process.stdout.write(chunk));
      fileStream.on("error", () =>
        failed("can't read the file or it's a folder")
      );
      fileStream.on("end", () => process.stdout.write(`\n`));
    } else if (err.code === "ENOENT") {
      failed("there is no such file");
    } else {
      failed();
    }
  });
};
