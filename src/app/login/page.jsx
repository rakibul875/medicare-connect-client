import LoginForm from '@/components/authentication/LoginForm';
import React from 'react';
export const metadata = {
  title: "MediCare Login",
}

const LoginPage = () => {
    return (
        <div>
            <LoginForm/>
        </div>
    );
};

export default LoginPage;