'use strict';

// Overwrite policy
// when full: drop the oldest item

class OverwriteBuffer {
  constructor(capacity) {
    this.capacity = capacity;
    this.buffer = new Array(capacity);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
    this.dropped = 0;
  }

  enqueue(value) {
    if (this.length === this.capacity) {
      this.head = (this.head + 1) % this.capacity;
      this.length--;
      this.dropped++;
    }
    this.buffer[this.tail] = value;
    this.tail = (this.tail + 1) % this.capacity;
    this.length++;
  }

  dequeue() {
    if (this.length === 0) return undefined;
    const value = this.buffer[this.head];
    this.buffer[this.head] = undefined;
    this.head = (this.head + 1) % this.capacity;
    this.length--;
    return value;
  }

  snapshot() {
    const items = [];
    for (let i = 0; i < this.length; i++) {
      items.push(this.buffer[(this.head + i) % this.capacity]);
    }
    return { items, dropped: this.dropped };
  }
}

// Usage

const log = new OverwriteBuffer(3);

const events = [
  'dawn-patrol',
  'senate-debate',
  'market-open',
  'grain-arrival',
  'night-watch',
];

for (const event of events) {
  log.enqueue(event);
  console.log(event, '->', log.snapshot());
}
