// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ProfileInfo from '../../components/Cards/ProfileInfo';
import SearchBar from '../Search/SearchBar';

const Nabar = () => {
  const [searchQuery,setSearchQuery] = useState("")
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const onLogout = () => {
    navigate("/login"); // Sử dụng navigate để chuyển hướng
  }
  const handleSearch = ()=>{

  };
  const onClearSearch =()=>{
    setSearchQuery("")
  }

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
      <h2 className='text-xl font-medium text-black py-2'>The Royal Sea</h2>
      <SearchBar
      value={searchQuery}
      onChange={({target})=>{
        setSearchQuery (target.value);
      }}
      handleSearch={handleSearch}
      onClearSearch={onClearSearch}
      />

      <ProfileInfo onLogout={onLogout} />
    </div>
  );
}

export default Nabar;
