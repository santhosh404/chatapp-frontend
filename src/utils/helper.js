export const getSender = (chatUsers, currentUser) => {
    console.log(chatUsers, currentUser)
    return chatUsers[0]._id === currentUser ? chatUsers[1] : chatUsers[0];
}
