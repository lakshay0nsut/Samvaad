import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";

const Message = ({ messageDetails }) => {
  const messageRef = useRef(null);
  const { userProfile, selectedUser } = useSelector(
    (state) => state.userReducer
  );

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, []);

  const isCurrentUser = userProfile?._id === messageDetails?.senderId;
  const avatarSrc = isCurrentUser ? userProfile?.avatar : selectedUser?.avatar;
  const timestamp = messageDetails?.createdAt 
    ? format(new Date(messageDetails.createdAt), 'h:mm a') 
    : '12:45';

  return (
    <div
      ref={messageRef}
      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex max-w-xs md:max-w-md lg:max-w-lg ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>
        {/* Avatar */}
        <div className={`shrink-0 ${isCurrentUser ? 'ml-3' : 'mr-3'}`}>
          <img
            src={avatarSrc || 'https://via.placeholder.com/40'}
            alt="User avatar"
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
          />
        </div>

        {/* Message Bubble */}
        <div className={`relative px-4 py-2 rounded-2xl shadow-sm ${isCurrentUser 
          ? 'bg-blue-500 text-white rounded-br-none' 
          : 'bg-gray-100 text-gray-800 rounded-bl-none'
        }`}>
          {/* Message Text */}
          <p className="text-sm md:text-base">{messageDetails?.message}</p>
          
          {/* Timestamp */}
          <div className={`text-xs mt-1 flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
            <span className={`opacity-80 ${isCurrentUser ? 'text-blue-100' : 'text-gray-500'}`}>
              {timestamp}
            </span>
          </div>
          
          {/* Tail indicator */}
          <div className={`absolute bottom-0 w-3 h-3 ${isCurrentUser 
            ? 'right-0 translate-x-1/2 bg-blue-500' 
            : 'left-0 -translate-x-1/2 bg-gray-100'
          }`} 
          style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%)' }} />
        </div>
      </div>
    </div>
  );
};

export default Message;