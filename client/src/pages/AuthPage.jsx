import { useState } from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';

export const AuthPage = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLoginSuccess = (user) => {
    if (onLoginSuccess) {
      onLoginSuccess(user);
    }
  };

  const handleRegisterSuccess = () => {
    setIsLogin(true);
  };

  return (
    <main className="min-h-screen">
      {isLogin ? (
        <LoginForm
          onToggleForm={handleToggleForm}
          onLoginSuccess={handleLoginSuccess}
        />
      ) : (
        <RegisterForm
          onToggleForm={handleToggleForm}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}
    </main>
  );
};
