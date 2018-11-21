'use strict';

module.exports = function equals(actual, expected, description) {
  if (actual !== expected) {
    console.log(
      `Expected ${
        description ? `${description} to equal ` : ''
      }\`${expected}\` but got \`${actual}\``
    );
  }
};
