import { INVALID, FAILED } from "../constants/errors.js";
import path from 'path';

export const up = (data) => {
    if (data.length > 1) {
        process.stdout.write(`${INVALID}: the command should be without parameters`);
        return;
    };
    if (path.parse(process.cwd()).root !== process.cwd()) {
        process.chdir(path.join(process.cwd(), '..'));
    };
    process.stdout.write(`You are currently in ${process.cwd()}\n`);
}
