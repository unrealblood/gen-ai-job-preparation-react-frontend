import { generateInterviewReport, getAllInterviewReports, getInterviewReportById } from "../services/interview.api.js";
import { useContext, useEffect } from "react";
import { InterviewContext } from "../contexts/interview.context.jsx";
import { useParams } from "react-router";

export const useInterview = () => {
    const context = useContext(InterviewContext);

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider");
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context;
    const { interviewId } = useParams();

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true);
        let response = null;
        try {
            response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile });
            setReport(response.result);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

        return response.result;
    }

    const getReportById = async (interviewId) => {
        setLoading(true);
        let response = null;
        try {
            response = await getInterviewReportById(interviewId);
            setReport(response.interviewReport);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
        return response.interviewReport;
    }

    const getAllReports = async () => {
        setLoading(true);
        let response = null;
        try {
            response = await getAllInterviewReports();
            setReports(response.interviewReports);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

        return response.interviewReports;
    }

    useEffect(() => {
        if(interviewId) {
            getReportById(interviewId);
        }
        else {
            getAllReports();
        }
    }, [interviewId]);

    return { loading, report, reports, generateReport, getReportById, getAllReports }

}