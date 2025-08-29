import Header from "./Header";
import { FaHeart } from "react-icons/fa";
import { TiInfo } from "react-icons/ti";
import { FaStarHalfStroke } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";

const WatchList = () => {
  return (
    <>
      <Header />
      <div className="pt-24 pb-16 forWatchListBg">
        <h1 className="text-center text-4xl font-bold text-[#fff] underline">
          My Watch List
        </h1>
        <div className="text-white mx-8 forMakingBorderBottom pt-10 flex items-end gap-5">
          <div className="w-1/3">
            <span>Science Fiction, Adventure, Action</span>
            <img
              className="w-full rounded-lg object-cover"
              src="https://image.tmdb.org/t/p/original/zNriRTr0kWwyaXPzdg1EIxf0BWk.jpg"
              alt="movie poster"
            />
          </div>
          <div className="w-2/3 flex flex-col gap-1">
            <div className="flex gap-3 items-center">
              <h2 className="text-3xl text-[#d9232e] font-bold">
                Jurassic World Rebirth
              </h2>
              <span>⭐ 6.4/10</span>
              <span>📅 July 1, 2025</span>
            </div>
            <p className="text-slate-300">
              <span>ℹ️</span> Five years after the events of Jurassic World
              Dominion, covert operations expert Zora Bennett is contracted to
              lead a skilled team on a top-secret mission to secure genetic
              material from the world's three most massive dinosaurs. When
              Zora's operation intersects with a civilian family whose boating
              expedition was capsized, they all find themselves stranded on an
              island where they come face-to-face with a sinister, shocking
              discovery that's been hidden from the world for decades.
            </p>
            <button className="flex gap-2 items-center w-fit bg-[#d9232e] text-white p-3 rounded-lg mt-4 hover:bg-red-800 hover:scale-105 active:bg-red-900 active:scale-100">
              <FaHeart /> Remove From Watch List
            </button>
          </div>
        </div>
        <div className="text-white mx-8 forMakingBorderBottom pt-10 flex items-end gap-5">
          <div className="w-1/3">
            <span>Science Fiction, Adventure, Action</span>
            <img
              className="w-full rounded-lg object-cover"
              src="https://image.tmdb.org/t/p/original/zNriRTr0kWwyaXPzdg1EIxf0BWk.jpg"
              alt="movie poster"
            />
          </div>
          <div className="w-2/3 flex flex-col gap-1">
            <div className="flex gap-3 items-center">
              <h2 className="text-3xl text-[#d9232e] font-bold">
                Jurassic World Rebirth
              </h2>
              <span>⭐ 6.4/10</span>
              <span>📅 July 1, 2025</span>
            </div>
            <p className="text-slate-300">
              <span>ℹ️</span> Five years after the events of Jurassic World
              Dominion, covert operations expert Zora Bennett is contracted to
              lead a skilled team on a top-secret mission to secure genetic
              material from the world's three most massive dinosaurs. When
              Zora's operation intersects with a civilian family whose boating
              expedition was capsized, they all find themselves stranded on an
              island where they come face-to-face with a sinister, shocking
              discovery that's been hidden from the world for decades.
            </p>
            <button className="flex gap-2 items-center w-fit bg-[#d9232e] text-white p-3 rounded-lg mt-4 hover:bg-red-800 hover:scale-105 active:bg-red-900 active:scale-100">
              <FaHeart /> Remove From Watch List
            </button>
          </div>
        </div>
        <div className="text-white mx-8 forMakingBorderBottom pt-10 flex items-end gap-5">
          <div className="w-1/3">
            <span>Science Fiction, Adventure, Action</span>
            <img
              className="w-full rounded-lg object-cover"
              src="https://image.tmdb.org/t/p/original/zNriRTr0kWwyaXPzdg1EIxf0BWk.jpg"
              alt="movie poster"
            />
          </div>
          <div className="w-2/3 flex flex-col gap-1">
            <div className="flex gap-3 items-center">
              <h2 className="text-3xl text-[#d9232e] font-bold">
                Jurassic World Rebirth
              </h2>
              <span>⭐ 6.4/10</span>
              <span>📅 July 1, 2025</span>
            </div>
            <p className="text-slate-300">
              <span>ℹ️</span> Five years after the events of Jurassic World
              Dominion, covert operations expert Zora Bennett is contracted to
              lead a skilled team on a top-secret mission to secure genetic
              material from the world's three most massive dinosaurs. When
              Zora's operation intersects with a civilian family whose boating
              expedition was capsized, they all find themselves stranded on an
              island where they come face-to-face with a sinister, shocking
              discovery that's been hidden from the world for decades.
            </p>
            <button className="flex gap-2 items-center w-fit bg-[#d9232e] text-white p-3 rounded-lg mt-4 hover:bg-red-800 hover:scale-105 active:bg-red-900 active:scale-100">
              <FaHeart /> Remove From Watch List
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WatchList;
