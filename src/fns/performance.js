module.exports = function(testFunction, iterations) {

  'use strict';
  
  var sum = 0;
  var start = performance.now();

  for (var i = 0; i < iterations; i++) {
    testFunction();
  }

  var time = performance.now() - start;
  return time;

};
