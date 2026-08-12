'use strict';

// Async producer–consumer
// over a fixed ring buffer with waiters

class AsyncRingBuffer {
  constructor(capacity) {
    this.capacity = capacity;
    this.buffer = new Array(capacity);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
    this.waiters = { put: [], take: [] };
  }

  #wake(kind) {
    const next = this.waiters[kind].shift();
    if (next) next();
  }

  put(value) {
    return new Promise((resolve) => {
      const tryPut = () => {
        if (this.length < this.capacity) {
          this.buffer[this.tail] = value;
          this.tail = (this.tail + 1) % this.capacity;
          this.length++;
          this.#wake('take');
          resolve(true);
          return;
        }
        this.waiters.put.push(tryPut);
      };
      tryPut();
    });
  }

  take() {
    return new Promise((resolve) => {
      const tryTake = () => {
        if (this.length > 0) {
          const value = this.buffer[this.head];
          this.buffer[this.head] = undefined;
          this.head = (this.head + 1) % this.capacity;
          this.length--;
          this.#wake('put');
          resolve(value);
          return;
        }
        this.waiters.take.push(tryTake);
      };
      tryTake();
    });
  }
}

// Usage

const channel = new AsyncRingBuffer(2);
const messages = ['Meditations', 'Letters', 'Discourses', 'Enchiridion'];

const producer = async () => {
  for (const msg of messages) {
    await channel.put(msg);
    console.log('produced:', msg);
  }
};

const consumer = async () => {
  for (let i = 0; i < messages.length; i++) {
    const msg = await channel.take();
    console.log('consumed:', msg);
  }
};

const main = async () => {
  await Promise.all([producer(), consumer()]);
  console.log('done');
};

main();
