var Air = (function () {
'use strict';

var toString = {}.toString;

var index = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

var index$2 = function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
};

var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;

var isArray = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) { /**/ }

	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

var index$4 = function extend() {
	var options, name, src, copy, copyIsArray, clone;
	var target = arguments[0];
	var i = 1;
	var length = arguments.length;
	var deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}
	if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if (target !== copy) {
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = extend(deep, clone, copy);

					// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						target[name] = copy;
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
};

var _ = {
  extend: index$4,
  isobj: index$2,
  isfn: function (fn) {
    return typeof fn === 'function'
  },
  noop: function () {

  },
  clone: function (val) {
    if (index(val)) {
      return Array.prototype.slice.call(val)
    } else if (index$2(val)) {
      return index$4(true, {}, val)
    } else {
      return val
    }
  }
};

var utils = _;

function unique(value, watcher, computer) {
  var _value = null;
  var _watcher = utils.noop;
  var _computer = null;

  var unique = {
    unique: true,
    isComputed: false,
    getComputer: function () {
      return _computer
    },
    getValue: function () {
      return utils.clone(_value)
    },
    setValue: function (val) {
      var oldVal = unique.getValue();
      var newVal = utils.clone(val);
      _value = newVal;
      _watcher(newVal, oldVal);
    }
  };

  // init wathcer
  if (utils.isfn(watcher)) {
    _watcher = watcher;
  }

  // init computer
  if (utils.isfn(computer)) {
    unique.isComputed = true;
    _computer = computer;
  } 

  // init value
  unique.setValue(value);

  return unique
}

var unique_1 = unique;

function store(properties) {
  var _store = {};

  // check arguments
  if (!utils.isobj(properties)) {
    return console.error('Air can only initialize key-value pires')
  }

  // init
  var param = null;
  for (var key in properties) {
    param = properties[key];
    _store[key] = unique_1(param.value, param.watcher, param.computer);
  }

  var getContext = function () {
    var context = {};
    for (var name in _store) {
      context[name] = _store[name].getValue();
    }
    return context
  };

  // return methods
  return {
    get: function (name) {
      var item = _store[name];
      if (item.isComputed) {
        var getter = item.getComputer();
        var context = getContext();
        var val = getter.call(undefined, context);
        item.setValue(val);
      }
      return item.getValue()
    },
    set: function (name, val) {
      // uninitialized property
      var item = _store[name];
      if (!item || !item.unique) {
        return console.error('uninitialized property "%s" can not be set', name)
      }

      // computed property
      if (item.isComputed) {
        return console.warn('set computed property "%s" only does nothing')
      }

      // set new value
      item.setValue(val);
    }
  }
}

var store_1 = store;

function structureProps(properties) {
  var _props = {};

  var data = properties.data;
  for (var key in data) {
    _props[key] = {
      value: data[key]
    };
  }

  var computed = properties.computed;
  for (var k_0 in computed) {
    if (_props[k_0]) {
      _props[k_0].computer = computed[k_0];
    } else {
      _props[k_0] = {
        computer: computed[k_0]
      };
    }
  }

  var watcher = properties.watcher;
  for (var k_1 in watcher) {
    if (_props[k_1]) {
      _props[k_1].watcher = watcher[k_1];
    } else {
      _props[k_1] = {
        watcher: watcher[k_1]
      };
    }
  }

  return _props
}

function createModule(initVals) {
  var _props = structureProps(initVals);
  var _store = store_1(_props);

  function air(properties, action) {
    // update module
    for (var key in properties) {
      _store.set(key, properties[key]);
    }
    // call action
    if (utils.isfn(action)) {
      action.call(undefined, air);
    }
  }

  for (var key in _props) {
    (function (k_0) {
      Object.defineProperty(air, key, {
        get: function () {
          return _store.get(k_0)
        },
        set: function () {
          console.error('can not resign value of Air properties');
        }
      });
    })(key);
  }

  return air
}

var module$1 = createModule;

var _modules = {};

function initialModule(name, properties) {
  _modules[name] = module$1(properties);
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
    initialModule(name, properties);
  }

  return getModule(name)
}

// Air.action = function (module, actMap) {
//   // return function (value) {
//   //   module({[name]: value}, action)
//   // }
// }


var airStore = Air;

return airStore;

}());
//# sourceMappingURL=air-store.js.map
