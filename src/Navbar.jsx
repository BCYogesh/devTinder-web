import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <h1 className="font-bold text-2xl">
          <span className="text-3xl mr-2">👨‍💻</span>
          DevTinder
        </h1>
      </div>
      {user && (
        <div className="flex gap-2">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={user.data.photoURL}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
