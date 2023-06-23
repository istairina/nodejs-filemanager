import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress } from "zlib";
import path from "path";
import { pipeline } from "stream";
import { INVALID, FAILED } from "../constants/errors.js";


export const compress = (data) => {
    if (data.length != 3) {
        process.stdout.write(`${INVALID}: wrong number of args\n`);
        return;
    };
    const source = createReadStream(path.resolve(process.cwd(), data[1]));
    const destination = createWriteStream(path.resolve(process.cwd(), data[2]));

  pipeline(source, createBrotliCompress(), destination, (err) => {
    if (err) {
        process.stdout.write(`${FAILED}\n`);
        return;
    }
    console.log(`You are currently in ${process.cwd()}`);
  });
};
