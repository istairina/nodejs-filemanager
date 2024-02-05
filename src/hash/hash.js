import { createHash } from "crypto";
import fs from "fs/promises";
import path from "path";
import { invalid, failed } from "../constants/messages.js";
import { getArgs } from "../utils/getArgs.js";
import { validateArgs } from "../utils/validateArgs.js";

export const hash = async (data) => {
  const args = getArgs(data);
  if (!validateArgs(args, 1)) {
    invalid("wrong number of args");
    return;
  }
  const pathToFile = path.resolve(process.cwd(), args[0]);
  try {
    const fileContent = await fs.readFile(pathToFile);
    const hash = createHash("sha256").update(fileContent);
    process.stdout.write(`Hash for ${args[0]} is ${hash.digest("hex")}\n`);
  } catch (err) {
    failed();
  }
};
