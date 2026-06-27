"use server"

import { getToken } from "../api/getUsers";


export const authHeader=async()=>{
  const token= await getToken()
  const headers= token?{
    authorization: `Bearer ${token}`
  }:{}
  return headers
}


export const handelPost = async (path, newData, method = "POST") => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`, {
    method: method,
    headers: {
      "Content-type": "application/json",
      ...await authHeader()
    },
    body: JSON.stringify(newData),
  });
  return res.json();
}

export const dataDelete=async(path)=>{
  const res= await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`,{
    method:'DELETE',
    headers:{
      "Content-type": "application/json",
    }
  })
  return res.json()
}