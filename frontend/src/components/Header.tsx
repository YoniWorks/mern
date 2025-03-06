// import React from "react";
import logo from '../assets/ucflogo.png';

const Header = () => {
    return (
      <header className="bg-black text-yellow-400 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="UCF Logo" className="w-12 h-12" /> {/* 로고 추가 */}
          <h1 className="text-lg font-bold">UNIVERSITY OF CENTRAL FLORIDA</h1>
        </div>
      </header>
    );
};

export default Header;
