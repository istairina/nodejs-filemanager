export const getArgs = (raw) => {
  if (raw.length === 1) return [];
  const rawArgs = raw.slice(1);
  const res = [];
  let tempArr = [];
  rawArgs.forEach((elem) => {
    if (elem[0] == "'") {
      tempArr.push(elem);
    } else if (tempArr.length > 0) {
      tempArr.push(elem);
      if (elem[elem.length - 1] == "'") {
        res.push(tempArr.join(" ").slice(1, -1));
        tempArr = [];
      }
    } else {
      res.push(elem);
    }
  });
  return res;
  // const rawArgs = raw.slice(1).join(" ");
  // if (rawArgs[0] == "'") {
  //   return raw
  //     .slice(1)
  //     .join(" ")
  //     .split(/'([^']+)'/g)
  //     .filter((elem) => {
  //       if (elem != false && elem !== " ") {
  //         return elem;
  //       } else return false;
  //     })
  //     .map((elem) => elem.trim());
  // }

  // return rawArgs.split(" ");
};
