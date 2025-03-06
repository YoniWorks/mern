// import PageTitle from "../components/PageTitle.tsx";
// import Login from "../components/Login.tsx";
// const LoginPage = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <PageTitle />
//       <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
//         <Login />
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

// import PageTitle from "../components/PageTitle.tsx";
// import Login from "../components/Login.tsx";

// const LoginPage = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-gray-200 p-8">
//           <h1 className="text-2xl font-bold text-gray-800">KnightPrep</h1>
//           <p className="text-gray-600">Conquer the Foundation Exam.</p>
//         </div>
//         <div className="w-full md:w-1/2 p-8">
//           <PageTitle />
//           <Login />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

// import PageTitle from "../components/PageTitle.tsx";
// import Login from "../components/Login.tsx";

// const LoginPage = () => {
//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden h-5/6">
//         {/* 왼쪽: UCF 로고 및 타이틀 */}
//         <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-gray-200 p-8">
//           <img src="/MAIN.png" alt="KnightPrep Logo" className="w-32 h-32 mb-4" />
//           <h1 className="text-3xl font-bold text-gray-800">KnightPrep</h1>
//           <p className="text-gray-600 text-lg">Conquer the Foundation Exam.</p>
//         </div>

//         {/* 오른쪽: 로그인 폼 */}
//         <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
//           <PageTitle />
//           <Login />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
// import PageTitle from "../components/PageTitle.tsx";
// import Login from "../components/Login.tsx";
// import Header from "../components/Header.tsx";
// import Footer from "../components/Footer.tsx";

// const LoginPage = () => {
//   return (
//     <div className="flex flex-col h-screen">
//       {/* 헤더 */}
//       <Header />

//       {/* 메인 콘텐츠 */}
//       <div className="flex-grow flex items-center justify-center bg-gray-100">
//         <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden h-5/6">
//           {/* 왼쪽: UCF 로고 및 타이틀 */}
//           <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-gray-200 p-8">
//             <img src="/MAIN.png" alt="KnightPrep Logo" className="w-32 h-32 mb-4" />
//             <h1 className="text-3xl font-bold text-gray-800">KnightPrep</h1>
//             <p className="text-gray-600 text-lg">Conquer the Foundation Exam.</p>
//           </div>

//           {/* 오른쪽: 로그인 폼 */}
//           <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
//             <PageTitle />
//             <Login />
//           </div>
//         </div>
//       </div>

//       {/* 푸터 */}
//       <Footer />
//     </div>
//   );
// };

// export default LoginPage;

// import React from "react";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import PageTitle from "../components/PageTitle";
// import Login from "../components/Login";

// const LoginPage = () => {
//   return (
//     <div>
//       <Header />
//       <main>
//         <div>
//           {/* 왼쪽: UCF 로고 및 설명 */}
//           <div>
//             <img src="/mnt/data/MAIN.png" alt="KnightPrep Logo" />
//             <PageTitle />
//           </div>

//           {/* 오른쪽: 로그인 폼 */}
//           <div>
//             <Login />
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default LoginPage;

// import React from "react";
// import PageTitle from "../components/PageTitle";
// import Login from "../components/Login";

// const LoginPage = () => {
//   return (
//     <div>

//       <main>
//         <div style={{ display: 'flex', width: '100%', height: '100vh' }}>
//           {/* 왼쪽: UCF 로고 및 설명 */}
//           <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1f2937', color: 'white', padding: '20px' }}>
//             <img src="/mnt/data/MAIN.png" alt="KnightPrep Logo" style={{ width: '150px', marginBottom: '20px' }} />
//             <PageTitle />
//           </div>

//           {/* 오른쪽: 로그인 폼 */}
//           <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
//             <Login />
//           </div>
//         </div>
//       </main>

//     </div>
//   );
// };

// export default LoginPage;

// import React from "react";
import PageTitle from "../components/PageTitle";
import Login from "../components/Login";
import Header from "../components/Header"; // 헤더 추가
import Footer from "../components/Footer"; // 푸터 추가

const LoginPage = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col">
      {/* 헤더: 화면 상단 고정 */}
      <Header />

      {/* 메인 컨텐츠 */}
      <div className="flex flex-1">
        {/* 왼쪽: UCF 로고 및 설명 */}
        <div className="w-1/2 flex flex-col items-center justify-center bg-white text-white">
          <PageTitle />
        </div>

        {/* 오른쪽: 로그인 폼 */}
        <div className="w-1/2 flex items-center justify-center p-10">
          <Login />
        </div>
      </div>

      {/* 푸터: 화면 하단 고정 */}
      <Footer />
    </div>
  );
};

export default LoginPage;
