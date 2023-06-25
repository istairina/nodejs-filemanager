export const validateArgs = (args, amount) => {
  if (args.length === amount) {
    return true;
  }
  return false;
};
