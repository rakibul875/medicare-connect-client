import { handelGetSection, protectedFetch } from "../action/serverGet"

export const getDoctorPrescription=async(doctorId)=>{
    return protectedFetch(`/my/prescription?doctorId=${doctorId}`)
}

