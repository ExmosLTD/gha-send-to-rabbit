# gha-send-to-rabbit

Github action to send to rabbit using amqplib.

Input:

- `rmqUsername` : The Rmq Username (get from secrets)
- `rmqPassword` : The Rmq Password (get from secrets)
- `rmqHost` : The Rmq Host
- `rmqVirtualHost` : The Rmq Virtual Host
- `rmqExchange` : The Rmq Exchange
- `message` : The message to send (will be serialized to json)
- `rmqRoutingKey` : The routing key to send the message with.

Usage:

```yaml
 - name: Send to rabbit
   uses: ./.github/actions/gha-send-to-rabbit
   with:
     rmqUsername: {{ secrets.RMQUSERNAME }}
     rmqPassword: {{ secrets.RMQPASSWORD}}
     rmqHost: xyz.123.cloudamqp.com
     rmqVirtualHost: 'foo'
     rmqExchange: 'bar'
     rmqRoutingKey: 'T.0.F.*.C.[GitHubRelease]'
     rmqMessage: {msg: "github release", version: ${{ steps.get-version.outputs.assembly-version }}, app: "FooBarQuax"}
```
