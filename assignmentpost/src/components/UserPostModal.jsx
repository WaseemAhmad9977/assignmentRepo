import React from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const UserPostsModal = ({ isOpen, onClose, user, posts, selectedUser }) => {
  if (!isOpen) return null;

  const selectedUserData = user.find((item) => item.id === selectedUser);
  const userPosts = posts.filter((item) => item.userId === selectedUser);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FaRegFileAlt className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Posts by {selectedUserData?.name || ""}
              </h2>
              <p className="text-sm text-gray-600">
                {selectedUserData?.username || ""}
              </p>
            </div>
          </div>
          <button
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={onClose}
          >
            <AiOutlineClose className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="text-sm text-gray-600 mb-4">
            Showing  posts
          </div>
          {userPosts.map((post) => (
            <div
              key={post.id}
              className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow mb-4"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                  {post.title}
                </h3>
               
              </div>
              <p className="text-gray-700">{post.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPostsModal;
