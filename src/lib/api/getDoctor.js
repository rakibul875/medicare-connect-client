import { handelGetSection } from "../action/serverGet"

export const getDoctor=()=>{
 return handelGetSection('/doctor')
}