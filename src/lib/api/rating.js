import { handelGetSection } from "../action/serverGet"

export const  getRating=()=>{
    return handelGetSection('/analytics/top-doctors')
}