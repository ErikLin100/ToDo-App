import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { RiLogoutBoxLine } from "react-icons/ri";

function Header() {
  const [user] = useAuthState(auth);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <header className="flex items-center justify-between p-4 shadow-lg">
      <h1 className="text-3xl font-bold">My Todo App</h1>
      <div className="relative">
        <RiLogoutBoxLine
          className="h-10 w-10 rounded-full cursor-pointer"
          onClick={() => setShowConfirmation(true)}
        />
        {showConfirmation && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p className="text-lg mb-4">Are you sure you want to log out?</p>
              <div className="flex justify-center">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mr-4"
                  onClick={handleLogout}
                >
                  Yes
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                  onClick={() => setShowConfirmation(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;