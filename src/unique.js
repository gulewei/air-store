var _ = require('./utils')

function unique(value, watcher, computer) {
  var _value = null
  var _watcher = _.noop
  var _computer = null

  var unique = {
    unique: true,
    isComputed: false,
    getComputer: function () {
      return _computer
    },
    getValue: function () {
      return _.clone(_value)
    },
    setValue: function (val) {
      var oldVal = unique.getValue()
      var newVal = _.clone(val)
      _value = newVal
      _watcher(newVal, oldVal)
    }
  }

  // init wathcer
  if (_.isfn(watcher)) {
    _watcher = watcher
  }

  // init computer
  if (_.isfn(computer)) {
    unique.isComputed = true
    _computer = computer
  } 

  // init value
  unique.setValue(value)

  return unique
}

module.exports = unique
