import { handelGetSection } from "../action/serverGet"

export const doctorProfile= async(doctorId)=>{
 return handelGetSection(`/my/profile?doctorId=${doctorId}`)
}