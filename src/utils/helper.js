import moment from "moment/moment";

export const getSender = (chatUsers, currentUser) => {
    return chatUsers[0]._id === currentUser ? chatUsers[1] : chatUsers[0];
}

export const getTime = (date) => {
    return moment(date).format('LT')
}