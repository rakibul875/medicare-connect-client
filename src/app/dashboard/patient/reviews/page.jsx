import UserReviewList from "@/components/dashboard/patient/UserReviewList";
import { getUserSession } from "@/lib/api/getUsers";
import { handelGetUserReview } from "@/lib/api/review";
import React from "react";
const ReviewPage = async () => {
  const user = await getUserSession();
  const userId = user?.id;


  const reviewData = userId ? await handelGetUserReview(userId) : [];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
 
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
          My Submitted Reviews
        </h1>
        <p className="text-xs text-gray-400 font-semibold mt-0.5">
          Manage and edit the feedback you have given to doctors.
        </p>
      </div>

    
      <UserReviewList reviews={reviewData} />
    </div>
  );
};

export default ReviewPage;
