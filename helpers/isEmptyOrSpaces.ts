export default (str: string) => {
  return str === null || str.match(/^ *$/) !== null;
};
