import os from "os";
import { invalid } from "../constants/messages.js";
import { getArgs } from "../utils/getArgs.js";

export const osx = (data) => {
  if (!validateArgs(data, 2)) {
    invalid("wrong number of args");
    return;
  }
  switch (data[1]) {
    case "--EOL":
      console.log(`${JSON.stringify(os.EOL)}`);
      break;
    case "--cpus":
      const cpus = os.cpus();
      console.log(`Total amount of CPUs is ${cpus.length}`);
      cpus.forEach((cpu, ind) => {
        const ghz = cpu.speed / 1000;
        console.log(
          `Processor #${ind + 1}: model ${cpu.model}, speed ${ghz} GHz`
        );
      });
      break;
    case "--homedir":
      console.log(`Home directory is ${os.homedir()}`);
      break;
    case "--username":
      console.log(`System username is ${os.userInfo().username}`);
      break;
    case "--architecture":
      console.log(`CPU architecture is ${os.arch()}`);
      break;
    default:
      invalid("wrong argument");
      break;
  }
};
