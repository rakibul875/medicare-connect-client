import { handelGetSection, protectedFetch } from "../action/serverGet"

export const  getRating=()=>{
    return protectedFetch('/analytics/top-doctors')
}