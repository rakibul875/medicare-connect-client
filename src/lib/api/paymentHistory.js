import { handelGetSection } from "../action/serverGet"

export const getPaymentHistory = async(userId)=>{
    return handelGetSection(`/my/subscription?userId=${userId}`)
}