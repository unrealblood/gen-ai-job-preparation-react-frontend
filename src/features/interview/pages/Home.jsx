import { useState } from 'react';
import {
    ArrowRight,
    UserCircle,
    Briefcase
} from 'lucide-react';
import { FormFileInput } from '../components/FormFileInput.jsx';
import { FormTextArea } from '../components/FormTextArea.jsx';
import { useNavigate } from 'react-router';
import { useInterview } from '../hooks/useInterview.js';

function Home() {
  const [selfDesc, setSelfDesc] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const { generateReport } = useInterview();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      if (selected.type !== 'application/pdf') {
        setErrors({ ...errors, file: 'Only PDF files are allowed.' });
        setFile(null);
      } else if (selected.size > 10 * 1024 * 1024) {
        setErrors({ ...errors, file: 'File size must be less than 10MB.' });
        setFile(null);
      } else {
        const newErrors = { ...errors };
        delete newErrors.file;
        setErrors(newErrors);
        setFile(selected);
      }
    }
  };

  const validate = () => {
    const errs = {};
    if (!selfDesc.trim()) errs.selfDesc = 'Self description is required.';
    else if (selfDesc.trim().length < 10) errs.selfDesc = 'Please provide a bit more detail.';
    
    if (!jobDesc.trim()) errs.jobDesc = 'Job description is required.';
    else if (jobDesc.trim().length < 10) errs.jobDesc = 'Please provide a bit more detail.';
    
    if (!file) errs.file = 'Resume (PDF) is required.';
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    
    const data = await generateReport({selfDescription: selfDesc, jobDescription: jobDesc, resumeFile: file});

    setIsSubmitting(false);

    navigate(`/interview/${data._id}`);
  };

  return (
    <div className='min-h-screen flex justify-center items-center'>
        <div className="border border-gray-200 w-[800px] p-4 mx-auto rounded-md shadow-md">
            <div className="w-full max-w-2xl mx-auto animate-fadeIn">
                {/* Header */}
                <div className="mb-8 border-b border-slate-100 pb-6 text-center sm:text-left">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Create your custom Interview plan</h2>
                    <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
                    Let our AI analyze the job requirements and your unique profile to build a winning strategy.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormTextArea
                        id="self-desc"
                        label="Self Description"
                        placeholder="I am a highly motivated software engineer with 5 years of experience in..."
                        value={selfDesc}
                        onChange={(e) => {
                        setSelfDesc(e.target.value);
                        if (errors.selfDesc) setErrors({ ...errors, selfDesc: '' });
                        }}
                        error={errors.selfDesc}
                        icon={UserCircle}
                        rows={5}
                    />
                    
                    <FormTextArea
                        id="job-desc"
                        label="Target Job Description"
                        placeholder="Looking for a Senior Frontend Developer role focusing on React, performance..."
                        value={jobDesc}
                        onChange={(e) => {
                        setJobDesc(e.target.value);
                        if (errors.jobDesc) setErrors({ ...errors, jobDesc: '' });
                        }}
                        error={errors.jobDesc}
                        icon={Briefcase}
                        rows={5}
                    />
                    </div>

                    <FormFileInput
                    id="resume-upload"
                    label="Upload Resume"
                    accept=".pdf,application/pdf"
                    file={file}
                    onChange={handleFileChange}
                    error={errors.file}
                    />

                    <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto min-w-[200px] sm:ml-auto py-3 px-6 rounded-xl font-medium text-sm text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-lg shadow-indigo-600/25 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {isSubmitting ? (
                        <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        ) : (
                        <>
                            <span>Generate My Interview Strategy</span>
                            <ArrowRight className="w-4 h-4" />
                        </>
                        )}
                    </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
}

export { Home };