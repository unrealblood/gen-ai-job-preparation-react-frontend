import { AlertCircle } from 'lucide-react';

function FormTextArea ({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  required = true,
  rows = 4,
}) {
  return (
    <div className="space-y-1.5 text-left">
      <label htmlFor={id} className="block text-xs font-semibold text-slate-700 tracking-wide uppercase">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>

      <div className="relative rounded-xl shadow-sm transition-all duration-200">
        {Icon && (
          <div className="absolute top-3 left-0 pl-3.5 flex items-start pointer-events-none text-slate-400">
            <Icon className="h-4 w-4" />
          </div>
        )}

        <textarea
          id={id}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full py-2.5 text-sm rounded-xl transition-all duration-200 bg-white placeholder-slate-400 text-slate-900 border ${
            Icon ? 'pl-10' : 'pl-3.5'
          } pr-3.5 resize-y ${
            error
              ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
              : 'border-slate-200 hover:border-slate-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10'
          } outline-none`}
        />
      </div>

      {error && (
        <p className="flex items-center text-xs text-rose-500 mt-1 space-x-1 animate-fadeIn">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

export { FormTextArea };