var airUser = Air('user')
var airOrder = Air('order')
var airGlobal = Air('global')

console.log('airUser.id(001): ', airUser.id) 
console.log('airUser.name(venecy): ', airUser.name) 
console.log('airUser.info(undefined): ', airUser.info) 
console.log('airUser.user({id: 001, name: "venecy", mail: "venecy@mail.com"}): ', airUser.user) 

airUser({ name: 'vinece' }) // wathced log 'new name is: vinece'
console.log(airUser.name) // 'vinece

airUser({ info: 'a professional gamer' }) // error 'can not set uninitialized property "info"'

console.log(airOrder.id) // 1102
console.log(airOrder.processing) // [{id: 1101 ...}]
console.log(airOrder.current) // {id: 1102 ...}