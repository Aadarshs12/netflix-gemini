import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SupportedLanguage } from "../utils/constant";
import { toggleGeminiSearchView } from "../utils/geminiSlice";
import { changeLang } from "../utils/languageSlice";
import { Select } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const showToggleInformation = useSelector(
    (store) => store.gemini?.showGeminiSearch
  );

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

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleGeminiSearchClick = () => {
    dispatch(toggleGeminiSearchView());
  };

  return (
    <div className="absolute flex w-full justify-between items-center z-20 h-fit inset-0 bg-gradient-to-b from-black px-8 py-2">
      <Link to="/browse">
        <img className="w-48" src={LOGO} alt="logo" />
      </Link>
      {location.pathname !== "/" && (
        <div className="flex items-center gap-3">
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
          <button
            onClick={handleGeminiSearchClick}
            className="text-[#d9232e] text-base flex items-center gap-2 font-semibold hover:bg-[#374151] bg-[#374151ef] py-1 px-4 rounded-lg"
          >
            {showToggleInformation ? "Go Back" : "Gemini Search"}
          </button>
          <img
            className="rounded-sm w-8 h-8"
            src="https://occ-0-3646-3647.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABb7kuX9mKPrFGfvZ0oJ9eMBbFCB7ZhumT7uHIoILp1FtGpeIhybv8zoGgNK76rr7N8bMdhn-kkbRnD6ut8mFLwqYXmdpwCw.png?r=eea"
            alt="user"
          />
          <button
            onClick={handleSignOut}
            className="text-white bg-[#d9232e] rounded-full px-4 py-3 text-xs font-bold"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
