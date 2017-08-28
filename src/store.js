var _ = require('./utils')
var unique = require('./unique')

function store(properties) {
  var _store = {}

  // check arguments
  if (!_.isobj(properties)) {
    return console.error('Air can only initialize key-value pires')
  }

  // init
  var param = null
  for (var key in properties) {
    param = properties[key]
    _store[key] = unique(param.value, param.watcher, param.computer)
  }

  var getContext = function () {
    var context = {}
    for (var name in _store) {
      context[name] = _store[name].getValue()
    }
    return context
  }

  // return methods
  return {
    get: function (name) {
      var item = _store[name]
      if (item.isComputed) {
        var getter = item.getComputer()
        var context = getContext()
        var val = getter.call(undefined, context)
        item.setValue(val)
      }
      return item.getValue()
    },
    set: function (name, val) {
      // uninitialized property
      var item = _store[name]
      if (!item || !item.unique) {
        return console.error('uninitialized property "%s" can not be set', name)
      }

      // computed property
      if (item.isComputed) {
        return console.warn('set computed property "%s" only does nothing', name)
      }

      // set new value
      item.setValue(val)
    }
  }
}

module.exports = store
