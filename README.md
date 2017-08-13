# modular state store for component communication

## Reference

- ### Step 0. Import Air in Your Code

```js
var Air = require('air-store')
import Air from 'air-store'
```

- ### Step 1. Create and Initialize a Module

    Air(name: string, initVals: object): function

```js
var airUser = Air('user', {
  data: {
    name: 'venecy',
    id: 001,
    mail: 'venecy@mail.com'
  },
  computed: {
    info: function (store) {
      return {
        name: store.name,
        id: store.id,
        mail: store.mail
      }
    }
  },
  watcher: {
    name: function (val, oldVal) {
      console.log('>>> new name is: ', val)
    }
  }
})
```

- As you can see, the `initVals` param has three part:

  data - for the values store in the module;

  computed - for computed values;

  watcher - for wath property value changes, execute when property is set new value;

  You can only modify properties you initialzed. Once you initialize a module, you can not add properties to it anymore.

- ### Step 2. Access Values Store in Module
 
```js
airUser.name // 'venecy'
airUser.id // 001
airUser.info // {name: "venecy", id: 001, mail: "venecy@mail.com"}
```

- ### Step 3. Update Values Store in Module

```js
airUser({name: 'vinice'}) // '>>> new name is: vinice' (watcher is execute)
airUser.name // vinice
airUser.info // {name: "vinice", id: 001, mail: "venecy@mail.com"}
```

- ### Setp 4. Actions
```js
airUser({info: ''}, function() {
  // do some you want ... 
  airUser({
    name: 'vince_0',
    id: 002,
    mail: 'vince@mail.com'
  })
})
```