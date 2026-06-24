import { handelPost } from "../action/serverPost"

export const handelPostReview= async(reviewData)=>{
    return handelPost('/reviews',reviewData)
}