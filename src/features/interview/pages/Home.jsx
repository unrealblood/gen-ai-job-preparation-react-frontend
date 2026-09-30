import { useEffect, useState } from 'react';
import {
    ArrowRight,
    UserCircle,
    Briefcase
} from 'lucide-react';
import { FormFileInput } from '../components/FormFileInput.jsx';
import { FormTextArea } from '../components/FormTextArea.jsx';
import { useNavigate } from 'react-router';
import { useInterview } from '../hooks/useInterview.js';
import { useAuth } from "../../auth/hooks/useAuth.js";

function Home() {
  const [selfDesc, setSelfDesc] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [generateInterviewReportErrorMessage, setGenerateInterviewReportErrorMessage] = useState("");
  const [fetchReportsError, setFetchReportsError] = useState("");
  const [logoutErrorMessage, setLogoutErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const { loading: authLoading, handleLogout } = useAuth();
  const { generateReport, reports, getAllReports } = useInterview();

  useEffect(() => {
    setFetchReportsError("");

    try {
      async function fetchAllReports() {
        await getAllReports();
      }
      
      fetchAllReports();
    }
    catch(err) {
      if (err.status === 500) {
        setFetchReportsError("Server error. Please try again later.");
      } else {
        setFetchReportsError(err.message);
      }
    }
  }, []);

  if(!reports) {
    return (
        <div>
            <p className='text-center mt-4'>Loading...</p>
        </div>
    );
  }

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

    setGenerateInterviewReportErrorMessage("");

    if (!validate()) return;
    setIsSubmitting(true);
    
    //api call here
    try {
      const data = await generateReport({selfDescription: selfDesc, jobDescription: jobDesc, resumeFile: file});

      navigate(`/interview/${data._id}`);
    }
    catch(err) {
      if (err.status === 500) {
        setGenerateInterviewReportErrorMessage("Server error. Please try again later.");
      } else {
        setGenerateInterviewReportErrorMessage(err.message);
      }
    }
    finally {
      setIsSubmitting(false);
    }
  };

  async function handleLogoutClick() {
    setLogoutErrorMessage("");

    try {
      await handleLogout();

      navigate("/auth/login");
    }
    catch(err) {
      if (err.status === 500) {
        setLogoutErrorMessage("Server error. Please try again later.");
      } else {
        setLogoutErrorMessage(err.message);
      }
    }
  }

  return (
    <div className='min-h-screen flex justify-center items-center flex-col mt-8'>
        <div className='sm:w-[800px] w-[300px] mx-auto mb-4 flex justify-end items-end flex-col gap-2'>
          {logoutErrorMessage !== "" && <p className='text-red-500'>{logoutErrorMessage}</p>}

          <button type='button' onClick={handleLogoutClick} disabled={authLoading} className='cursor-pointer bg-red-500 text-white px-6 py-2 rounded-md'>Logout</button>
        </div>

        <div className="border border-gray-200 sm:w-[800px] w-[300px] p-4 mx-auto rounded-md shadow-md">
          <div className="w-full max-w-2xl mx-auto animate-fadeIn">
              {/* Header */}
              <div className="mb-8 border-b border-slate-100 pb-6 text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Create Your Custom Interview Plan</h2>
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

                  {generateInterviewReportErrorMessage !== "" && <div className="pt-2">
                    <p className='text-red-500 text-center'>{generateInterviewReportErrorMessage}</p>
                  </div>}

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

      {fetchReportsError !== "" && <div className='sm:w-[800px] w-[300px] mx-auto mt-8'>
        <p className='text-red-500'>{fetchReportsError}</p>
      </div>}

      {reports.length > 0 && <div className='sm:w-[800px] w-[300px] mx-auto mt-8'>
        <h2 className='text-xl font-bold pb-4 sm:text-left text-center'>My Recent Interview Plans</h2>

        <div className='flex sm:justify-start sm:items-start sm:flex-row flex-col justify-center items-center flex-wrap gap-4 sm:pb-0 pb-4'>
          {reports.map((report) => (
            <div key={report._id} className='bg-gray-200 p-4 border border-gray-200 shadow-md rounded-md cursor-pointer min-h-32 flex justify-center items-center' onClick={() => navigate(`/interview/${report._id}`)}>
              <div>
                <h3>{report.title || 'Untitled Position'}</h3>
                
                <p className={``}>Match Score: <span className='font-bold'>{report.matchScore}%</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>}
    </div>
  );
}

export { Home };