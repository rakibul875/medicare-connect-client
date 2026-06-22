import { handelGetSection } from "../action/serverGet"

export const getPatientAppointment=async(userId)=>{
 return handelGetSection(`/my/appointment?userId=${userId}`)
}