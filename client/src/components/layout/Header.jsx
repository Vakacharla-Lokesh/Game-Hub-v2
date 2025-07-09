import React, { useEffect, useState } from "react";
import { decodeToken, removeToken } from "../../api/tokenService";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { searchGames } from "../../api/GameService";

function Header() {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const [searchVisible, setSearchVisible] = useState(false);

  const navigate = useNavigate();

  const getUserName = () => {
    const user = decodeToken();
    if (user) {
      console.log(user);
      setUsername(user.user_name);
    }
  };

  useEffect(() => {
    getUserName();
  }, []);

  const setLogout = () => {
    removeToken();
    navigate("/");
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      try {
        const response = await searchGames(searchQuery);

        console.log("the fetched games are: ", response);
      } catch (error) {
        console.log(`Error in searching games: ${error}`);
      }
    }
  };

  return (
    <>
      <div className="sticky top-0 z-90">
        <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <div className="w-full mx-auto px-4 py-1 flex items-center justify-between">
            <div className="flex justify-start items-center">
              <a
                href={"/"}
                className="flex items-center space-x-2 mr-[100px]"
              >
                {/* <img
                  src="src\\assets\\W-icon.png"
                  className="h-8 rounded-full"
                  alt="Logo"
                /> */}
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="stroke-yellow-500"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-miterlimit="10"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    data-icon="SvgWebhook"
                    aria-hidden="true"
                  >
                    <path d="M9.3 10.5C7.9 9.6 7 8.1 7 6.3c0-2.8 2.2-5 5-5s5 2.2 5 5c0 .4-.1.9-.2 1.3"></path>
                    <circle
                      cx="12"
                      cy="6.3"
                      r="2"
                    ></circle>
                    <path d="M15.5 11.9c.7-.4 1.6-.7 2.5-.7 2.8 0 5 2.2 5 5s-2.2 5-5 5c-.4 0-.9-.1-1.3-.2"></path>
                    <circle
                      cx="18"
                      cy="16.2"
                      r="2"
                    ></circle>
                    <path d="M15.5 11.9l-2.3-4M11 16.2h5m-6.7-5.7l-2.3 4m4 1.7c0 2.8-2.2 5-5 5s-5-2.2-5-5c0-2.3 1.6-4.3 3.7-4.8"></path>
                    <circle
                      cx="6"
                      cy="16.2"
                      r="2"
                    ></circle>
                  </svg>
                </div>

                <span className="text-2xl max-md:text-sm font-bold text-yellow-500 p-1.5 max-md:hidden">
                  GameHub
                </span>
              </a>
            </div>

            {/* Profile Section */}

            <div className="flex items-center justify-between">
              <div className="mr-4 flex text-white items-center">
                <Search
                  onClick={() => {
                    setSearchVisible(!searchVisible);
                  }}
                  className="h-[35px]"
                />
                {/* <p>Search</p> */}
                {searchVisible && (
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search games..."
                    className=" bg-transparent border-white border-2 rounded-2xl text-white pl-1.5 ml-2 h-[30px]"
                  />
                )}
              </div>
              <div
                className="flex items-center ml-2"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                <div className="relative">
                  <button className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 mr-2">
                    <img
                      src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                      alt="User"
                    />
                  </button>
                </div>

                <div className="mr-3">
                  {userDropdownOpen && (
                    <div className="absolute right-5 max-md:top-12 mt-5 w-48 bg-white rounded-lg shadow-lg py-2 dark:bg-gray-800 z-50">
                      <div className="font-bold px-4 py-2 text-gray-700 dark:text-white max-md:hidden capitalize">
                        {username || "Guest User"}
                      </div>
                      <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600">
                        Profile
                      </a>

                      <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600">
                        Settings
                      </a>
                      <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600">
                        Help
                      </a>
                      <a
                        onClick={setLogout}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600"
                      >
                        Sign out
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Header;
