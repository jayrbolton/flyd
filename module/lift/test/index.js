var assert = require('assert');
var flyd = require('../../../lib');
var stream = flyd.stream;
var lift = require('../index.js');

describe('lift', function() {
  it('applies a function to two streams', function() {
    var add = function(x, y) { return x + y; };
    var x = stream(3);
    var y = stream(4);
    var sum = lift(add, [x, y]);
    assert.equal(sum(), x() + y());
    x(12);
    assert.equal(sum(), x() + y());
    y(3);
    assert.equal(sum(), x() + y());
  });
  it('applies a function to five streams', function() {
    var add = function(a, b, c, d, e) { return a + b + c + d + e; };
    var a = stream(1);
    var b = stream(2);
    var c = stream(3);
    var d = stream(4);
    var e = stream(5);
    var sum = lift(add, [a, b, c, d, e]);
    assert.equal(sum(), a() + b() + c() + d() + e());
    e(12); d(2); b(0);
    assert.equal(sum(), a() + b() + c() + d() + e());
    a(3); c(3);
    assert.equal(sum(), a() + b() + c() + d() + e());
  });
  it('is backwards compatible with the splat parameters', function() {
    const x = stream(3);
    const y = stream(4);
    const sum = lift((n1, n2) => n1 + n2, x, y);
    assert.equal(sum(), x() + y());
    x(12);
    assert.equal(sum(), x() + y());
    y(3);
    assert.equal(sum(), x() + y());
  })
});
