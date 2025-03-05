import PageTitle from "../components/PageTitle.tsx";
import Login from "../components/Login.tsx";
const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <PageTitle />
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <Login />
      </div>
    </div>
  );
};

// const LoginPage = () => {
//   return (
//     <div>
//       <PageTitle />
//       <Login />
//     </div>
//   );
// };

export default LoginPage;
