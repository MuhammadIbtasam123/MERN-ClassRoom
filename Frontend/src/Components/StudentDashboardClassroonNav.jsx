// import React from 'react';

const NavBar = () => {
  return (
    <nav className="bg-green-950 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10%"
          height="10%"
          viewBox="0 0 466 480"
          fill="#76e9a6"
        >
          <path d="M55.478 437.515c-91.083-59.832-65.101-311.684 72.788-408.538 195.531-137.342 394.863 284.459 319.919 375.644s-301.624 92.726-392.707 32.894z"></path>
          <path
            d="M377.081 281.024c3.223 2.302 3.969 6.781 1.667 10.004-29.695 41.573-61.551 56.298-90.067 56.43-28.064.131-51.321-13.894-64.269-26.842-2.801-2.8-2.801-7.341 0-10.142s7.341-2.8 10.142 0c10.957 10.957 30.728 22.75 54.06 22.641 22.879-.106 50.786-11.677 78.463-50.424 2.302-3.223 6.781-3.969 10.004-1.667z"
            fill="#000"
          ></path>
        </svg>
        <span className="self-center text-2xl ml-2 font-semibold whitespace-nowrap text-white">
          Class Companion
        </span>
      </div>
      <div className="flex items-center">
        <button
          className="text-white mr-4"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/Login";
          }}
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
