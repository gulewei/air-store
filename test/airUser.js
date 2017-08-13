var airUser = Air('user', {
  data: {
    name: 'venecy',
    id: '001',
    mail: 'venecy@mail.com'
  },
  computed: {
    user: function (air) {
      return {
        name: air.name,
        id: air.id,
        mail: air.mail
      }
    }
  },
  watcher: {
    name: function (val) {
      console.log('>>> new name is: ', val)
    }
  }
})
