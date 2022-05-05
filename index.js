const core = require('@actions/core');
const github = require('@actions/github');
const amqp = require('@cloudamqp/amqp-client');

// Get the input to the action
const rmqPassword = core.getInput("rmqPassword");
const rmqUsername = core.getInput("rmqUsername");
const rmqHost = core.getInput("rmqHost");
const rmqVirtualHost = core.getInput("rmqVirtualHost");
const rmqExchange = core.getInput("rmqExchange");
const rmqRoutingKey = core.getInput("rmqRoutingKey");
const message = core.getInput("message");

async function run() {
    try {
      const url = "amqps://" + rmqUsername + ":" + rmqPassword + "@" + rmqHost + "/" + rmqVirtualHost
      var amqpClient = new amqp.AMQPClient(url);
      const conn = await amqpClient.connect();
      const ch = await conn.channel();
      await ch.basicPublish(rmqExchange, rmqRoutingKey, Buffer.from(message));
      await ch.close();
      await conn.close();
    } catch (e) {
      console.error("ERROR", e);
      e.connection.close();
      core.setFailed(error.message)
    }
  }
  
  run()