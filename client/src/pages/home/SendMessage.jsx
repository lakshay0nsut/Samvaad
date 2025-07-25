import React, { useState, useEffect, useRef } from "react";
import { IoIosSend } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageThunk } from "../../store/slice/message/message.thunk";

const SendMessage = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    
    dispatch(
      sendMessageThunk({
        recieverId: selectedUser?._id,
        message: message.trim(),
      })
    );
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto-focus input when selectedUser changes
  useEffect(() => {
    inputRef.current?.focus();
  }, [selectedUser]);

  return (
    <div className="w-full p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            placeholder={selectedUser ? `Message ${selectedUser.fullName}...` : "Select a user to chat"}
            className="w-full pl-4 pr-12 py-3 bg-gray-100 dark:bg-gray-700 rounded-full border-none focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={!selectedUser}
          />
          <button
            onClick={handleSendMessage}
            disabled={!selectedUser || message.trim() === ""}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all ${
              message.trim() !== "" && selectedUser
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "text-gray-400 dark:text-gray-500 cursor-not-allowed"
            }`}
          >
            <IoSend className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;