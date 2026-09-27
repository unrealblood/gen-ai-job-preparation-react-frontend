import { useState } from "react";
import { FormInput } from "../components/FormInput.jsx";
import { Link } from "react-router";
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2
} from 'lucide-react';

function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // Dynamic password strength estimation
  const getPasswordStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strength = getPasswordStrength(password);

  const validate = () => {
    const errs = {};
    if (!fullName.trim()) {
      errs.fullName = 'Full name is required';
    } else if (fullName.trim().length < 2) {
      errs.fullName = 'Please enter your actual name';
    }

    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please enter a valid email address';
    }

    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 8) {
      errs.password = 'Password must be at least 8 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    //call regiter-user api

    setIsSubmitting(false);
    setRegisterSuccess(true);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
        <div className="border border-gray-200 w-[600px] p-4 mx-auto rounded-md shadow-md">
            {/*Header*/}
            <div className="mb-4 ">
                <h1 className="text-center text-2xl font-bold">Register</h1>
                <p className="text-sm text-center text-gray-500">Create your acount</p>
            </div>

            {/* Success Notification */}
            {registerSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start space-x-3 text-sm animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                    <span className="font-semibold block">Account Created Successfully!</span>
                    Welcome aboard, {fullName}!
                </div>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Full Name */}
                <FormInput
                id="register-fullname"
                label="Full Name"
                type="text"
                placeholder="Jane Doe"
                value={fullName}
                onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors({ ...errors, fullName: '' });
                }}
                error={errors.fullName}
                icon={User}
                />

                {/* Email */}
                <FormInput
                id="register-email"
                label="Email Address"
                type="email"
                placeholder="jane@company.com"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: '' });
                }}
                error={errors.email}
                icon={Mail}
                />

                {/* Password */}
                <div>
                <FormInput
                    id="register-password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: '' });
                    }}
                    error={errors.password}
                    icon={Lock}
                    endAdornment={
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-slate-400 hover:text-slate-600 transition p-1 focus:outline-none"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    }
                />

                {/* Password strength indicators */}
                {password.length > 0 && (
                    <div className="mt-2 space-y-1.5">
                    <div className="flex space-x-1.5 h-1.5 w-full">
                        <div
                        className={`h-full flex-1 rounded-full transition-all ${
                            strength >= 1 ? 'bg-rose-400' : 'bg-slate-200'
                        }`}
                        />
                        <div
                        className={`h-full flex-1 rounded-full transition-all ${
                            strength >= 2 ? 'bg-amber-400' : 'bg-slate-200'
                        }`}
                        />
                        <div
                        className={`h-full flex-1 rounded-full transition-all ${
                            strength >= 3 ? 'bg-emerald-400' : 'bg-slate-200'
                        }`}
                        />
                        <div
                        className={`h-full flex-1 rounded-full transition-all ${
                            strength >= 4 ? 'bg-emerald-500' : 'bg-slate-200'
                        }`}
                        />
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium text-right">
                        {strength <= 1 && 'Weak password'}
                        {strength === 2 && 'Fair password'}
                        {strength === 3 && 'Good password'}
                        {strength === 4 && 'Strong password'}
                    </p>
                    </div>
                )}
                </div>

                {/* Submit Button */}
                <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3 px-4 rounded-xl font-medium text-sm text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-lg shadow-indigo-600/25 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                {isSubmitting ? (
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                    <>
                    <span>Get Started Now</span>
                    <ArrowRight className="w-4 h-4" />
                    </>
                )}
                </button>
            </form>

            {/* Navigation Link to Login */}
            <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs sm:text-sm text-slate-500">
                Already have an account?{' '}
                <Link
                to="/auth/login"
                className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline ml-1"
                >
                Log in instead
                </Link>
            </div>
        </div>
    </div>
  );
};

export { Register };