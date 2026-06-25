import React from "react";
import { FaStar } from "react-icons/fa";

const Review = ({reviews}) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews && reviews.length > 0 ? (
          reviews.map((item) => {
            const formattedDate = new Date(item.createdAt).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              },
            );

            return (
              <div
                key={item._id}
                className="bg-white rounded-[1.5rem] border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between border-b border-gray-50 pb-3 mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          item.userImage || "https://via.placeholder.com/150"
                        }
                        alt={item.doctorName}
                        className="w-10 h-10 rounded-full object-cover border border-gray-100"
                      />
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                          Reviewed Doctor
                        </span>
                        <h3 className="text-sm font-bold text-gray-800 line-clamp-1">
                          {item.doctorName || "Unknown Doctor"}
                        </h3>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                      {formattedDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-0.5 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        size={16}
                        color={star <= item.rating ? "#FBBF24" : "#E5E7EB"}
                      />
                    ))}
                    <span className="text-xs font-bold text-gray-500 ml-1.5">
                      ({item.rating}/5)
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-normal text-gray-600 bg-gray-50/40 p-3 rounded-xl border border-gray-50 min-h-[60px] whitespace-pre-line">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-50/60 mt-auto">
                  <span className="text-[11px] text-gray-400 font-medium">
                    Appt: #{item.appointmentId?.slice(-5)}
                  </span>

                  
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-16 bg-white rounded-[1.5rem] border border-gray-100">
            <p className="text-gray-400 font-semibold text-sm">
              You haven`t given any reviews yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
