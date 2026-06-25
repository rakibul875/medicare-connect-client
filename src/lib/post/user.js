import { handelPost } from "../action/serverPost"

export const handelUserStatus=async(id,updateStatus)=>{
 return handelPost(`/users/${id}`,updateStatus,'PATCH')
}