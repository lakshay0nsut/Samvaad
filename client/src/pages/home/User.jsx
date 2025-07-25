import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../store/slice/user/user.slice";

const User = ({ userDetails }) => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const { onlineUsers } = useSelector(state => state.socketReducer);
  
  const isUserOnline = onlineUsers?.includes(userDetails?._id);
  const isSelected = userDetails?._id === selectedUser?._id;

  const handleUserClick = () => {
    dispatch(setSelectedUser(userDetails));
  };

  return (
    <div
      onClick={handleUserClick}
      className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
        isSelected 
          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
          : "hover:bg-gray-100 dark:hover:bg-gray-700"
      }`}
    >
      <div className="relative">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
          <img 
            src={userDetails?.avatar || '/default-avatar.png'} 
            alt={userDetails?.fullName}
            className="w-full h-full object-cover"
          />
        </div>
        {isUserOnline && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className={`font-medium truncate ${
          isSelected ? "text-white" : "text-gray-800 dark:text-white"
        }`}>
          {userDetails?.fullName}
        </h3>
        <p className={`text-sm truncate ${
          isSelected ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
        }`}>
          @{userDetails?.username}
          {isUserOnline && !isSelected && (
            <span className="ml-2 text-xs text-green-500">• online</span>
          )}
        </p>
      </div>

      {!isUserOnline && !isSelected && (
        <span className="text-xs text-gray-400 dark:text-gray-500">offline</span>
      )}
    </div>
  );
};

export default User;