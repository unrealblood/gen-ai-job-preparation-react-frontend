import { useState, useEffect } from 'react';
import {
ArrowRight,
Sparkles,
ChevronDown,
Code2,
MessageSquareQuote,
Compass,
Target,
AlertTriangle,
Lightbulb,
CheckCircle
} from 'lucide-react';
import { useInterview } from '../hooks/useInterview.js';
import { useParams } from 'react-router';

function Interview() {
  const { report, getReportById, loading, error } = useInterview();
  const { interviewId } = useParams();

  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchReport() {
      try {
        if(interviewId) {
          await getReportById(interviewId);
        }
      }
      catch(err) {
        if (isMounted) {
          setFetchError(err.message || "Failed to load report.");
        }
      }
    }

    fetchReport();

    return () => {
      isMounted = false;
    }
  }, [interviewId]);

  const [activeTab, setActiveTab] = useState('technical'); // 'technical' | 'behavioral' | 'roadmap'
  const [expandedIndex, setExpandedIndex] = useState(0); // Accordion state

  const toggleAccordion = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  // 1. Loading State
  if (loading) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center">
        <p className="text-slate-500 font-medium">Loading report...</p>
      </div>
    );
  }

  // 2. Error State
  const displayError = fetchError || error?.message;
  if (displayError) {
    return (
      <div className="w-full max-w-lg mx-auto my-12 p-6 bg-white border border-rose-200 rounded-2xl shadow-sm text-center">
        <AlertTriangle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-900 mb-1">Unable to Load Report</h3>
        <p className="text-sm text-slate-600 mb-4">{displayError}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition cursor-pointer"
        >
          Retry
        </button>
      </div>
    );
  }

  // 3. Null Check
  if (!report) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center">
        <p className="text-slate-500">No report available.</p>
      </div>
    );
  }

  const navItems = [
    {
      id: 'technical',
      label: 'Technical questions',
      icon: Code2,
      badge: report.technicalQuestions.length,
      desc: 'Coding paradigms & backend internals'
    },
    {
      id: 'behavioral',
      label: 'Behavioral questions',
      icon: MessageSquareQuote,
      badge: report.behavioralQuestions.length,
      desc: 'STAR method & scenario analysis'
    },
    {
      id: 'roadmap',
      label: 'Road map',
      icon: Compass,
      badge: `${report.preparationPlan.length} Days`,
      desc: 'Personalized preparation sprint'
    }
  ];

  const currentQuestions = activeTab === 'technical' 
    ? report.technicalQuestions 
    : activeTab === 'behavioral' 
      ? report.behavioralQuestions 
      : [];

  return (
    <div className="w-full p-4">
      {/* Top Header Banner for the Interview Page */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200/80 pb-5 gap-3">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Interview Preparation Assistant</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Target Role Assessment & Roadmap
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Derived from your candidate profile, target job posting, and uploaded resume.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
            Report Ready!
          </span>
        </div>
      </div>

      {/* Main 3-Column Layout: Left Nav, Middle Content, Right Score & Gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ================= LEFT SIDE: Vertical Navigation Bar ================= */}
        <aside className="lg:col-span-3 bg-slate-50/80 p-3 rounded-2xl border border-slate-200/80">
          <div className="px-3 py-2 text-[11px] font-bold tracking-wider uppercase text-slate-400">
            Navigation Sections
          </div>
          
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setExpandedIndex(0);
                  }}
                  className={`w-full flex items-start p-3 rounded-xl transition-all duration-200 text-left group ${
                    isActive
                      ? 'bg-white shadow-sm border border-indigo-200/80 text-indigo-900 ring-2 ring-indigo-500/10'
                      : 'hover:bg-white/60 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <div className={`p-2 rounded-lg mr-3 transition-colors ${
                    isActive 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-slate-200/70 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs sm:text-sm font-semibold truncate ${isActive ? 'text-indigo-950 font-bold' : 'text-slate-700'}`}>
                        {item.label}
                      </span>
                      <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-medium ${
                        isActive ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200/80 text-slate-500'
                      }`}>
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Quick tips panel in sidebar */}
          <div className="mt-5 p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 text-amber-900">
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-amber-800 mb-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
              <span>Prep Tip</span>
            </div>
            <p className="text-[11px] text-amber-700 leading-relaxed">
              Click any question to examine why interviewers ask it and how to format your answer.
            </p>
          </div>
        </aside>

        {/* ================= MIDDLE PART: Content Display ================= */}
        <section className="lg:col-span-6 space-y-4">
          
          {/* Header of the middle section */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                {activeTab === 'technical' && <Code2 className="w-5 h-5" />}
                {activeTab === 'behavioral' && <MessageSquareQuote className="w-5 h-5" />}
                {activeTab === 'roadmap' && <Compass className="w-5 h-5" />}
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 capitalize">
                  {activeTab === 'roadmap' ? '5-Day Preparation Roadmap' : `${activeTab} Questions`}
                </h2>
                <p className="text-xs text-slate-500">
                  {activeTab === 'roadmap' 
                    ? 'Structured daily milestones designed for your job application' 
                    : `Total questions: ${currentQuestions.length} curated scenarios`}
                </p>
              </div>
            </div>

            {activeTab !== 'roadmap' && (
              <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full border border-slate-200">
                {currentQuestions.length} Questions
              </span>
            )}
          </div>

          {/* Accordion List for Technical or Behavioral Questions */}
          {(activeTab === 'technical' || activeTab === 'behavioral') && (
            <div className="space-y-3">
              {currentQuestions.map((item, idx) => {
                const isOpen = expandedIndex === idx;
                return (
                  <div 
                    key={idx}
                    className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm ${
                      isOpen ? 'border-indigo-400 ring-4 ring-indigo-500/5' : 'border-slate-200/80 hover:border-slate-300'
                    }`}
                  >
                    {/* Accordion Header / Question Trigger */}
                    <button
                      type="button"
                      onClick={() => toggleAccordion(idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                    >
                      <div className="flex items-start space-x-3.5">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                          isOpen ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {idx + 1}
                        </span>
                        <div>
                          <h3 className={`text-sm sm:text-base font-semibold leading-snug transition-colors ${
                            isOpen ? 'text-indigo-950' : 'text-slate-800'
                          }`}>
                            {item.question}
                          </h3>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[11px] font-medium text-slate-400">
                              Click to {isOpen ? 'hide breakdown' : 'view model answer & intention'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className={`p-1.5 rounded-lg transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 bg-indigo-50 text-indigo-600' : 'text-slate-400 bg-slate-50'
                      }`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {/* Accordion Expanded Content */}
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 border-t border-slate-100 space-y-4 animate-fadeIn">
                        
                        {/* Designed Intention Label Box */}
                        <div className="bg-amber-50/70 border border-amber-200/70 rounded-xl p-3.5 text-xs text-amber-900 space-y-1">
                          <div className="flex items-center space-x-1.5 font-bold tracking-wide text-amber-800 uppercase text-[10px]">
                            <Target className="w-3.5 h-3.5 text-amber-600" />
                            <span>Interviewer Intention</span>
                          </div>
                          <p className="leading-relaxed text-slate-700 pl-5 font-normal">
                            {item.intention}
                          </p>
                        </div>

                        {/* Designed Model Answer Label Box */}
                        <div className="bg-indigo-50/50 border border-indigo-200/70 rounded-xl p-3.5 text-xs text-slate-800 space-y-1.5">
                          <div className="flex items-center space-x-1.5 font-bold tracking-wide text-indigo-700 uppercase text-[10px]">
                            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                            <span>Designed Model Answer</span>
                          </div>
                          <p className="leading-relaxed text-slate-700 pl-5 font-normal">
                            {item.answer}
                          </p>
                        </div>

                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Road map View */}
          {activeTab === 'roadmap' && (
            <div className="space-y-4">
              {report.preparationPlan.map((plan) => (
                <div 
                  key={plan.day} 
                  className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow transition"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3.5">
                    <div className="flex items-center space-x-3">
                      <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-sm shadow-indigo-600/30">
                        D{plan.day}
                      </span>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">
                          Day {plan.day} Milestone
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">
                          {plan.focus}
                        </h4>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      {plan.tasks.length} tasks
                    </span>
                  </div>

                  <ul className="space-y-2.5">
                    {plan.tasks.map((task, tIdx) => (
                      <li key={tIdx} className="flex items-start space-x-2.5 text-xs text-slate-600 leading-relaxed">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

        </section>

        {/* ================= RIGHT SIDE: Large Score & Skill Gaps ================= */}
        <aside className="lg:col-span-3 space-y-6">
          
          {/* Match Score Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md text-center relative overflow-hidden">
            {/* Top background accent */}
            <div className="absolute top-0 inset-x-0 h-2 bg-linear-to-r from-indigo-500 via-indigo-600 to-emerald-400" />

            <div className="flex items-center justify-center space-x-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Candidate Alignment</span>
            </div>

            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Match Score
            </h3>

            {/* Circular Gauge Representation */}
            <div className="relative my-4 flex items-center justify-center">
              <div className="w-36 h-36 rounded-full border-8 border-slate-100 flex items-center justify-center relative">
                {/* SVG Radial Indicator */}
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="transparent"
                    stroke="#EEF2F6"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="transparent"
                    stroke="#4F46E5"
                    strokeWidth="8"
                    strokeDasharray="264"
                    strokeDashoffset="38" // ~86% fill
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>

                {/* Score Number in Center */}
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    86%
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-0.5">
                    High Fit
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Synthesized by cross-referencing your <span className="font-semibold text-slate-700">Self Description</span>, target <span className="font-semibold text-slate-700">Job Description</span>, and analyzed <span className="font-semibold text-slate-700">PDF Resume</span>.
            </p>

            {/* Micro Breakdown Metrics */}
            <div className="space-y-2 border-t border-slate-100 pt-3 text-left">
              <div>
                <div className="flex justify-between text-[11px] font-medium text-slate-600 mb-1">
                  <span>Resume vs Job Req</span>
                  <span className="font-semibold text-indigo-600">89%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full" style={{ width: '89%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-medium text-slate-600 mb-1">
                  <span>Self Description Match</span>
                  <span className="font-semibold text-emerald-600">83%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '83%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Skill Gaps Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-md">
            <div className="flex items-center space-x-2 text-rose-600 mb-3">
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Identified Skill Gaps
              </h3>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Focus on addressing these areas during your upcoming behavioral and technical rounds:
            </p>

            <div className="space-y-2.5">
              {report.skillGaps.map((item, idx) => (
                <div 
                  key={idx}
                  className="flex items-start space-x-2.5 p-3 rounded-xl bg-rose-50/60 border border-rose-100/90 text-rose-950 transition hover:bg-rose-50"
                >
                  <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <span className="text-xs font-bold block text-slate-800">
                      {item.skill}
                    </span>
                    <span className="text-[11px] text-slate-500 mt-0.5 block">
                      Targeted in Roadmap Days {idx + 3} & mock discussions.
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100">
              <a
                href="#plan"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('roadmap');
                }}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center justify-center space-x-1 group"
              >
                <span>Follow Roadmap to bridge these gaps</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

        </aside>

      </div>
    </div>
  );
}

export { Interview };