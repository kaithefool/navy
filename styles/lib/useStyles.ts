
export const st = (styles, ...styleNames: string[]) => {
  const names = styleNames
    .flatMap((ns) => ns.split(' '))
    .map((n) => n.trim())
    .filter((n) => n);

  return Object.assign({}, ...names.map((n) => styles[n] || {}));
};

export default function useStyles() {

}