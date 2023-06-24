import { failed, invalid } from "../constants/messages.js";
import path from "path";

export const cd = (formatData) => {
  if (formatData.length != 2) {
    invalid("wrong number of args");
    return;
  }

  const nextFolder = formatData[1];

  const checkDir = path.resolve(process.cwd(), nextFolder);
  try {
    process.chdir(checkDir);
  } catch (err) {
    failed();
  }
};
