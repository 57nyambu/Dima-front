import { createContext, useContext, useState, useEffect } from "react";

// Create AuthContext
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check local storage for auth token
        const token = localStorage.getItem("accessToken");
        const role = localStorage.getItem("role"); // Fetch role if stored
        if (token) {
            setUser({ token, role });
        }
    }, []);

    const login = (token, role) => {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("role", role);
        setUser({ token, role });
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("role");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Export useAuth as default
const useAuth = () => useContext(AuthContext);
export default useAuth;
