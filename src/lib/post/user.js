import { dataDelete, handelPost } from "../action/serverPost"

export const handelUserStatus=async(id,updateStatus)=>{
 return handelPost(`/users/${id}`,updateStatus,'PATCH')
}

export const userDelete=async(id)=>{
    return dataDelete(`/users/${id}`)
}