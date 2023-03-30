import { formatTimeDuration } from "./formatTimeDuration.js";
import { renderCycle } from "./renderCycle.js";

export class StopWatchView {
  stopWatch;
  displayElement = document.querySelector(".stopwatch__display");
  triggerButton = document.querySelector("#triggerBtn");
  saveButton = document.querySelector("#saveBtn");
  resetButton = document.querySelector("#resetBtn");
  resultsElement = document.querySelector(".stopwatch__results");
  stopCycle;

  handler(event) {
    if (event.target === this.triggerButton) {
      this.onTrigger();
    } else if (event.target === this.saveButton) {
      this.onSave();
    } else if (event.target === this.resetButton) {
      this.onReset();
    }
  }

  constructor(stopWatch) {
    this.stopWatch = stopWatch;
    this.triggerButton.addEventListener("click", this.handler.bind(this));
    this.saveButton.addEventListener("click", this.handler.bind(this));
    this.resetButton.addEventListener("click", this.handler.bind(this));
    this.renderTime(() => 0);
  }

  onTrigger() {
    if (this.stopWatch.isRunning) {
      this.triggerButton.textContent = "Start";
      this.stopWatch.stop();
      this.stopCycle();
      this.saveButton.disabled = true;
    } else {
      if (this.stopWatch.firstStart) {
        this.triggerButton.textContent = "Stop";
        this.saveButton.disabled = false;
        this.stopWatch.start();
        this.stopCycle = renderCycle(() => {
          this.renderTime(this.stopWatch.getFirstTime.bind(this.stopWatch));
          this.stopWatch.getLastTime();
        });
        this.stopWatch.firstStart = false;
      } else {
        this.triggerButton.textContent = "Stop";
        this.saveButton.disabled = false;
        this.stopWatch.start();
        this.stopCycle = renderCycle(() => {
          this.renderTime(this.stopWatch.getTime.bind(this.stopWatch));
          this.stopWatch.getLastTime();
        });
        this.stopWatch.firstTime = false;
      }
    }
  }

  renderTime(time) {
    this.displayElement.innerHTML = formatTimeDuration(time());
  }

  onReset() {
    this.stopWatch.reset();
    this.renderTime(() => 0);
    this.renderList();
  }

  onSave() {
    this.stopWatch.save();
    this.renderList();
  }

  renderList() {
    this.resultsElement.innerHTML = "";

    this.resultsElement.appendChild(
      this.stopWatch.results.reduce((elem, time) => {
        const li = document.createElement("li");

        li.textContent = formatTimeDuration(time);
        elem.appendChild(li);

        return elem;
      }, document.createDocumentFragment())
    );
  }
}
