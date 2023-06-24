import { createHash } from "crypto";
import fs from "fs/promises";
import path from "path";
import { invalid, failed } from "../constants/messages.js";

export const hash = async (data) => {
  if (data.length != 2) {
    invalid("wrong number of args");
    return;
  }
  const pathToFile = path.resolve(process.cwd(), data[1]);
  try {
    const fileContent = await fs.readFile(pathToFile);
    const hash = createHash("sha256").update(fileContent);
    process.stdout.write(`Hash for ${data[1]} is ${hash.digest("hex")}\n`);
  } catch (err) {
    failed();
  }
};
