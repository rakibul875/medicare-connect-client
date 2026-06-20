import { getDoctorById } from '@/lib/api/getDoctor';
import React from 'react';

const DoctorDetails = async ({params}) => {
    const {id}= await params
    const doctor= await getDoctorById(id)
    console.log(doctor)
    return (
        <div>
            <h1>details page</h1>
        </div>
    );
};

export default DoctorDetails;