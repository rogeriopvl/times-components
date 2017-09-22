export default (attrs = () => ({}), props = {}, eventArgs = []) =>
  typeof attrs === "function" ? attrs(props, eventArgs) : {};
