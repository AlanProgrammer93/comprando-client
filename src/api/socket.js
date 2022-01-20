import socketClient from 'socket.io-client';

let socket;

const SERVER = 'http://localhost:5000';

export const init = (dispatch) => {
    socket = socketClient(SERVER);

    socket.on('connectedUsers', (data) => {
        console.log('connectedUsers', data);
    });

    socket.on('newUserJoin', (data) => {
        console.log('newUserJoin', data);
    });

    // Messages
    socket.on('newMsgReceived', (data) => {
        dispatch({
            type: "MSG_RECEIVED",
            payload: data.newMsg
        });
    });

    socket.on('msgSent', (data) => {
        dispatch({
            type: "MSG_SENT",
            payload: data.newMsg
        });
    });

}

export const emitJoin = (userId) => {
    socket.emit('join', { userId });
}

export const emitSendNewMsg = (userId, msgSendToUserId, msg) => {
    socket.emit('sendNewMsg', { userId, msgSendToUserId, msg });
}

