var createModule = require('./module')

var _modules = {}

function initialModule(name, properties) {
  _modules[name] = createModule(properties)
}

function getModule(name) {
  if (_modules[name] === undefined) {
    return console.error('module "%s" has not been initialized')
  } else {
    return _modules[name]
  }
}

function Air(name, properties) {
  if (arguments.length > 1) {
    initialModule(name, properties)
  }

  return getModule(name)
}

// Air.action = function (module, actMap) {
//   // return function (value) {
//   //   module({[name]: value}, action)
//   // }
// }


module.exports = Air
