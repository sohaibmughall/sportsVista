



export const messageobj = (chats, userid, matchd , againts ) => {
    const message = {
        members: {
            sender: userid,
            recever: againts,
            matchid : matchd
        },
        messages: chats
    }
    return message
}