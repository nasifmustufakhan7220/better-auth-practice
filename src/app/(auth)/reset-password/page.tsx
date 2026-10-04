import React, { Suspense } from 'react';
import ResetPasswordForm from './ResetPasswordForm';


const ResetPasswordPage = () => {
    return (
        <div>
            <h1>Enter a new password</h1>
            <Suspense fallback={<p>Loading......</p>}>
                <ResetPasswordForm/>
            </Suspense>
        </div>
    );
};

export default ResetPasswordPage;