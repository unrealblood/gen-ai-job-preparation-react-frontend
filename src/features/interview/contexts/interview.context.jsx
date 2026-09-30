import { createContext, useState } from "react";

export const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState(null);
    const [reports, setReports] = useState([]);
    const [error, setError] = useState(null);

    return (
        <InterviewContext value={{ loading, setLoading, error, setError, report, setReport, reports, setReports }}>
            {children}
        </InterviewContext>
    );
}