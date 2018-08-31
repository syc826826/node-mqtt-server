var mosca = require('mosca');

var moscaSettings = {
    http: {
        port: 3000,
        bundle: true,
        static: './'
    }
};

var server = new mosca.Server(moscaSettings);

server.on('ready', setup);
function setup() {
    console.log('Mosca server is up & running');
}

server.on('clientConnected', function (client) {
    console.log('Client Connected: ', client.id);
});

server.on('clientDisconnected', function (client) {
    console.log('Client Disconnected: ', client.id);
});


server.on('published', function (packet, client) {
    //console.log('Published: ', packet);
    switch (packet.topic) {
        case 'test':
            console.log("payload: ", packet.payload.toString());
            var msg = {
                topic: 'repeat',
                payload: packet.payload,
                qos: 0,
                retain: false
            };
            server.publish(msg, function () {
                console.log('repeat!  ');
            });
            break;
        case 'chart data':
            var msg = {
                topic: 'simulate data',
                payload: JSON.stringify([8, 8, 8, 8, 8, 8, 8, 8]),
                qos: 0,
                retain: false
            };
            server.publish(msg);
            break;
        case 'chart data async':
            var msg = {
                topic: 'simulate async data',
                payload: JSON.stringify([6, 6, 6, 6, 6, 6, 6, 6]),
                qos: 0,
                retain: false
            };
            server.publish(msg);
            break;
    }
});
