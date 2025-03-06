import logo from '../assets/ucflogo.png';

function PageTitle() {
  return (
    <div className="flex flex-col bg-gray-100 h-screen w-full items-center justify-center">
      <img src={logo} alt="KnightPrep Logo" className="w-80 h-80 mb-4" />
      <h1 className="text-6xl font-bold text-gray-800 mt-6">KnightPrep</h1>
      <p className="text-4xl text-gray-600 mt-2">Conquer the Foundation Exam.</p>
    </div>
  );
}

export default PageTitle;

