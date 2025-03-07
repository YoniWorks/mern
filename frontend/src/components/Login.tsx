import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { buildPath } from "./Path";
import { storeToken } from "../tokenStorage";

function Login() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [loginName, setLoginName] = useState("");
    const [loginPassword, setPassword] = useState("");

    const doLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        const obj = { username: loginName, password: loginPassword };

        try {
            const response = await axios.post(buildPath("api/login"), obj, {
                headers: { "Content-Type": "application/json" }
            });

            const res = response.data;
            console.log("🔄 Login Response:", res);

            if (res.error) {
                setMessage("User/Password combination incorrect");
            } else {
                storeToken(res.jwtToken); // ✅ JWT 저장
                
                // ✅ 서버에서 받은 사용자 정보 저장 (JWT에서 추출하지 않음)
                const user = {
                    firstName: res.firstName,
                    lastName: res.lastName,
                    userId: res.userId,
                };
                localStorage.setItem("user_data", JSON.stringify(user));

                navigate("/cards"); // ✅ 로그인 성공 후 이동
            }
        } catch (error: unknown) {
            console.error("❌ Login Error:", error);
        
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    // 서버에서 반환한 에러 메시지가 있는 경우
                    const errorMessage = error.response.data.error || "Unexpected error";
                    setMessage(`❌ Login failed: ${errorMessage}`);
                } else {
                    // 네트워크 문제로 인해 응답을 받지 못한 경우
                    setMessage("❌ Login failed: Network Error. Please check your connection.");
                }
            } else {
                // 기타 예외 처리
                setMessage(`❌ Login failed: ${String(error)}`);
            }
        }
        
    };

    return (
        <div className="flex flex-col items-center">
            <div className="bg-gray-100 p-12 rounded-xl shadow-lg w-full max-w-2xl min-h-[500px] flex flex-col items-center justify-center">
                <h2 className="text-5xl font-bold text-center text-gray-800 mb-15">Sign In</h2>

                <form onSubmit={doLogin} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full px-6 py-4 text-lg border border-gray-300 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        value={loginName}
                        onChange={(e) => setLoginName(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-6 py-4 text-lg border border-gray-300 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        value={loginPassword}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="w-full bg-yellow-500 text-black font-bold py-4 text-xl rounded-xl shadow-lg hover:bg-yellow-600 transition"
                    >
                        LOGIN
                    </button>
                </form>

                {message && <p className="text-red-500 text-sm text-center mt-2">{message}</p>}

                <p className="text-center text-base text-gray-600 mt-4">
                    Not registered?{" "}
                    <a href="/register" className="text-blue-500 hover:underline">
                        Create an account.
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login;


// import React, { useState, useEffect } from "react";
// import { buildPath } from "./Path";
// import { useJwt } from "react-jwt";
// import { storeToken } from "../tokenStorage";
// import { useNavigate } from "react-router-dom"; 
// // import axios from 'axios'

// function Login() {
//   const navigate = useNavigate(); // ✅ 로그인 후 이동을 위해 사용
//   const [message, setMessage] = useState("");
//   const [loginName, setLoginName] = useState("");
//   const [loginPassword, setPassword] = useState("");
//   const [jwtToken, setJwtToken] = useState<string | null>(null);
//   const { isExpired } = useJwt(jwtToken ?? ""); // ✅ 토큰 유효성 확인

//   useEffect(() => {
//     if (jwtToken && isExpired) {
//       setMessage("Session expired. Please log in again.");
//     }
//   }, [jwtToken, isExpired]);

//   async function doLogin(event: React.FormEvent): Promise<void> {
//     event.preventDefault();

//     const obj = { login: loginName, password: loginPassword };
//     const js = JSON.stringify(obj);

//     try {
//       const response = await fetch(buildPath("api/login"), {
//         method: "POST",
//         body: js,
//         headers: { "Content-Type": "application/json" },
//       });

//       const res = await response.json();
//       console.log("Login Response:", res);

//       if (res.id <= 0) {
//         setMessage("User/Password combination incorrect");
//       } else {
//         // ✅ 토큰 상태 업데이트
//         setJwtToken(res.jwtToken);
//         storeToken(res.jwtToken); // ✅ 로컬 및 세션 스토리지에 저장

//         const user = { firstName: res.firstName, lastName: res.lastName, id: res.id };
//         localStorage.setItem("user_data", JSON.stringify(user));

//         setMessage("");

//         // ✅ `window.location.href` 대신 `navigate` 사용
//         navigate("/cards");
//       }
//     } catch (error: any) {
//       alert(error.toString());
//     }
//   }

//   return (
//     <div className="flex flex-col items-center">
//       <div className="bg-gray-100 p-12 rounded-xl shadow-lg w-full max-w-2xl min-h-[500px] flex flex-col items-center justify-center">
//         <h2 className="text-5xl font-bold text-center text-gray-800 mb-15">Sign In</h2>

//         <form onSubmit={doLogin} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Username"
//             className="w-full px-6 py-4 text-lg border border-gray-300 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//             value={loginName}
//             onChange={(e) => setLoginName(e.target.value)}
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full px-6 py-4 text-lg border border-gray-300 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//             value={loginPassword}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <button
//             type="submit"
//             className="w-full bg-yellow-500 text-black font-bold py-4 text-xl rounded-xl shadow-lg hover:bg-yellow-600 transition"
//           >
//             LOGIN
//           </button>
//         </form>

//         {message && <p className="text-red-500 text-sm text-center mt-2">{message}</p>}

//         <p className="text-center text-base text-gray-600 mt-4">
//           Not registered?{" "}
//           <a href="/register" className="text-blue-500 hover:underline">
//             Create an account.
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;


// import React, { useState, useEffect } from "react";
// import { buildPath } from "./Path";
// import { useJwt } from "react-jwt";
// import { storeToken } from "../tokenStorage";

// function Login() {
//   const [message, setMessage] = useState("");
//   const [loginName, setLoginName] = useState("");
//   const [loginPassword, setPassword] = useState("");
//   const [jwtToken, setJwtToken] = useState<string | null>(null);

//   // ✅ JWT 토큰이 변경될 때마다 만료 여부 확인
//   const { isExpired } = useJwt(jwtToken ?? "");

//   useEffect(() => {
//     if (jwtToken && isExpired) {
//       setMessage("Session expired. Please log in again.");
//     }
//   }, [jwtToken, isExpired]);

//   async function doLogin(event: React.FormEvent): Promise<void> {
//     event.preventDefault();

//     const obj = { login: loginName, password: loginPassword };
//     const js = JSON.stringify(obj);

//     try {
//       const response = await fetch(buildPath("api/login"), {
//         method: "POST",
//         body: js,
//         headers: { "Content-Type": "application/json" },
//       });

//       const res = await response.json();
//       console.log("Login Response:", res);

//       if (res.id <= 0) {
//         setMessage("User/Password combination incorrect");
//       } else {
//         // ✅ JWT 토큰 상태에 저장 후 `useEffect`에서 만료 확인
//         setJwtToken(res.jwtToken);
//         storeToken(res.jwtToken);

//         const user = { firstName: res.firstName, lastName: res.lastName, id: res.id };
//         localStorage.setItem("user_data", JSON.stringify(user));

//         setMessage("");
//         window.location.href = "/cards";
//       }
//     } catch (error: any) {
//       alert(error.toString());
//     }
//   }

//   return (
//     <div className="flex flex-col items-center">
//       <div className="bg-gray-100 p-12 rounded-xl shadow-lg w-full max-w-2xl min-h-[500px] flex flex-col items-center justify-center">
//         <h2 className="text-5xl font-bold text-center text-gray-800 mb-15">Sign In</h2>

//         <form onSubmit={doLogin} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Username"
//             className="w-full px-6 py-4 text-lg border border-gray-300 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//             value={loginName}
//             onChange={(e) => setLoginName(e.target.value)}
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full px-6 py-4 text-lg border border-gray-300 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//             value={loginPassword}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <button
//             type="submit"
//             className="w-full bg-yellow-500 text-black font-bold py-4 text-xl rounded-xl shadow-lg hover:bg-yellow-600 transition"
//           >
//             LOGIN
//           </button>
//         </form>

//         {message && <p className="text-red-500 text-sm text-center mt-2">{message}</p>}

//         <p className="text-center text-base text-gray-600 mt-4">
//           Not registered?{" "}
//           <a href="/register" className="text-blue-500 hover:underline">
//             Create an account.
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;


// import React, { useState } from "react";
// import { buildPath } from "./Path";
// import { useJwt } from "react-jwt"; 
// import { storeToken} from "../tokenStorage"; 

// function Login() {
//   const [message, setMessage] = useState("");
//   const [loginName, setLoginName] = useState("");
//   const [loginPassword, setPassword] = useState("");

//   async function doLogin(event: React.FormEvent): Promise<void> {
//     event.preventDefault();

//     const obj = { login: loginName, password: loginPassword };
//     const js = JSON.stringify(obj);

//     try {
//       const response = await fetch(buildPath("api/login"), {
//         method: "POST",
//         body: js,
//         headers: { "Content-Type": "application/json" },
//       });

//       const res = await response.json();

//       if (res.id <= 0) {
//         setMessage("User/Password combination incorrect");
//       } else {

//         storeToken(res.jwtToken);


//         const { isExpired } = useJwt(res.jwtToken);
//         if (isExpired) {
//           setMessage("Session expired. Please log in again.");
//           return;
//         }

//         const user = { firstName: res.firstName, lastName: res.lastName, id: res.id };
//         localStorage.setItem("user_data", JSON.stringify(user));

//         setMessage("");
//         window.location.href = "/cards"; 
//       }
//     } catch (error: any) {
//       alert(error.toString());
//     }
//   }

//   return (
//     <div className="flex flex-col items-center">
//       <div className="bg-gray-100 p-12 rounded-xl shadow-lg w-full max-w-2xl min-h-[500px] flex flex-col items-center justify-center">
//         <h2 className="text-5xl font-bold text-center text-gray-800 mb-15">Sign In</h2>

//         <form onSubmit={doLogin} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Username"
//             className="w-full px-6 py-4 text-lg border border-gray-300 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//             value={loginName}
//             onChange={(e) => setLoginName(e.target.value)}
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full px-6 py-4 text-lg border border-gray-300 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//             value={loginPassword}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <button
//             type="submit"
//             className="w-full bg-yellow-500 text-black font-bold py-4 text-xl rounded-xl shadow-lg hover:bg-yellow-600 transition"
//           >
//             LOGIN
//           </button>
//         </form>

//         {message && <p className="text-red-500 text-sm text-center mt-2">{message}</p>}

//         <p className="text-center text-base text-gray-600 mt-4">
//           Not registered?{" "}
//           <a href="/register" className="text-blue-500 hover:underline">
//             Create an account.
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;


// import React, { useState } from 'react';
// import { buildPath } from './Path';

// function Login() {
//   const [message, setMessage] = useState('');
//   const [loginName, setLoginName] = useState('');
//   const [loginPassword, setPassword] = useState('');

//   async function doLogin(event: React.FormEvent): Promise<void> {
//     event.preventDefault();

//     const obj = { login: loginName, password: loginPassword };
//     const js = JSON.stringify(obj);

//     try {
//       const response = await fetch(buildPath('api/login'), {
//         method: 'POST',
//         body: js,
//         headers: { 'Content-Type': 'application/json' }
//       });

//       const res = await response.json();

//       if (res.id <= 0) {
//         setMessage('User/Password combination incorrect');
//       } else {
//         const user = { firstName: res.firstName, lastName: res.lastName, id: res.id };
//         localStorage.setItem('user_data', JSON.stringify(user));

//         setMessage('');
//         window.location.href = '/cards';
//       }
//     } catch (error: any) {
//       alert(error.toString());
//     }
//   }

//   return (
//     <div className="flex flex-col items-center">
//       <div className="bg-gray-100 p-12 rounded-xl shadow-lg w-full max-w-2xl min-h-[500px] flex flex-col items-center justify-center">
//         <h2 className="text-5xl font-bold text-center text-gray-800 mb-15">Sign In</h2>

//         <form onSubmit={doLogin} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Username"
//             className="w-full px-6 py-4 text-lg border border-gray-300 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//             value={loginName}
//             onChange={(e) => setLoginName(e.target.value)}
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full px-6 py-4 text-lg border border-gray-300 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//             value={loginPassword}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <button
//             type="submit"
//             className="w-full bg-yellow-500 text-black font-bold py-4 text-xl rounded-xl shadow-lg hover:bg-yellow-600 transition"
//           >
//             LOGIN
//           </button>
//         </form>

//         {message && <p className="text-red-500 text-sm text-center mt-2">{message}</p>}

//         <p className="text-center text-base text-gray-600 mt-4">
//           Not registered?{' '}
//           <a href="/register" className="text-blue-500 hover:underline">
//             Create an account.
//           </a>
//         </p>
//       </div>
//     </div>
//   );  
// }

// export default Login;



// import React, { useState } from 'react';

// const app_name = 'yoniworks.net';
// function buildPath(route: string): string {
//     if (process.env.NODE_ENV !== 'development') {
//         return 'http://' + app_name + ':5000/' + route;
//     } else {
//         return 'http://localhost:5000/' + route;
//     }
// }

// function Login() {

//   const [message,setMessage] = useState('');
//   const [loginName,setLoginName] = React.useState('');
//   const [loginPassword,setPassword] = React.useState('');

//   async function doLogin(event:any) : Promise<void>
//   {
//       event.preventDefault();

//       var obj = {login:loginName,password:loginPassword};
//       var js = JSON.stringify(obj);

//       try
//       {    
//         const response = await fetch(buildPath('api/login'),
//         {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
        

//           var res = JSON.parse(await response.text());

//           if( res.id <= 0 )
//           {
//               setMessage('User/Password combination incorrect');
//           }
//           else
//           {
//               var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
//               localStorage.setItem('user_data', JSON.stringify(user));

//               setMessage('');
//               window.location.href = '/cards';
//             }
//         }
//         catch(error:any)
//         {
//             alert(error.toString());
//             return;
//         }    
//       };


//   function handleSetLoginName( e: any ) : void
//     {
//       setLoginName( e.target.value );
//     }

  
//     function handleSetPassword( e: any ) : void
//     {
//       setPassword( e.target.value );
//     }


// //   return (
// //     <div id="loginDiv">
// //       <span id="inner-title">PLEASE LOG IN</span>
// //       <br />
// //       Login: <input type="text" id="loginName" placeholder="Username" 
// //           onChange={handleSetLoginName} />

// //       <br />
// //       Password: <input type="password" id="loginPassword" placeholder="Password" 
// //           onChange={handleSetPassword} />

// //       <br />
// //       <input
// //         type="submit"
// //         id="loginButton"
// //         className="buttons"
// //         value="Do It"
// //         onClick={doLogin}
// //       />
// //      <span id="loginResult">{message}</span>
// //     </div>
// //   );
// // }
// return (
//   <div className="flex flex-col items-center">

//     <div className="bg-gray-100 p-12 rounded-xl shadow-lg w-full max-w-2xl min-h-[500px] flex flex-col items-center justify-center">

//       <h2 className="text-5xl font-bold text-center text-gray-800 mb-15">Sign In</h2>

//       <form onSubmit={doLogin} className="space-y-4">

//         <input
//           type="text"
//           placeholder="Username"
//           className="w-full px-6 py-4 text-lg border border-gray-300 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//           value={loginName}
//           onChange={handleSetLoginName}
//         />


//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full px-6 py-4 text-lg border border-gray-300 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//           value={loginPassword}
//           onChange={handleSetPassword}
//         />

//         <button
//           type="submit"
//           className="w-full bg-yellow-500 text-black font-bold py-4 text-xl rounded-xl shadow-lg hover:bg-yellow-600 transition"
//         >
//           LOGIN
//         </button>
//       </form>


//       {message && (
//         <p className="text-red-500 text-sm text-center mt-2">{message}</p>
//       )}


//       <p className="text-center text-base text-gray-600 mt-4">
//         Not registered?{" "}
//         <a href="/register" className="text-blue-500 hover:underline">
//           Create an account.
//         </a>
//       </p>
//     </div>
//   </div>
// );


// };
// export default Login;
