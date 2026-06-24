import { handelGetSection } from "../action/serverGet"

export const handelGetUserReview=async(userId)=>{
return handelGetSection(`/my/reviews?userId=${userId}`)
}