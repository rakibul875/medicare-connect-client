import { handelGetSection } from "../action/serverGet"

export const getPatientAppointment=async(userId)=>{
 return handelGetSection(`/my/appointment?userId=${userId}`)
}

export const getDoctorAppointment= async (doctorId)=>{
    return handelGetSection(`/my/appointment?doctorId=${doctorId}`)
}