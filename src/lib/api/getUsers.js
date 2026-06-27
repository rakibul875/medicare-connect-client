"use server";
import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";
import { handelGetSection } from "../action/serverGet";

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user;
};

export const getToken = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.session?.token || null;
};

export const roleBaseSession = async (role) => {
  console.log("role", role);
  const user = await getUserSession();
  if (!user) {
    redirect("/signin");
  }
  if (user?.role !== role) {
    redirect("/unauthorize");
  }
  return user;
};

export const getUser = async () => {
  return handelGetSection("/users");
};
