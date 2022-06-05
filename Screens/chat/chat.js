import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'

import { firebase } from "../../src/firebase/config";
import { getAuth } from "firebase/auth";

const auth = getAuth();

const Chat = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const collectionRef = firebase.firestore('chats');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, querySnapshot => {
            setMessages(
                querySnapshot.docs.map(doc => ({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user
                }))
            );
        });

        return () => unsubscribe();
    }, []);


    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages)
        );
        const { _id, createdAt, text, user } = messages[0];
        addDoc(firebase.firestore('chats'), {
            _id,
            createdAt,
            text,
            user
        });
    }, []);
    return (
        <div>
            <GiftedChat
                messages={messages}
                showAvatarForEveryMessage={true}
                onSend={messages => onSend(messages)}
                user={{
                    _id: auth?.currentUser?.email,
                    avatar: 'https://i.pravatar.cc/300'
                }}
            />
        </div>
    );
}

export default Chat;
