export const failed = (message) => {
  console.log('\x1b[31m%s\x1b[0m', `Operation failed${message ? ": " + message : ""}`);
};

export const invalid = (message) => {
  console.log('\x1b[31m%s\x1b[0m', `Invalid input${message ? ": " + message : ""}`);
};

export const currentDir = () =>
  console.log('\x1b[34m%s\x1b[0m', `You are currently in ${process.cwd()}`);
