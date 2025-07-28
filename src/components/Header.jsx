import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../utils/firebase";
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { LOGO, SupportedLanguage } from "../utils/constant";
import { toggleGptSearchView } from "../utils/gptSlice";
import { GiReturnArrow } from "react-icons/gi";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const showToggleInformation = useSelector(
    (state) => state.gpt?.showGptSearch
  );

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Signed out successfully!");
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        toast.error("Failed to sign-out!");
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        // ...
      } else {
        dispatch(removeUser());
        navigate("/");
        // User is signed out
        // ...
      }
    });
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  return (
    <div className="absolute flex w-full justify-between items-center z-20 h-fit inset-0 bg-gradient-to-b from-black px-8 py-2 ">
      <div>
        <img className="w-48 " src={LOGO} alt="logo" />
      </div>
      {location.pathname !== "/" && (
        <div className="flex items-center gap-3">
          <select className="bg-gray-800 text-white px-2 py-1 rounded-lg border border-white">
            {SupportedLanguage.map((lang) => {
              return <option key={lang?.identifier}>{lang?.name}</option>;
            })}
          </select>

          {showToggleInformation ? (
            <button
              onClick={handleGptSearchClick}
              className="text-[#d9232e] text-base flex items-center gap-2 font-semibold hover:bg-[#374151] bg-[#374151ef] py-1 px-4 rounded-lg"
            >
              <GiReturnArrow className="rotate-0" /> Go Back
            </button>
          ) : (
            <button
              onClick={handleGptSearchClick}
              className="text-[#d9232e] text-base flex items-center gap-2 font-semibold hover:bg-[#374151] bg-[#374151ef] py-1 px-4 rounded-lg"
            >
              <FaSearch /> GPT Search
            </button>
          )}

          <img
            className="rounded-sm"
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
