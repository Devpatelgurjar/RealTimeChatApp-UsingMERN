import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api/v1/" : "/api/v1/",
    withCredentials: true,
}); 

// If you're making API requests to a server with a different origin (e.g., localhost:5001 making a request to api.example.com), the browser by default does not send cookies for security reasons.
// By setting withCredentials: true, you explicitly tell the browser to include cookies or credentials (like a session token) with the request.
// Example: When your frontend needs to authenticate a user session stored in a cookie on the backend.