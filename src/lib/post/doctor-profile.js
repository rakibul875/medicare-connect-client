import { handelPost } from "../action/serverPost"

export const doctorProfile=(doctorData)=>{
 return handelPost('/doctor', doctorData)
}