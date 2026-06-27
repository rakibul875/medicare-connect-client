import { handelGetSection, protectedFetch } from "../action/serverGet"

export const getDoctorSchedule=async(doctorId)=>{
    return protectedFetch(`/schedule?doctorId=${doctorId}`)
}