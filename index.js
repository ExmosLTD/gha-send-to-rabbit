const core = require('@actions/core');
const github = require('@actions/github');
const amqplib = require('amqplib');

// Get the input to the action
// const rmqPassword = core.getInput("rmqPassword");
// const rmqUsername = core.getInput("rmqUsername");
// const rmqHost = core.getInput("rmqHost");
// const rmqVirtualHost = core.getInput("rmqVirtualHost");
// const rmqExchange = core.getInput("rmqExchange");
// const rmqRoutingKey = core.getInput("routingKey");
// const message = core.getInput("message");

const rmqPassword = "Thg5WGy9FsWrWQ7";
const rmqUsername = "githubactions";
const rmqHost = "cyan-quail.rmq.cloudamqp.com";
const rmqVirtualHost = "egiogzlg";
const rmqExchange = "egiogzlg";
const rmqRoutingKey = "T.0.F.Github.C.[GithHubRelease]";
const message = JSON.stringify({msg: "github released foobar", app: "foobar", version: "1.0.0.0"});


async function produce(){
    try {
        console.log("here");
        const url = "amqps://" + rmqUsername + ":" + rmqPassword + "@" + rmqHost + "/" + rmqVirtualHost
        const json = JSON.stringify(message);
        console.log("json'ized the message")
        var conn = await amqplib.connect(url);
        var ch = await conn.createChannel();
        await ch.assertExchange(rmqExchange, 'topic', {durable: true});
        await ch.publish(rmqExchange, rmqRoutingKey, Buffer.from(json));
        await conn.close()
    } catch(error){
        console.log("error: " + error.message);
        core.setFailed(error.message)
    }
}

produce();

