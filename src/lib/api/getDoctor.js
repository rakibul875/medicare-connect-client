import { handelGetSection } from "../action/serverGet";

export const getDoctor = () => {
  return handelGetSection("/doctor");
};

export const getDoctorById = async (id) => {
  return handelGetSection(`/doctor/${id}`);
};

export const lastDoctor = async () => {
  return handelGetSection("/doctors");
};
