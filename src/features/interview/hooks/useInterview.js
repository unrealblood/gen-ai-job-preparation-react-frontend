import { generateInterviewReport, getAllInterviewReports, getInterviewReportById } from "../services/interview.api.js";
import { useContext } from "react";
import { InterviewContext } from "../contexts/interview.context.jsx";

export const useInterview = () => {
    const context = useContext(InterviewContext);

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider");
    }

    const { loading, setLoading, report, setReport, reports, setReports, error, setError } = context;

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true);
        
        let response = null;
        
        try {
            response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile });
            setReport(response?.result);
        }
        catch(error) {
            const statusCode = error.response?.status;
            
            const message =
            error.response?.data?.message ||
            error.response?.data ||
            error.message ||
            "Generate report failed";

            throw {
                statusCode,
                message,
            };
        }
        finally {
            setLoading(false);
        }

        return response?.result;
    }

    const getReportById = async (interviewId) => {
        let response = null;
        setLoading(true);
        setError(null);
        
        try {
            response = await getInterviewReportById(interviewId);
            setReport(response?.interviewReport);
        }
        catch(error) {
            const statusCode = error.response?.status;
            
            const message =
            error.response?.data?.message ||
            error.response?.data ||
            error.message ||
            "Get report by id failed";

            const formattedError = { statusCode, message };
            setError(formattedError);
            throw formattedError;
        }
        finally {
            setLoading(false);
        }

        return response?.interviewReport;
    }

    const getAllReports = async () => {
        setLoading(true);
        
        let response = null;
        
        try {
            response = await getAllInterviewReports();
            setReports(response?.interviewReports);
        }
        catch(error) {
            const statusCode = error.response?.status;
            
            const message =
            error.response?.data?.message ||
            error.response?.data ||
            error.message ||
            "Fetch all reports failed";

            throw {
                statusCode,
                message,
            };
        }
        finally {
            setLoading(false);
        }

        return response?.interviewReports;
    }

    return { loading, report, reports, error, generateReport, getReportById, getAllReports }

}