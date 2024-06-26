import { Routes, Route, Navigate } from 'react-router-dom';
import { SingleCard,SingleCardLogin } from './layouts';
import { LoginForm, ResetPasswordForm, ChangePasswordForm, CreateAccountForm } from './components';

export default function UnauthenticatedContent() {
  return (
    <Routes>
      <Route
        path='/login' 
        element={
          <SingleCardLogin title="Login To Infotrack:2.0">
            <LoginForm />
          </SingleCardLogin>
        }
      />
      <Route
        path='/create-account'
        element={
          <SingleCard title="Sign Up">
            <CreateAccountForm />
          </SingleCard>
        }
      />
      <Route 
        path='/reset-password'
        element={
          <SingleCardLogin
            title="Reset Password"
            description="Please enter the email address that you used to register, and we will send you a link to reset your password via Email."
          >
            <ResetPasswordForm />
          </SingleCardLogin>
        }
      />
      <Route
        path='/change-password/:recoveryCode'
        element={
          <SingleCardLogin title="Change Password">
            <ChangePasswordForm />
          </SingleCardLogin>
        }
      />
      <Route path='*' element={<Navigate to={'/login'} />}></Route>
    </Routes>
  );
}
