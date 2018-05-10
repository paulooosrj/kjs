const core = require('./core/core');

((khan) => {
    if (!khan) window["Khan"] = core.initialize;
})(window["Khan"]);

module.exports = window["Khan"];
