import { invalid } from "../constants/messages.js";
import path from "path";

export const up = (data) => {
  if (data.length > 1) {
    invalid("the command should be without parameters");
    return;
  }
  if (path.parse(process.cwd()).root !== process.cwd()) {
    process.chdir(path.join(process.cwd(), ".."));
  }
};
