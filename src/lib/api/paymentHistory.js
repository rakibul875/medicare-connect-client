import { handelGetSection, protectedFetch } from "../action/serverGet"

export const getPaymentHistory = async(userId)=>{
    return protectedFetch(`/my/subscription?userId=${userId}`)
}
export const getPaymentHistoryDoctor = async(doctorId)=>{
    return protectedFetch(`/my/subscription?doctorId=${doctorId}`)
}

export const getAllPaymentHistory=async()=>{
    return handelGetSection('/subscription')
}