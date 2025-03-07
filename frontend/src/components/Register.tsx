import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { buildPath } from "./Path";

function Register() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState(""); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const doRegister = async (event: React.FormEvent) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }

        const obj = { firstName, lastName, username, email, password };

        try {
            const response = await axios.post(buildPath("api/register"), obj, {
                headers: { "Content-Type": "application/json" }
            });

            const res = response.data;
            console.log("🔄 Register Response:", res);

            if (res.error) {
                setMessage("❌ Registration failed: " + res.error);
            } else {
                setMessage("✅ Registration successful!");
                setTimeout(() => navigate("/"), 1000);
            }
        } catch (error: unknown) {
            console.error("❌ Register Error:", error);
        
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    // 서버에서 반환한 에러 메시지가 있는 경우
                    const errorMessage = error.response.data.error || "Unexpected error";
                    setMessage(`❌ Registration failed: ${errorMessage}`);
                } else {
                    // 네트워크 문제로 인해 응답을 받지 못한 경우
                    setMessage("❌ Registration failed: Network Error. Please check your connection.");
                }
            } else {
                // 기타 예외 처리
                setMessage(`❌ Registration failed: ${String(error)}`);
            }
        }
        
    };

    return (
        <div className="flex flex-col items-center">
            <div className="bg-gray-100 p-12 rounded-xl shadow-lg w-full max-w-2xl min-h-[500px] flex flex-col items-center justify-center">
                <h2 className="text-5xl font-bold text-center text-gray-800 mb-15">Sign Up</h2>

                <form onSubmit={doRegister} className="space-y-4">
                    <input
                        type="text"
                        placeholder="First Name"
                        className="w-full px-6 py-4 text-lg border border-gray-300 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Last Name"
                        className="w-full px-6 py-4 text-lg border border-gray-300 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Username" // 🔹 추가된 필드
                        className="w-full px-6 py-4 text-lg border border-gray-300 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-6 py-4 text-lg border border-gray-300 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-6 py-4 text-lg border border-gray-300 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password" // 🔹 비밀번호 확인 추가
                        className="w-full px-6 py-4 text-lg border border-gray-300 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-yellow-500 text-black font-bold py-4 text-xl rounded-xl shadow-lg hover:bg-yellow-600 transition"
                    >
                        REGISTER
                    </button>
                </form>

                {message && <p className="text-red-500 text-sm text-center mt-2">{message}</p>}

                <p className="text-center text-base text-gray-600 mt-4">
                    Already have an account?{" "}
                    <a href="/" className="text-blue-500 hover:underline">
                        Sign in here.
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Register;
