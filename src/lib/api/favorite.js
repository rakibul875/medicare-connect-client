import { handelGetSection, protectedFetch } from "../action/serverGet"

export const handelGetFavorite=(userId)=>{
 return protectedFetch(`/my/favorite?userId=${userId}`)
}