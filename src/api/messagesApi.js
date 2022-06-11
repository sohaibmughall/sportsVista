



export const messageobj = (obj, userid, uidMastchAgainst) => {
    const message = {
        members: {
            sender: userid,
            recever: uidMastchAgainst,
        },
        messages: []
    }
    const msg = message.messages
    const newTodos = [...msg, { obj }];
    return message
}