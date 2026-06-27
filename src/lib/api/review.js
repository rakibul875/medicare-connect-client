import { handelGetSection, protectedFetch } from "../action/serverGet";

export const handelGetUserReview = async (userId) => {
  return protectedFetch(`/my/reviews?userId=${userId}`);
};
export const handelGetDoctorReview = async (doctorId) => {
  return protectedFetch(`/my/reviews?doctorId=${doctorId}`);
};

export const getReview=async()=>{
  return handelGetSection('/reviews')
}

export const getLastReview=()=>{
  return handelGetSection('/review')
}