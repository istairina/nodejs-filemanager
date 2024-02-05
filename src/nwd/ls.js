import { invalid, failed } from "../constants/messages.js";
import { getArgs } from "../utils/getArgs.js";
import { validateArgs } from "../utils/validateArgs.js";
import fs from "fs";

export const ls = (data) => {
  const args = getArgs(data);
  if (!validateArgs(args, 0)) {
    invalid("the command should be without parameters");
    return;
  }
  const arrFiles = [];
  const arrDirs = [];
  const arrLinks = [];
  class folderContent {
    constructor(name, type) {
      this.Name = name;
      this.Type = type;
    }
  }

  fs.readdir(process.cwd(), { withFileTypes: true }, (err, files) => {
    if (err) {
      failed();
    }

    files.forEach((file) => {
      if (file.isFile()) {
        arrFiles.push(new folderContent(file.name, "file"));
      } else if (file.isSymbolicLink()) {
        arrLinks.push(new folderContent(file.name, "link"));
      } else {
        arrDirs.push(new folderContent(file.name, "directory"));
      }
    });
    arrDirs.sort((a, b) => {
      return a - b;
    });
    arrFiles.sort((a, b) => {
      return a - b;
    });
    arrLinks.sort((a, b) => {
      return a - b;
    });
    const dataTable = arrDirs.concat(arrFiles).concat(arrLinks);
    return dataTable.length === 0 ? console.log('The folder is empty') : console.table(dataTable);
  });
};
