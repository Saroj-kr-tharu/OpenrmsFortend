import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateUsername = () => {
    const newErrors = {};
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    return newErrors;
  };

  const validatePassword = () => {
    const newErrors = {};
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleContinue = (e) => {
    e.preventDefault();

    if (step === 1) {
      const usernameErrors = validateUsername();
      if (Object.keys(usernameErrors).length > 0) {
        setErrors(usernameErrors);
        return;
      }

      setErrors({});
      setStep(2);
    } else if (step === 2) {
      const passwordErrors = validatePassword();
      if (Object.keys(passwordErrors).length > 0) {
        setErrors(passwordErrors);
        return;
      }

      // Simulated authentication
      alert('Logging in: ' + username + ' ' + password);

      // Reset form
      setUsername('');
      setPassword('');
      setStep(1);
      setErrors({});
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center  p-4">
      <div className="w-full max-w-md p-6 space-y-6 bg-white shadow-md rounded-md">
        <img
          src="https://openmrs.org/wp-content/uploads/2021/08/cropped-OpenMRSlogo-transparent.png"
          alt="OpenMRS Logo"
          className="mx-auto h-16 w-auto"
        />
        <form onSubmit={handleContinue} className="space-y-6">
          <div>
            <label
              htmlFor="login-input"
              className="block text-sm font-medium text-gray-700"
            >
              {step === 1 ? 'Username' : 'Password'}
            </label>
            <div className="relative">
              <input
                id="login-input"
                type={step === 1 ? 'text' : showPassword ? 'text' : 'password'}
                value={step === 1 ? username : password}
                onChange={(e) => {
                  step === 1
                    ? setUsername(e.target.value)
                    : setPassword(e.target.value);
                  setErrors({});
                }}
                className={`w-full px-4 py-2 border rounded-md text-sm 
                  ${errors.username || errors.password 
                    ? 'border-red-500' 
                    : 'border-gray-300'
                  }`}
                placeholder={step === 1 ? 'Enter username' : 'Enter password'}
              />
              {step === 2 && (
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              )}
            </div>
            {errors.username && (
              <p className="mt-1 text-xs text-red-500">{errors.username}</p>
            )}
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-teal-600 text-white rounded-md 
              hover:bg-teal-700 focus:outline-none focus:ring-2 
              focus:ring-teal-500 text-sm"
          >
            {step === 1 ? 'Continue' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
