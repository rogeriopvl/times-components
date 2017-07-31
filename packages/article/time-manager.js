const Manager = function () {
  var time = [];

  return {
    addTime: (first, last) => {
      var item = {
        first,
        last,
        diff: last - first
      }
      time.push(item);
      console.log(time);
    },
    getTimes: () => {
      return time;
    }
  }
}

export default new Manager();
