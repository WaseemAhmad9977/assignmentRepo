import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
   
      <div className="aspect-square bg-gray-100 rounded flex items-center justify-center">
        <Skeleton height={150} width={`100%`} />
      </div>

      <div className="mt-4 space-y-2">
        <Skeleton height={20} width={`80%`} />
        <Skeleton height={20} width={`60%`} />
        
        {/* Price + Rating skeleton */}
        <div className="flex justify-between items-center">
          <Skeleton height={20} width={60} />
          <Skeleton height={20} width={40} />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
