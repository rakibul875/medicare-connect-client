import ProfileForm from '@/components/dashboard/doctor/ProfileForm';
import { doctorProfile } from '@/lib/api/getDoctorProfile';
import { getUserSession } from '@/lib/api/getUsers';
import React from 'react';

const ProfilePage = async() => {
    const user= await getUserSession()
    const doctorId= user?.id
    const doctor= await doctorProfile(doctorId)
    console.log(doctor)
    return (
        <div>
            <ProfileForm doctor={doctor} doctorId={doctorId}/>
        </div>
    );
};

export default ProfilePage;