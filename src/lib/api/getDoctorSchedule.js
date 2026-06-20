import { handelGetSection } from "../action/serverGet"

export const getDoctorSchedule=async(doctorId)=>{
    return handelGetSection(`/schedule?doctorId=${doctorId}`)
}