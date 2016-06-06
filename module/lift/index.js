var flyd = require('../../lib');

module.exports = flyd.curryN(2, function(f, streams) {
  var vals = [];
  return flyd.combine(function() {
    for (var i = 0; i < streams.length; ++i) vals[i] = streams[i]();
    return f.apply(null, vals);
  }, streams);
});
