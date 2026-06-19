"use server"
export const handelPost = async (path, newData, method = "POST") => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`, {
    method: method,
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  return res.json();
}