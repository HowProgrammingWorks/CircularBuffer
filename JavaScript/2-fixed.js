'use strict';

// Fixed-capacity ring buffer
// head/tail indices (O(1) ops)

class RingBuffer {
  constructor(capacity) {
    this.capacity = capacity;
    this.buffer = new Array(capacity);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  }

  get empty() {
    return this.length === 0;
  }

  get full() {
    return this.length === this.capacity;
  }

  enqueue(value) {
    if (this.full) throw new Error('Buffer is full');
    this.buffer[this.tail] = value;
    this.tail = (this.tail + 1) % this.capacity;
    this.length++;
  }

  dequeue() {
    if (this.empty) return undefined;
    const value = this.buffer[this.head];
    this.buffer[this.head] = undefined;
    this.head = (this.head + 1) % this.capacity;
    this.length--;
    return value;
  }

  toArray() {
    const result = [];
    for (let i = 0; i < this.length; i++) {
      result.push(this.buffer[(this.head + i) % this.capacity]);
    }
    return result;
  }
}

// Usage

const forum = new RingBuffer(4);
for (const speaker of ['Marcus', 'Seneca', 'Epictetus', 'Cleanthes']) {
  forum.enqueue(speaker);
}
console.log(forum.toArray());
console.log('next:', forum.dequeue());
forum.enqueue('Zeno');
console.log(forum.toArray());
console.log({ head: forum.head, tail: forum.tail, length: forum.length });
