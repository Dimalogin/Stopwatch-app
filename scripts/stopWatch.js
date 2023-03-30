export class StopWatch {
  // Properties
  startTime;
  stopTime;
  isRunning = false;
  firstTime = true;
  lastTime;
  firstStart = true;
  times = [];
  results = [];

  // Methods

  start() {
    this.startTime = Date.now();
    this.isRunning = true;
  }

  stop() {
    this.stopTime = Date.now();
    this.isRunning = false;
    this.getFullTime();
  }

  getFirstTime() {
    if (this.isRunning) {
      return Date.now() - this.startTime;
    } else {
      return this.stopTime ? this.stopTime - this.startTime : 0;
    }
  }

  getTime() {
    if (this.isRunning) {
      if (this.times.length === 1) {
        return Date.now() - (this.startTime - this.times[0]);
      } else {
        let fullTime = this.getSumAllTime();

        return Date.now() - (this.startTime - fullTime);
      }
    } else {
      let fullTime = this.getSumAllTime();

      return stopTime ? fullTime : 0;
    }
  }

  getSumAllTime() {
    let sum = 0;

    for (const iterator of this.times) {
      sum += iterator;
    }

    return sum;
  }

  getLastTime() {
    this.lastTime = Date.now() - this.startTime;
  }

  getFullTime() {
    this.times.push(this.lastTime);
  }

  reset() {
    this.startTime = Date.now();
    this.stopTime = undefined;
    this.results = [];
    this.times = [];
  }

  save() {
    if (this.firstTime) {
      this.results.push(this.getFirstTime());
    } else {
      this.results.push(this.getTime());
    }
  }
}
