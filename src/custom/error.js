class CustomError extends Error {
 constructor(c, message) {
  super(message);
  this.c = c;
 }
}

module.exports = CustomError;
