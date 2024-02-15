// Adding ability to pass arguments to queued function in 5th example

/****************************************************
 * Track a list of class instances in a static class
 ****************************************************/

// No need for constructor function since all methods are static
// No need for "this" keyword because static methods are called on the class, not the instance
class timedQueues {
  // Public fields --------------------------------

  static instances = [];

  // Public Methods -------------------------------

  static createInstance(id) {
    return new timedQueue(id);
  }

  static getInstance(id) {
    let instance = timedQueues.#_findInstanceOf(id);
    return instance;
  }

  static destroyInstance(id) {
    let index = timedQueues.#_findIndexOf(id);

    if (index > -1) {
      let instance = timedQueues.instances[index];
      console.log(`Destroying timedQueue - ${instance.id} !`);

      instance.clear(); // clear the task queue
      timedQueues.instances.splice(index, 1); // remove from list, 2nd param means remove one item only
      instance = null;
    } else {
      console.error("not found in timedQueues.instances?");
    }
  }

  // Private Methods -------------------------------

  static #_findIndexOf(id) {
    const hasThisId = (item) => item.id === id;
    const index = this.instances.findIndex(hasThisId);
    return index;
  }

  static #_findInstanceOf(id) {
    const hasThisId = (item) => item.id === id;
    const item = this.instances.find(hasThisId);
    return item;
  }
}

/*****************************************
 * The timed queue class for instancing
 *****************************************/

class timedQueue {
  // Constructor -----------------------------------

  constructor(id) {
    this.id = id;
    this.queue = [];
    this.task = null;
    this.timeoutId = null;
    this.done = true;

    // Important! _next() method must be bound and stored so that
    // this keyword within refers to the current instance of timedQueue
    // instead of the window object, because _next is called by window.setTimeout()
    this.next = this._next.bind(this);

    // Store in list of timedQueues
    timedQueues.instances.push(this);
  }

  // Methods ----------------------------------------

  _next() {
    // runs current scheduled task and  creates timeout to schedule next
    // is task scheduled?
    if (this.task !== null) {
      this.task.args ? this.task.func(...this.task.args) : this.task.func(); // run it
      this.task = null; // clear task
    }
    if (this.queue.length > 0) {
      // there are remaining tasks
      this.task = this.queue.shift(); // set next task
      this.timeoutId = setTimeout(this.next, this.task.time); // schedule task execution
    } else {
      this.done = true;
    }
  }

  add(func, time, args) {
    this.queue.push({ func: func, time: time, args: args });
  }

  start() {
    if (this.queue.length > 0 && this.done) {
      this.done = false; // set state flag
      this.timeoutId = setTimeout(this.next, 0); // schedule the first task immediately
    }
  }

  clear() {
    this.task = null; // remove pending task
    this.queue.length = 0; // empty queue
    clearTimeout(this.timeoutId); // clear timeout
    this.done = true; // set state flag
  }
}

// Usage ----------------------------------------

//   function test1() {
//     console.log("tq 1 run");
//   }
//   function test2(str1, str2) {
//     console.log(str1, str2);
//   }

//   timedQueues.createInstance("module");
//   timedQueues.getInstance("module").add(test1, 1000);
//   timedQueues
//     .getInstance("module")
//     .add(test2, 1000, ["one", timedQueues.instances]);
//   timedQueues.getInstance("module").add(test1, 3000);
//   timedQueues.getInstance("module").add(test2, 500, ["something"]);

//   timedQueues.getInstance("module").start();

//   console.log(timedQueues.instances);

//   setTimeout(timedQueues.destroyInstance, 5000, "module");

module.exports = timedQueues;
