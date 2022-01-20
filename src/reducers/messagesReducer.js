export const messagesReducer = (state = [], action) => {
    switch(action.type) {
        case "ADD_CHAT":
            return action.payload;
        case "DELETE_CHAT":
            return action.payload;
        case "MSG_RECEIVED":
            const chatRecep = state.find(
                chat => chat.id === action.payload.sender
            );
            if (chatRecep) {
                chatRecep.messages.push(action.payload)
            } else {
                console.log("chat Inactivo");
                // mostrar alerta que llego un mensaje
            }
            return [...state]
        case "MSG_SENT":
            const chatSent = state.find(
                chat => chat.id === action.payload.receiver
            );
            if (chatSent) {
                chatSent.messages.push(action.payload)
            } 
            return [...state]
        default:
            return state;
    }
}
