import { handelGetSection, protectedFetch } from "../action/serverGet";

export const getDoctor = () => {
  return protectedFetch("/doctor");
};

export const getDoctorById = async (id) => {
  return handelGetSection(`/doctor/${id}`);
};

export const lastDoctor = async () => {
  return handelGetSection("/doctors");
};
