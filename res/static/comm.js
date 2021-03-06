define('comm', ['channel', 'events'], function(channel, events) {

    var socket = new WebSocket('ws://localhost:4640/ws');

    var channels = {};
    var channelBus = new events.EventTarget();


    socket.addEventListener('open', function() {});
    socket.addEventListener('message', function(e) {
        var data = JSON.parse(e.data);

        switch (data.type) {
            case 'chan.open':
                var chan = channels[data.value] = new channel.Channel(data.value);
                channelBus.fire('chan.open', chan);
                break;
        }

    });

    return {
        close: function() {
            socket.close();
        },
        write: function(type, value) {
            socket.send(JSON.stringify({
                Type: type,
                Value: JSON.stringify(value),
            }));
        },
        writeChannel: function(channel, type, value) {
            socket.send(JSON.stringify({
                Channel: channel,
                Type: type,
                Value: JSON.stringify(value),
            }));
        },
        on: channelBus.on,
    };

});
