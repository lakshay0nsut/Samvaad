import React, { useEffect, useRef } from "react";
import User from "./User";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { getMessageThunk } from "../../store/slice/message/message.thunk";
import SendMessage from "./SendMessage";
import { IoChatbubblesOutline } from "react-icons/io5";

const MessageContainer = () => {
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  const { selectedUser } = useSelector((state) => state.userReducer);
  const { messages } = useSelector((state) => state.messageReducer);

  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessageThunk({ recieverId: selectedUser?._id }));
    }
  }, [selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh)] bg-gray-50 dark:bg-gray-800">
      {!selectedUser ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
          <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
            <IoChatbubblesOutline className="text-4xl text-blue-500 dark:text-blue-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Welcome to Talkie
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-md">
            Select a contact to start chatting or create a new conversation
          </p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <User userDetails={selectedUser} />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-100 dark:bg-gray-700">
            {messages?.length > 0 ? (
              messages.map((messageDetails) => (
                <Message
                  key={messageDetails?._id}
                  messageDetails={messageDetails}
                />
              ))
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 dark:text-gray-400">
                  No messages yet. Start the conversation!
                </p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <SendMessage />
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;