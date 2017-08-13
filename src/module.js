var _ = require('./utils')
var store = require('./store')

function structureProps(properties) {
  var _props = {}

  var data = properties.data
  for (var key in data) {
    _props[key] = {
      value: data[key]
    }
  }

  var computed = properties.computed
  for (var k_0 in computed) {
    if (_props[k_0]) {
      _props[k_0].computer = computed[k_0]
    } else {
      _props[k_0] = {
        computer: computed[k_0]
      }
    }
  }

  var watcher = properties.watcher
  for (var k_1 in watcher) {
    if (_props[k_1]) {
      _props[k_1].watcher = watcher[k_1]
    } else {
      _props[k_1] = {
        watcher: watcher[k_1]
      }
    }
  }

  return _props
}

function createModule(initVals) {
  var _props = structureProps(initVals)
  var _store = store(_props)

  function air(properties, action) {
    // update module
    for (var key in properties) {
      _store.set(key, properties[key])
    }
    // call action
    if (_.isfn(action)) {
      action.call(undefined, air)
    }
  }

  for (var key in _props) {
    (function (k_0) {
      Object.defineProperty(air, key, {
        get: function () {
          return _store.get(k_0)
        },
        set: function () {
          console.error('can not resign value of Air properties')
        }
      })
    })(key)
  }

  return air
}

module.exports = createModule
