import { handelGetSection, protectedFetch } from "../action/serverGet"

export const doctorProfile= async(doctorId)=>{
 return protectedFetch(`/my/profile?doctorId=${doctorId}`)
}