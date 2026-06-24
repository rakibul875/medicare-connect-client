import { handelGetSection } from "../action/serverGet"

export const handelGetFavorite=(userId)=>{
 return handelGetSection(`/my/favorite?userId=${userId}`)
}