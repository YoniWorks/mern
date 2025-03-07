import PageTitle from "../components/PageTitle";
import Register from "../components/Register";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RegisterPage = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col">
      {/* 헤더 */}
      <Header />

      {/* 메인 컨텐츠 */}
      <div className="flex flex-1">
        {/* 왼쪽: UCF 로고 및 설명 */}
        <div className="w-1/2 flex flex-col items-center justify-center bg-white text-white">
          <PageTitle />
        </div>

        {/* 오른쪽: 회원가입 폼 */}
        <div className="w-1/2 flex items-center justify-center p-10">
          <Register />
        </div>
      </div>

      {/* 푸터 */}
      <Footer />
    </div>
  );
};

export default RegisterPage;
