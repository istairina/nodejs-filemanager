import { createHash } from "crypto";
import fs from "fs/promises";
import path from "path";
import { currDir } from "../index.js";
import { INVALID, FAILED } from "../constants/errors.js";

export const hash = async (data) => {
    if (data.length != 2) {
        process.stdout.write(`${FAILED}\n`);
        return;
    };
    const pathToFile = path.resolve(currDir, data[1]);
    try {
        const fileContent = await fs.readFile(pathToFile);
        const hash = createHash("sha256").update(fileContent);
        process.stdout.write(`${hash.digest("hex")}\n`);
    }
    catch (err) {
        process.stdout.write(`${INVALID}\n`);
    }
};


