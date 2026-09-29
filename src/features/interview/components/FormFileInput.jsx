import {
  AlertCircle,
  UploadCloud,
  FileText
} from 'lucide-react';

function FormFileInput({ id, label, accept, onChange, error, file, required = true }) {
  return (
    <div className="space-y-1.5 text-left">
      <label htmlFor={id} className="block text-xs font-semibold text-slate-700 tracking-wide uppercase">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      
      <div className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-200 text-center flex flex-col items-center justify-center group ${error ? 'border-rose-300 bg-rose-50' : (file ? 'border-indigo-300 bg-indigo-50/50' : 'border-slate-200 hover:border-indigo-400 bg-slate-50 hover:bg-slate-100')}`}>
        <input 
          id={id}
          type="file" 
          accept={accept}
          onChange={onChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        
        {file ? (
          <div className="flex flex-col items-center animate-fadeIn">
            <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3">
              <FileText className="w-6 h-6 text-indigo-500" />
            </div>
            <p className="text-sm font-medium text-slate-700 truncate max-w-[200px] sm:max-w-xs">{file.name}</p>
            <p className="text-xs text-slate-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300">
              <UploadCloud className="w-6 h-6 text-slate-400 group-hover:text-indigo-500 transition-colors" />
            </div>
            <p className="text-sm font-medium text-slate-700">Click to upload or drag and drop</p>
            <p className="text-xs text-slate-500 mt-1">PDF up to 3MB</p>
          </div>
        )}
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

export { FormFileInput };