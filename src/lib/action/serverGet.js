
export const handelGetSection=async(path)=>{
 const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`)
 return await res.json()
}