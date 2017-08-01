import fs from 'fs';

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
      const timeDiff = marks[1].startTime - marks[0].startTime;
      console.log("timeDiff", timeDiff);

      const data = `${marks[0].startTime}\t${marks[1].startTime}\t${timeDiff}`;

      console.log(data);
    }
  }
}

export default new Manager();
