import { invalid } from "../constants/messages.js";
import { getArgs } from "../utils/getArgs.js";
import { validateArgs } from "../utils/validateArgs.js";
import path from "path";

export const up = (data) => {
  const args = getArgs(data);
  if (!validateArgs(args, 0)) {
    invalid("the command should be without parameters");
    return;
  }
  if (path.parse(process.cwd()).root !== process.cwd()) {
    process.chdir(path.join(process.cwd(), ".."));
  }
};
