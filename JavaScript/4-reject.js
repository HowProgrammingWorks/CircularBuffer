'use strict';

// Reject-when-full

class RejectBuffer {
  constructor(capacity) {
    this.capacity = capacity;
    this.buffer = new Array(capacity);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  }

  tryEnqueue(value) {
    if (this.length === this.capacity) return false;
    this.buffer[this.tail] = value;
    this.tail = (this.tail + 1) % this.capacity;
    this.length++;
    return true;
  }

  enqueue(value) {
    if (!this.tryEnqueue(value)) {
      throw new Error('Buffer is full');
    }
  }

  dequeue() {
    if (this.length === 0) return undefined;
    const value = this.buffer[this.head];
    this.buffer[this.head] = undefined;
    this.head = (this.head + 1) % this.capacity;
    this.length--;
    return value;
  }
}

// Usage

const gate = new RejectBuffer(2);
console.log('admit Marcus:', gate.tryEnqueue('Marcus'));
console.log('admit Seneca:', gate.tryEnqueue('Seneca'));
console.log('admit Epictetus:', gate.tryEnqueue('Epictetus'));
console.log('passed:', gate.dequeue());
console.log('admit Epictetus:', gate.tryEnqueue('Epictetus'));
try {
  gate.enqueue('Crowded');
} catch (error) {
  console.log('rejected:', error.message);
}
