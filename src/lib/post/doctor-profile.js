import { handelPost } from "../action/serverPost"

export const doctorProfile=(doctorData)=>{
 return handelPost('/doctor', doctorData)
}

export const updateDoctorProfile=async(id,updateData)=>{
    return handelPost(`/doctor/${id}`,updateData,'PATCH')
}