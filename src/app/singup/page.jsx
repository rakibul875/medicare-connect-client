import SingUpForm from '@/components/authentication/SingUpForm';
import React from 'react';
export const metadata = {
  title: "MediCare SingUp",
}

const SingUpPage = () => {
    return (
        <div>
            <SingUpForm/>
        </div>
    );
};

export default SingUpPage;