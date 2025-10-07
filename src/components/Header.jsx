import React from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState, useRef, Fragment } from "react";
import { auth } from "../utils/firebase";
import {
  Transition,
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Select,
} from "@headlessui/react";
import { RiCloseCircleFill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { SupportedLanguage } from "../utils/constant";
import { toggleGeminiSearchView } from "../utils/geminiSlice";
import { changeLang } from "../utils/languageSlice";
import { FaChevronDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Logo1 from "../utils/netflix-gemini-newlogo.PNG";
import { BsCaretDownFill, BsFillHeartFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [openHamBurger, setOpenHamBurger] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const watchlist = useSelector((store) => store.watchlist?.watchListItems);
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

    return () => unsubscribe();
  }, [dispatch, navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGeminiSearchClick = () => {
    dispatch(toggleGeminiSearchView());
    setOpenHamBurger(false);
  };

  const handleLogoClick = () => {
    if (location.pathname === "/browse"){
      dispatch(toggleGeminiSearchView(false));
    }
  }

  return (
    <div className="flex w-full absolute top-0 justify-between items-center z-30 bg-gradient-to-b from-black to-[#0a0a0a28] px-8 py-2">
      <Link to={location.pathname === "/" ? "/" : "/browse"} onClick={handleLogoClick}>
        <img className="md:w-64 w-52 object-cover" src={Logo1} alt="logo" />
      </Link>
      {location.pathname !== "/" && (
        <div className="lg:flex hidden items-center mt-3 gap-3">
          {showToggleInformation && location.pathname !== "/watchlist" && (
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
          <div className="mx-2">
            <Link to={"/watchlist"} className="relative">
              <span className="text-[#fff] text-xl">
                <BsFillHeartFill />
              </span>
              <span className="bg-[#d9232e] text-xs w-4 p-1 h-4 -top-2 -right-3 grid place-content-center rounded-full text-[#fff] absolute">
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
                  background:
                    "linear-gradient(to right, #4992e8 0%, #4e89ee 30%, #7e7dd3 60%, #ca6676 90%)",
                  padding: "10px 14px",
                  borderRadius: "9999px",
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
              </div>
              <BsCaretDownFill />
            </button>
            {open && (
              <div className="absolute right-0 mt-2 text-slate-300 w-56 origin-top-right rounded-md bg-[#374151ef] dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="py-1">
                  <a
                    href="https://www.linkedin.com/in/aadarsh-singh-60a1a5229/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-slate-300 hover:bg-gray-100 hover:text-black"
                  >
                    View Developer LinkedIn
                  </a>
                  <a
                    href="https://github.com/aadarshs12"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-slate-300 hover:bg-gray-100 hover:text-black"
                  >
                    View Developer GitHub
                  </a>
                  <a
                    href="https://www.instagram.com/_aadarshrajput_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-slate-300 hover:bg-gray-100 hover:text-black"
                  >
                    Connect On Instagram
                  </a>
                  <a
                    href="mailto:aadarshs500@gmail.com"
                    className="block px-4 py-2 text-sm text-slate-300 hover:bg-gray-100 hover:text-black"
                  >
                    Connect On Mail
                  </a>
                </div>
              </div>
            )}
          </div>
          <Button
            onClick={() => setIsOpen(true)}
            className="text-white bg-[#d9232e] active:bg-red-900 hover:bg-red-700 rounded-full px-4 py-3 text-xs font-bold"
          >
            Sign Out
          </Button>
          <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="fixed inset-0 z-50"
          >
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 sm:p-6">
              <DialogPanel className="w-full max-w-sm sm:max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl">
                <DialogTitle
                  as="h2"
                  className="text-xl sm:text-xl font-bold text-[#d9232e]"
                >
                  Sign Out Your Account
                </DialogTitle>
                <p className="mt-2 text-sm text-white font-sans">
                  Are you sure you want to sign out? Click "Yes" to proceed or
                  "No" to cancel.
                </p>
                <div className="mt-4 flex gap-3">
                  <Button
                    className="inline-flex items-center gap-2 rounded-full bg-gray-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-gray-600"
                    onClick={() => setIsOpen(false)}
                  >
                    No
                  </Button>
                  <Button
                    className="inline-flex items-center gap-2 rounded-full bg-red-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-600"
                    onClick={handleSignOut}
                  >
                    Yes, Sign Out
                  </Button>
                </div>
              </DialogPanel>
            </div>
          </Dialog>
        </div>
      )}
      {location.pathname !== "/" && (
        <div
          className="lg:hidden block rounded-md py-1 px-2 border-solid border-2 border-slate-300"
          onClick={() => setOpenHamBurger(true)}
        >
          <span className="text-white text-3xl">
            <GiHamburgerMenu />
          </span>
        </div>
      )}
      <Transition.Root show={openHamBurger} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setOpenHamBurger}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>
          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-200"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <DialogPanel className="relative bg-gray-900 text-white w-64 p-4">
                <button
                  onClick={() => setOpenHamBurger(false)}
                  className="absolute top-4 right-4 p-2 rounded-md hover:bg-gray-800"
                >
                  <RiCloseCircleFill className="h-8 w-8" />
                </button>
                <nav className="mt-12 space-y-2">
                  {location.pathname !== "/" && (
                    <div className="flex flex-col items-center mt-5 gap-5">
                      {showToggleInformation &&
                        location.pathname !== "/watchlist" && (
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
                      <div className="mx-2 flex gap-2 items-center">
                        <Link to={"/watchlist"}>
                          {" "}
                          <span>Watchlist</span>{" "}
                        </Link>
                        <span>Watchlist</span>
                        <Link to={"/watchlist"} className="relative">
                          <span className="text-[#fff] text-xl">
                            <BsFillHeartFill />
                          </span>
                          <span className="bg-[#d9232e] text-xs w-4 p-1 h-4 -top-2 -right-3 grid place-content-center rounded-full text-[#fff] absolute">
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
                              background:
                                "linear-gradient(to right, #4992e8 0%, #4e89ee 30%, #7e7dd3 60%, #ca6676 90%)",
                              padding: "10px 14px",
                              borderRadius: "9999px",
                            }}
                          >
                            {showToggleInformation
                              ? "Go Back"
                              : "Gemini Search"}
                          </span>
                        </button>
                      )}
                      <div
                        className="relative inline-block text-left"
                        ref={menuRef}
                      >
                        <button
                          onClick={() => setOpen(!open)}
                          className="text-white flex gap-1 items-center"
                        >
                          <span>More</span>
                          <div>
                            <img
                              className="rounded-sm w-8 h-8"
                              src="https://occ-0-3646-3647.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABb7kuX9mKPrFGfvZ0oJ9eMBbFCB7ZhumT7uHIoILp1FtGpeIhybv8zoGgNK76rr7N8bMdhn-kkbRnD6ut8mFLwqYXmdpwCw.png?r=eea"
                              alt="user"
                            />
                          </div>
                          <BsCaretDownFill />
                        </button>
                        {open && (
                          <div className="absolute left-0 mt-2 text-slate-300 w-56 origin-top-right rounded-md bg-[#374151ef] dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                            <div className="py-1">
                              <a
                                href="https://www.linkedin.com/in/aadarsh-singh-60a1a5229/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-4 py-2 text-sm text-slate-300 hover:bg-gray-100 hover:text-black"
                              >
                                View Developer LinkedIn
                              </a>
                              <a
                                href="https://github.com/aadarshs12"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-4 py-2 text-sm text-slate-300 hover:bg-gray-100 hover:text-black"
                              >
                                View Developer GitHub
                              </a>
                              <a
                                href="https://www.instagram.com/_aadarshrajput_"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-4 py-2 text-sm text-slate-300 hover:bg-gray-100 hover:text-black"
                              >
                                Connect On Instagram
                              </a>
                              <a
                                href="mailto:aadarshs500@gmail.com"
                                className="block px-4 py-2 text-sm text-slate-300 hover:bg-gray-100 hover:text-black"
                              >
                                Connect On Mail
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                      <Button
                        onClick={() => setIsOpen(true)}
                        className="text-white bg-[#d9232e] active:bg-red-900 hover:bg-red-700 rounded-full px-4 py-3 text-xs font-bold"
                      >
                        Sign Out
                      </Button>
                      <Dialog
                        open={isOpen}
                        onClose={() => setIsOpen(false)}
                        className="fixed inset-0 z-50"
                      >
                        <div className="fixed inset-0 bg-[#00050d] flex items-center justify-center p-4 sm:p-6">
                          <DialogPanel className="w-full max-w-sm sm:max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl">
                            <DialogTitle
                              as="h2"
                              className="text-xl sm:text-xl font-bold text-[#d9232e]"
                            >
                              Sign Out Your Account
                            </DialogTitle>
                            <p className="mt-2 text-sm text-white font-sans">
                              Are you sure you want to sign out? Click "Yes" to
                              proceed or "No" to cancel.
                            </p>
                            <div className="mt-4 flex gap-3">
                              <Button
                                className="inline-flex items-center gap-2 rounded-full bg-gray-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-gray-600"
                                onClick={() => setIsOpen(false)}
                              >
                                No
                              </Button>
                              <Button
                                className="inline-flex items-center gap-2 rounded-full bg-red-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-600"
                                onClick={handleSignOut}
                              >
                                Yes, Sign Out
                              </Button>
                            </div>
                          </DialogPanel>
                        </div>
                      </Dialog>
                    </div>
                  )}
                </nav>
              </DialogPanel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default Header;
