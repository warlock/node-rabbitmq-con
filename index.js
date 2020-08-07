const amqp = require('amqplib')
const sleep = seconds =>
  new Promise(resolve => setTimeout(resolve, seconds * 1000))

var q = 'hello'

var open = amqp.connect('amqp://guest:guest@localhost:5672')

// Publisher
/*
open
  .then(conn => {
    return conn.createChannel()
  })
  .then(ch => {
    return ch.assertQueue(q).then(ok => {
      return ch.sendToQueue(q, Buffer.from('something to do'))
    })
  })
  .catch(console.warn)
*/

// Consumer

open
  .then(conn => conn.createChannel())
  .then(ch => {
    return ch.assertQueue(q, { durable: false }).then(ok => {
      ch.prefetch(2)
      return ch.consume(q, async msg => {
        console.log(' [x] Received %s', msg.content.toString())
        await sleep(3)
        console.log(' [x] End %s', msg.content.toString())
        ch.ack(msg)
      })
    })
  })
  .catch(console.warn)
