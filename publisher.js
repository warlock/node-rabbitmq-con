const amqp = require('amqplib')
const sleep = seconds =>
  new Promise(resolve => setTimeout(resolve, seconds * 1000))

const queue = 'hello'

const open = amqp.connect('amqp://guest:guest@localhost:5672')

// Publisher
open
  .then(conn => conn.createChannel())
  .then(ch => ch.assertQueue(queue).then(ok => {
    return ch.sendToQueue(queue, Buffer.from('something to do'))
  }))
  .catch(console.warn)