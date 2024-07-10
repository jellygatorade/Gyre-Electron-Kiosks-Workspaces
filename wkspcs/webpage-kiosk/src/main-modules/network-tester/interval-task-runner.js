/****************************************************
 * Track a list of class instances in a static class
 ****************************************************/

// No need for constructor function since all methods are static
// No need for "this" keyword because static methods are called on the class, not the instance
class intervalTaskRunner {
  // Public fields --------------------------------------------

  static tasks = [];

  // Public Methods -------------------------------------------

  static start({ task, immediately }) {
    if (task.intervalId) {
      console.warn("task is already running", task);
      return;
    }

    if (immediately) {
      task.func(...task.args);
    }

    const intervalId = setInterval(task.func, task.intervalTime, ...task.args);
    task.intervalId = intervalId;
  }

  static stop({ task }) {
    if (!task.intervalId) {
      console.warn("task is not running", task);
      return;
    }

    clearInterval(task.intervalId);
    task.intervalId = null;
  }

  // Private Methods ------------------------------------------
}

/*****************************************
 * The task class for instancing
 *****************************************/

class intervalTask {
  // Constructor ----------------------------------------------

  constructor(func, intervalTime, ...args) {
    this.func = func;
    this.intervalTime = intervalTime;
    this.args = args;

    this.intervalId = null;

    // Store in list of tasks
    intervalTaskRunner.tasks.push(this);
  }

  // Methods --------------------------------------------------

  run() {
    this.func(...this.args);
  }
}

// Usage ------------------------------------------------------

module.exports.intervalTask = intervalTask;
module.exports.intervalTaskRunner = intervalTaskRunner;
