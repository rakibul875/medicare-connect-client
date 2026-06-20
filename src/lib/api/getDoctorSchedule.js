import { handelGetSection } from "../action/serverGet"

export const getDoctorSchedule=async(doctorID)=>{
    return handelGetSection(`/schedule?doctorId=${doctorID}`)
}