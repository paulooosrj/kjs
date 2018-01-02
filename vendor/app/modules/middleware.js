class Middleware {
  
  use(fn) {
    this.go = (stack => next => stack(fn.bind(this, next.bind(this))))(this.go);
  }

  go(next){ return next(); }

}

module.exports = Middleware;