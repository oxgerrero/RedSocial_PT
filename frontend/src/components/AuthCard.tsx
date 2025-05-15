import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

export const AuthCard = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </h2>

        {isLogin ? <LoginForm /> : <SignupForm />}

        <div className="mt-6 text-center">
          {isLogin ? (
            <p className="text-gray-600 text-sm">
              ¿No tienes cuenta?{" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => setIsLogin(false)}
              >
                Regístrate aquí
              </span>
            </p>
          ) : (
            <p className="text-gray-600 text-sm">
              ¿Ya tienes cuenta?{" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => setIsLogin(true)}
              >
                Inicia sesión
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
