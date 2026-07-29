import FindDoctor from "@/components/FindDoctor";
import { getDoctor,  } from "@/lib/api/getDoctor";
import React from "react";
import Link from "next/link";

import SearchForm from "./SearchForm";

export const metadata = {
  title: "MediCare Find-Doctor",
}

const FindDoctorsPage = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams?.page || 1);
  const search = resolvedSearchParams?.search || "";
  const category = resolvedSearchParams?.category || "";
  
  const doctorResponse = await getDoctor(page, search, category);
  
  // Depending on how backend returns data, it might be { doctors, totalCount } or just an array
  // Assuming the new backend will return { doctors: [...], totalCount: number }
  // We'll add a fallback in case the backend hasn't been updated yet
  const doctorData = Array.isArray(doctorResponse) ? doctorResponse : (doctorResponse?.doctors || []);
  const totalCount = Array.isArray(doctorResponse) ? doctorResponse.length : (doctorResponse?.totalCount || 0);
  
  const totalPages = Math.ceil(totalCount / 10) || 1;

  // Helper for generating pagination links
  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    params.set("page", pageNumber.toString());
    return `/find-doctors?${params.toString()}`;
  };

  return (
    <div className="container mx-auto min-h-screen">
      <div className="mx-10 my-5 space-y-3">
        <h1 className='text-4xl font-bold text-cyan-500'>Find Your Specialist</h1>
        <p className="text-xl text-slate-500">Clinical excellence meets digital Calm. Browse our network of Certified <br /> healthcare professionals and book your appointment in seconds .</p>
      </div>

      <SearchForm initialSearch={search} initialCategory={category} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10 mx-10">
        {doctorData.length > 0 ? (
          doctorData.map((doctor) =>
            <FindDoctor key={doctor._id} doctor={doctor} />
          )
        ) : (
          <div className="col-span-full py-10 text-center">
            <h3 className="text-2xl text-gray-400">No doctors found matching your criteria</h3>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 my-10">
          {page > 1 && (
            <Link 
              href={createPageURL(page - 1)}
              className="px-4 py-2 border border-cyan-500 text-cyan-600 rounded hover:bg-cyan-50 transition-colors"
            >
              Previous
            </Link>
          )}
          
          <div className="flex space-x-1">
            {Array.from({ length: totalPages }).map((_, i) => (
              <Link 
                key={i} 
                href={createPageURL(i + 1)}
                className={`w-10 h-10 flex items-center justify-center rounded border ${page === i + 1 ? 'bg-cyan-500 text-white border-cyan-500' : 'text-cyan-600 border-gray-300 hover:bg-cyan-50'} transition-colors`}
              >
                {i + 1}
              </Link>
            ))}
          </div>

          {page < totalPages && (
            <Link 
              href={createPageURL(page + 1)}
              className="px-4 py-2 border border-cyan-500 text-cyan-600 rounded hover:bg-cyan-50 transition-colors"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default FindDoctorsPage;

