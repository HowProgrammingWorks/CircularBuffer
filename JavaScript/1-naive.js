'use strict';

// Naïve circular buffer on top of Array
// shift is O(n)

class NaiveBuffer {
  constructor(capacity) {
    this.capacity = capacity;
    this.items = [];
  }

  get size() {
    return this.items.length;
  }

  get empty() {
    return this.items.length === 0;
  }

  get full() {
    return this.items.length >= this.capacity;
  }

  enqueue(value) {
    if (this.full) throw new Error('Buffer is full');
    this.items.push(value);
  }

  dequeue() {
    if (this.empty) return undefined;
    return this.items.shift();
  }

  peek() {
    return this.items[0];
  }
}

// Usage

const scrolls = new NaiveBuffer(3);
for (const title of ['Meditations', 'Enchiridion', 'Letters']) {
  scrolls.enqueue(title);
}
console.log({ size: scrolls.size, peek: scrolls.peek() });
console.log(scrolls.dequeue());
console.log(scrolls.dequeue());
scrolls.enqueue('Discourses');
console.log([...scrolls.items]);
