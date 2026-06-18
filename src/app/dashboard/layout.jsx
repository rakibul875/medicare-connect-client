import AddScheduleForm from '@/components/shear/AddScheduleForm';

import React from 'react';

const DashboardLayout = ({children}) => {
    return (
        <div>
            <div className="">
                <AddScheduleForm/>
            </div>
            <main>{children}</main>
        </div>
    );
};

export default DashboardLayout;