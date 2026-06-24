import { handelPost } from "../action/serverPost"

export const handelPostReview= async(reviewData)=>{
    return handelPost('/reviews',reviewData)
}
export const handelPostFavorite= async(data)=>{
    return handelPost('/favorite',data)
}

export const handelReviewPatch=async(reviewId,updateData)=>{
    return handelPost(`/reviews/${reviewId}`,updateData,"PATCH")
}