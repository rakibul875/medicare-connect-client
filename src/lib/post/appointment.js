import { handelPost } from "../action/serverPost"

export const handelAppointmentPost=async(appointmentData)=>{
    return handelPost('/appointment',appointmentData)
}