import { handelPost } from "../action/serverPost"

export const handelScheduleList=async(scheduleData)=>{
    return handelPost('/schedule',scheduleData)
}