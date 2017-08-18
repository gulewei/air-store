var isarray = require('isarray')
var isobject = require('isobject')
// var extend = require('extend')

var _ = {
  // extend: extend,
  isobj: isobject,
  isfn: function (fn) {
    return typeof fn === 'function'
  },
  noop: function () {

  },
  clone: function (val) {
    if (isarray(val)) {
      return Array.prototype.slice.call(val)
    } else if (isobject(val)) {
      return JSON.parse(JSON.stringify(val))
    } else {
      return val
    }
  }
}

module.exports = _
