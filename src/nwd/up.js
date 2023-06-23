import { currDir, setCurrDir } from "../index.js";
import { INVALID, FAILED } from "../constants/errors.js";
import path from 'path';

export const up = (data) => {
    if (data.length > 1) {
        process.stdout.write(`${INVALID}: the command should be without parameters`);
        return;
    }
    if (path.parse(currDir).root !== currDir) {
        setCurrDir(path.join(currDir, '..'));
    };
    process.stdout.write(`You are currently in ${currDir}\n`);
}
