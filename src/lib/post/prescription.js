import { handelPost } from "../action/serverPost"

export const handelPrescriptionData=async(formData)=>{
 return handelPost('/prescription',formData)
}