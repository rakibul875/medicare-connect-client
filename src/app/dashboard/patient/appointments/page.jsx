import { getPatientAppointment } from '@/lib/api/getAppointment';
import { getUserSession } from '@/lib/api/getUsers';
import React from 'react';

const Appointment = async () => {
    const user= await getUserSession()
    const userId= user?.id
    const appointments= await getPatientAppointment(userId)
    return (
        <div>
            <h1>All Appointment {appointments.length}</h1>
        </div>
    );
};

export default Appointment;