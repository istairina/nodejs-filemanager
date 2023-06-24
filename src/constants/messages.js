export const failed = (message) => {
  console.log(`Operation failed${message ? ": " + message : ""}`);
};

export const invalid = (message) => {
  console.log(`Invalid input${message ? ": " + message : ""}`);
};

export const currentDir = () =>
  console.log(`You are currently in ${process.cwd()}`);
