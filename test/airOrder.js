var airOrder = Air('order', {
  data: {
    orders: [
      {
        id: 1101,
        status: 'processing',
        amount: 3002
      }, {
        id: 1102,
        status: 'done',
        amount: 3000
      }, {
        id: 1003,
        status: 'suspend',
        amount: 4000
      }
    ],
    id: 1102
  },
  computed: {
    processing: function (air) {
      var list = []
      air.orders.map(function (order) {
        if (order.status === 'processing') {
          list.push(order)
        }
      })
      return list
    },
    current: function (air) {
      for (var i in air.orders) {
        if (air.orders[i].id === air.id) {
          return air.orders[i]
        }
      }

      return false
    }
  }
})
