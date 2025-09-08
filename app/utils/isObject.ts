export function isPlainObject(val: unknown) {
  return Object.prototype.toString.call(val) === "[object Object]";
}
