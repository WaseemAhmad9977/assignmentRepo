import React, { useState } from "react";
import useSWR from "swr";


import { FiUsers, FiSearch, FiUser, FiMail, FiPhone, FiGlobe, FiMapPin, FiBriefcase } from "react-icons/fi";

import fetcher from "../util/fetcher";
import UserPostsModal from "./UserPostModal";
import UserSkeleton from "./UserSkeleton";

const UserPostDashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState(""); 

  const { data: user, isLoading: userLoading, error: userErr } = useSWR(
    "/users",
    fetcher
  );
  const {
    data: posts,
    isLoading: postLoading,
    error: postErr,
  } = useSWR("/posts", fetcher);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleUserClick = (user) => {
    setModalOpen(true);
    setSelectedUser(user.id);
  };

   if (userLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <UserSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (postLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, item) => (
          <div key={item} className="border rounded-lg p-5 animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  const filteredUsers =
    user?.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) 
    );

  return (
    <div className="min-h-screen bg-gray-50">
     
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <FiUsers className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  User Dashboard
                </h1>
            
              </div>
            </div>
           
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                onClick={() => handleUserClick(user)}
                key={user.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 hover:border-blue-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {user.name}
                    </h3>
                    <p className="text-sm font-medium text-blue-600">
                      {user.username}
                    </p>
                  </div>
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FiUser className="h-5 w-5 text-blue-600" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <FiMail className="h-4 w-4 mr-2" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FiPhone className="h-4 w-4 mr-2" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FiGlobe className="h-4 w-4 mr-2" />
                    <span>{user.website}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FiMapPin className="h-4 w-4 mr-2" />
                    <span>
                      {user.address.city}, {user.address.suite}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FiBriefcase className="h-4 w-4 mr-2" />
                    <span>{user.company.name}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Posts</span>
                    <span className="font-semibold text-blue-600">
                      {posts.filter((p) => p.userId === user.id).length}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No users found
            </div>
          )}
        </div>

        <UserPostsModal
          isOpen={modalOpen}
          onClose={closeModal}
          user={user}
          posts={posts}
          selectedUser={selectedUser}
        />
      </div>
    </div>
  );
};

export default UserPostDashboard;
