socket.onopen = function () {
    // TODO: opened()
};

WebSocket.prototype.setSocket = function (socket) {
    this.socket = socket;
    this.socket.on('data', this.receiver);
};

WebSocket.prototype.send = function (data) {
    this._send(data);
};

