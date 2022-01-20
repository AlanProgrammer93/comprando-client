import clientAxios from "./axiosConfig";


export const addChat = async (idReceiver, token) => 
    await clientAxios.get('/messages/get-messages',
        {
            headers: { token },
            params: { receiver: idReceiver }
        }
    )

/* export const sendMsg = msg => {
    if (socket.current) {
        socket.current.emit("sendNewMsg", {
            userId: user._id,
            msgSendToUserId: openChatId.current,
            msg
        });
    }
} */