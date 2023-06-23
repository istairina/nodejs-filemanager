import { createReadStream, createWriteStream } from "fs";
import { createBrotliDecompress } from "zlib";
import path from "path";
import { pipeline } from "stream";
import { INVALID, FAILED } from "../constants/errors.js";


export const decompress = async (data) => {
    if (data.length != 3) {
        process.stdout.write(`${FAILED}\n`);
        return;
    };

    const sourcePath = path.resolve(process.cwd(), data[1]);
    const destPath = path.resolve(process.cwd(), data[2]);
    const source = createReadStream(sourcePath);
    const destination = createWriteStream(destPath);

  pipeline(source, createBrotliDecompress(), destination, (err) => {
    if (err) {
        process.stdout.write(`${FAILED}\n`);
        return;
    }
    console.log(`You are currently in ${process.cwd()}`);
  });
};
