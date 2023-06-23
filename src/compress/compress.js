import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress } from "zlib";
import path from "path";
import { currDir } from "../index.js";
import { pipeline } from "stream";
import { INVALID, FAILED } from "../constants/errors.js";


export const compress = async (data) => {
    if (data.length != 3) {
        process.stdout.write(`${FAILED}\n`);
        return;
    };
    const source = createReadStream(path.resolve(currDir, data[1]));
    const destination = createWriteStream(path.resolve(currDir, data[2]));

  pipeline(source, createBrotliCompress(), destination, (err) => {
    if (err) {
        process.stdout.write(`${FAILED}\n`);
        return;
    }
    console.log(`You are currently in ${currDir}`);
  });
};
