# CircularBuffer for JavaScript and TypeScript

Ring / circular buffer examples:
- fixed capacity
- overwrite vs reject policies
- async producer–consumer

## Topics

- [1-naive.js](JavaScript/1-naive.js) — naïve Array-based buffer (`shift` is O(n))
- [2-fixed.js](JavaScript/2-fixed.js) — fixed ring buffer with head/tail indices
- [3-overwrite.js](JavaScript/3-overwrite.js) — drop oldest when full
- [4-reject.js](JavaScript/4-reject.js) — refuse writes when full
- [5-async.js](JavaScript/5-async.js) — async put/take over a ring buffer
