import { handelPost } from "../action/serverPost"

export const handelScheduleList=async(scheduleData)=>{
    return handelPost('/schedule',scheduleData)
}

export const handelScheduleUpdate= async(doctorId,day,updateData)=>{
 return handelPost(`/schedule?doctorId=${doctorId}&day=${day}`,updateData,'PATCH')
}