export const getSender = (loggedUser, users) => {
    if (!users || users.length < 2 || !loggedUser) {
        return ''; // Return a fallback value or handle gracefully
    }
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser, users) => {
    if (!users || users.length < 2 || !loggedUser) {
        return ''; // Return a fallback value or handle gracefully
    }
    return users[0]._id === loggedUser._id ? users[1] : users[0];
};


export const isSameSender = (messages, msg, idx, userId) => {
    return (
        idx < messages.length - 1 &&
        (
            messages[idx + 1].sender._id !== msg.sender._id ||
            messages[idx + 1].sender._id === undefined
        ) &&
        messages[idx].sender._id !== userId
    )
}

export const isLastMessage = (messages, idx, userId) => {
    return (
        idx === messages.length - 1 &&
        messages[messages.length - 1].sender._id !== userId &&
        messages[messages.length - 1].sender._id
    )
}

export const isSameUser = (messages, msg, idx) => {
    return idx > 0 && messages[idx - 1].sender._id === msg.sender._id;
}

export const isSameSenderMargin = (messages, msg, idx, userId) => {
    if (
        idx < messages.length - 1 &&
        messages[idx + 1].sender._id === msg.sender._id &&
        messages[idx].sender._id !== userId
    )
        return 33;
    else if (
        (idx < messages.length - 1 &&
            messages[idx + 1].sender._id !== msg.sender._id &&
            messages[idx].sender._id !== userId) ||
        (idx === messages.length - 1 && messages[idx].sender._id !== userId)
    ) {
        return 0
    }
    else return 'auto'
}