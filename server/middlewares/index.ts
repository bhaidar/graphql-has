import express = require('express');

export default [
  // Your middleware functions go here
  (req: express.Request, res: express.Response, next: () => void) => next(),
];
