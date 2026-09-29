import { Navigate } from "react-router";

function PageNotFound() {
    return (
        <div>
            <p className="text-center mt-4">404 Page Not Found. Go Back To <Navigate to={"/"}><span className="font-bold">Home</span></Navigate>.</p>
        </div>
    );
}

export { PageNotFound };