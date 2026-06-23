import { handelGetSection } from "../action/serverGet"

export const getPaymentHistory = async(userId)=>{
    return handelGetSection(`/my/subscription?userId=${userId}`)
}
export const getPaymentHistoryDoctor = async(doctorId)=>{
    return handelGetSection(`/my/subscription?doctorId=${doctorId}`)
}