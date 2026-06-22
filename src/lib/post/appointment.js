import { handelPost } from "../action/serverPost"

export const handelAppointmentPost=async(appointmentData)=>{
    return handelPost('/appointment',appointmentData)
}

export const handelAppointmentStatus= async (id)=>{
 return handelPost(`/appointment/${id}`,{},'PATCH')
}
export const handelStatusByDoctor= async (id)=>{
 return handelPost(`/appointment/${id}/approve`,{},'PATCH')
}
export const handelStatusRejectedByDoctor= async (id)=>{
 return handelPost(`/appointment/${id}/rejected`,{},'PATCH')
}