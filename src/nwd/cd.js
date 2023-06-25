import { failed, invalid } from "../constants/messages.js";
import { getArgs } from "../utils/getArgs.js";
import { validateArgs } from "../utils/validateArgs.js";
import path from "path";

export const cd = (data) => {
  const args = getArgs(data);
  console.log(args);
  if (!validateArgs(args, 1)) {
    invalid("wrong number of args");
    return;
  }

  const checkDir = path.resolve(process.cwd(), args[0]);
  try {
    process.chdir(checkDir);
  } catch (err) {
    failed();
  }
};
