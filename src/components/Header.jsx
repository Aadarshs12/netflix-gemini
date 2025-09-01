import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState, useRef } from "react";
import { auth } from "../utils/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { SupportedLanguage } from "../utils/constant";
import { toggleGeminiSearchView } from "../utils/geminiSlice";
import { changeLang } from "../utils/languageSlice";
import { Select } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Logo1 from "../utils/netflix-gemini-newlogo.PNG";
import { BsCaretDownFill } from "react-icons/bs";
import { BsFillHeartFill } from "react-icons/bs";

const Header = () => {
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const showToggleInformation = useSelector(
    (store) => store.gemini?.showGeminiSearch
  );

  const watchlist = useSelector((store)=> store.watchlist?.watchListItems);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Signed out successfully!");
        navigate("/");
      })
      .catch((error) => {
        toast.error("Failed to sign-out!");
      });
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLang(e.target.value));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleGeminiSearchClick = () => {
    dispatch(toggleGeminiSearchView());
  };

  return (
    <div className="absolute flex w-full justify-between items-center z-20 h-fit inset-0 bg-gradient-to-b from-black px-8 py-2">
      <Link to="/browse">
        <img className="w-64 object-cover" src={Logo1} alt="logo" />
      </Link>
      {location.pathname !== "/" && (
        <div className="flex items-center mt-3 gap-3">
          {showToggleInformation && (
            <div className="relative">
              <Select
                name="status"
                aria-label="Project status"
                onChange={handleLanguageChange}
                className="pr-6 block w-full appearance-none rounded-lg border-none bg-white/10 px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/25"
              >
                {SupportedLanguage.map((lang) => (
                  <option
                    className="text-black"
                    key={lang?.identifier}
                    value={lang?.identifier}
                  >
                    {lang?.name}
                  </option>
                ))}
              </Select>
              <FaChevronDown
                className="absolute top-1/2 right-1 transform -translate-y-1/2 h-4 w-4 text-white/60"
                aria-hidden="true"
              />
            </div>
          )}
          <div className="mr-2">
            <Link to={"/watchlist"} className="relative">
              <span className="text-[#fff] text-xl">
                <BsFillHeartFill />
              </span>
              <span className="bg-[#d9232e] text-xs w-4 p-1 h-4 -top-2 -right-3 grid place-content-center rounded-full text-[#fff] absolute ">
                {watchlist.length}
              </span>
            </Link>
          </div>
         {location.pathname === "/browse" && (
  <button
    onClick={handleGeminiSearchClick}
    className="text-sm text-[#fff] flex items-center gap-2 font-semibold py-1 px-4 rounded-lg"
  >
    <span
      style={{
        background: 'linear-gradient(to right, #4992e8 0%, #4e89ee 30%, #7e7dd3 60%, #ca6676 90%)',
        padding: '10px 14px',
        borderRadius: '9999px',
      }}
    >
      {showToggleInformation ? "Go Back" : "Gemini Search"}
    </span>
  </button>
)}




          <div className="relative inline-block text-left" ref={menuRef}>
            <button
              onClick={() => setOpen(!open)}
              className="text-white flex gap-1 items-center"
            >
              <div>
                <img
                  className="rounded-sm w-8 h-8"
                  src="https://occ-0-3646-3647.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABb7kuX9mKPrFGfvZ0oJ9eMBbFCB7ZhumT7uHIoILp1FtGpeIhybv8zoGgNK76rr7N8bMdhn-kkbRnD6ut8mFLwqYXmdpwCw.png?r=eea"
                  alt="user"
                />
              </div>{" "}
              <BsCaretDownFill />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 text-slate-300 w-56 origin-top-right rounded-md bg-[#374151ef] dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="py-1">
                  <Link
                    to="/support"
                    className="block px-4 py-2 text-sm text-slate-300 hover:bg-gray-100 hover:text-black"
                  >
                    View Developer Linkedin
                  </Link>
                  <Link
                    to="/license"
                    className="block px-4 py-2 text-sm text-slate-300 hover:bg-gray-100 hover:text-black"
                  >
                    View Developer Github
                  </Link>
                  <Link
                    to="/support"
                    className="block px-4 py-2 text-sm text-slate-300 hover:bg-gray-100 hover:text-black"
                  >
                    View Developer Instagram
                  </Link>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={handleSignOut}
            className="text-white bg-[#d9232e] active:bg-red-900 hover:bg-red-700 rounded-full px-4 py-3 text-xs font-bold"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
