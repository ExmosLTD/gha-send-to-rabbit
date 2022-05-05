const core = require('@actions/core');
const github = require('@actions/github');
const amqplib = require('amqplib');

// Get the input to the action
const rmqPassword = core.getInput("rmqPassword");
const rmqUsername = core.getInput("rmqUsername");
const rmqHost = core.getInput("rmqHost");
const rmqVirtualHost = core.getInput("rmqVirtualHost");
const rmqExchange = core.getInput("rmqExchange");
const rmqRoutingKey = core.getInput("routingKey");
const message = core.getInput("message");

try {
    const url = "amqps://" + rmqUsername + ":" + rmqPassword + "@" + rmqHost + "/" +rmqVirtualHost
    const json = JSON.stringify(message);
    const conn = await amqplib.connect(url);
    const ch = await conn.createChannel();
    await ch.assertExchange(rmqExchange, 'topic', {durable: true});
    await ch.publish(rmqExchange, rmqRoutingKey, BUffer.from(json));
    setTimeout(function(){
        ch.close();
        conn.close();
    }, 500);
} catch(error){
    console.log("error: " + error.message);
    core.setFailed(error.message)
}

