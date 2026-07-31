import { handelGetSection, } from "../action/serverGet";

export const getDoctor = (page = 1, search = "", category = "") => {
  const query = new URLSearchParams({ page, search, category }).toString();
  return handelGetSection(`/doctor?${query}`);
};
export const getAllDoctors = () => {
  return handelGetSection("/auth/all/doctors")
}
export const getDoctorById = async (id) => {
  return handelGetSection(`/doctor/${id}`);
};

export const lastDoctor = async () => {
  return handelGetSection("/doctors");
};
export const handelPageNationGet = async (page) => {
  if (!page) {
    page = 1;
  }
  return handelGetSection(`/all/doctors?page=${page}`);
};


