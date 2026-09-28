import { useContext, useState } from "react";
import { 
  Mail, 
  Lock,
  Eye, 
  EyeOff,
  ArrowRight, 
  CheckCircle2
} from 'lucide-react';
import { FormInput } from "../components/FormInput.jsx";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth.js";
import { AuthContext } from "../contexts/auth.context.jsx";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const { handleLogin } = useAuth();

  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please enter a valid email address';
    }

    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    //api request here
    await handleLogin({email, password});

    setIsSubmitting(false);
    setLoginSuccess(true);

    navigate("/");
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
        <div className="border border-gray-200 w-[600px] p-4 mx-auto rounded-md shadow-md">
            {/*Header*/}
            <div className="mb-4 ">
                <h1 className="text-center text-2xl font-bold">Login</h1>
                <p className="text-sm text-center text-gray-500">Welcome back</p>
            </div>

            {/* Success Banner */}
            {loginSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start space-x-3 text-sm animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                    <span className="font-semibold block">Authentication Successful!</span>
                </div>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <FormInput
                id="login-email"
                label="Email Address"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: '' });
                }}
                error={errors.email}
                icon={Mail}
                />

                <FormInput
                id="login-password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
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
                    <span>Sign In to Account</span>
                    <ArrowRight className="w-4 h-4" />
                    </>
                )}
                </button>
            </form>

            {/* Navigation Link to Register */}
            <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs sm:text-sm text-slate-500">
                Don&apos;t have an account yet?{' '}
                <Link
                to="/auth/register"
                className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline ml-1"
                >
                Create account
                </Link>
            </div>
        </div>
    </div>
  );
};

export { Login };