import { handelGetSection } from "../action/serverGet"

export const getDoctorPrescription=async(doctorId)=>{
    return handelGetSection(`/my/prescription?doctorId=${doctorId}`)
}