export default (attrs = {}, props = {}, eventArgs = []) =>
  Object.entries(attrs)
    .map(([key, value]) => ({
      [key]: typeof value === "function" ? value(props, eventArgs) : value
    }))
    .reduce((accum, entry) => ({ ...accum, ...entry }), {});
