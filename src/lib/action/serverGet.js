import { authHeader } from "./serverPost"

export const handelGetSection=async(path)=>{
 const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`)
 return await res.json()
}

export const protectedFetch=async(path)=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`,{
        headers: await authHeader()
    })

    return await res.json()
}