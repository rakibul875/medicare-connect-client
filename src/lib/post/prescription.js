import { handelPost } from "../action/serverPost"

export const handelPrescriptionData=async(formData)=>{
 return handelPost('/prescription',formData)
}

export const handelPrescriptionPatch=async(prescriptionId,updateData)=>{
    return handelPost(`/prescription/${prescriptionId}`,updateData,'PATCH')
}