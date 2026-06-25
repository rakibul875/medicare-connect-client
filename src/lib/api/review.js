import { handelGetSection } from "../action/serverGet";

export const handelGetUserReview = async (userId) => {
  return handelGetSection(`/my/reviews?userId=${userId}`);
};
export const handelGetDoctorReview = async (doctorId) => {
  return handelGetSection(`/my/reviews?doctorId=${doctorId}`);
};

export const getReview=async()=>{
  return handelGetSection('/reviews')
}

export const getLastReview=()=>{
  return handelGetSection('/review')
}