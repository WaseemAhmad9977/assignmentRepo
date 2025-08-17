import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <Skeleton height={20} width={`60%`} />
          <Skeleton height={15} width={`40%`} style={{ marginTop: "6px" }} />
        </div>
        <Skeleton circle={true} height={32} width={32} />
      </div>

      <div className="space-y-3">
        <Skeleton height={15} width={`80%`} />
        <Skeleton height={15} width={`70%`} />
        <Skeleton height={15} width={`60%`} />
        <Skeleton height={15} width={`50%`} />
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <Skeleton height={15} width={`30%`} />
      </div>
    </div>
  );
};

export default UserSkeleton;
