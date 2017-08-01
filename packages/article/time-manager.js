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
    },
    saveToFile: () => {

      const marks = performance.getEntriesByType("mark");
      const times = marks.map((item) => item.startTime);
      const max = Math.max.apply(null, times);
      const min = Math.min.apply(null, times);
      const data = `${min}\t${max}\t${max-min}`;

      console.log(data);
      // const timeDiff = marks[1].startTime - marks[0].startTime;
      // console.log("timeDiff", timeDiff);
      //
      // const data = `${marks[0].startTime}\t${marks[1].startTime}\t${timeDiff}`;

      // console.log(data);
    }
  }
}

export default new Manager();
