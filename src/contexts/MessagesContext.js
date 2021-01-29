import React, { useContext, useEffect, useState } from 'react';
import firebase from 'firebase';
import { useAuth } from "./AuthContext";

const MessagesContext = React.createContext(undefined, undefined);

export const useMessages = () => useContext(MessagesContext);

let messagesRef;

export function MessagesProvider({ children }) {
  const {currentUser} = useAuth();
  const [ messages, setMessages ] = useState([]);

  const sendMessage = (payload) => {
    firebase.database()
      .ref(`chats/${currentUser.id}/${payload.otherUserId}`)
      .push(payload.messageInfo);
    firebase.database()
      .ref(`chats/${payload.otherUserId}/${currentUser.id}`)
      .push(payload.messageInfo);
  }

  const getMessages = (otherUserId) => {
    const messages = [];
    messagesRef = firebase.database().ref('chats/' + currentUser.id + '/' + otherUserId);
    messagesRef.on('child_added', snapshot => {
      let messageDetails = snapshot.val();
      let messageId = snapshot.key;
      messages.push({
        messageDetails,
        messageId
      })
      Promise.all(messages).then(() => {
        setMessages(messages)
      })
      // setMessages(messages);
    })
    // console.log(messages);
  }

  const stopGettingMessages = () => {

  }

  useEffect(() => {
    // console.log('messages', messages);
  }, [messages]);

  const value = {
    // state
    messages,
    // actions
    sendMessage,
    getMessages,
    stopGettingMessages
  }

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  )
}
