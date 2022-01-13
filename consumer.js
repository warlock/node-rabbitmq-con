const amqp = require('amqplib')
const sleep = seconds =>
  new Promise(resolve => setTimeout(resolve, seconds * 1000))

const queue = 'hello'

const open = amqp.connect('amqp://guest:guest@localhost:5672')

// Consumer
open
  .then(conn => conn.createChannel())
  .then(ch => ch.assertQueue(queue, { durable: false }).then(ok => {
    ch.prefetch(2)
    return ch.consume(queue, async msg => {
      console.log(' [x] Received %s', msg.content.toString())
      await sleep(3)
      console.log(' [x] End %s', msg.content.toString())
      ch.ack(msg)
    })
  }))
  .catch(console.warn)
