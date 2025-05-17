import React, { useRef } from "react";
import { Link } from "react-router-dom";

const routes = [
    { label: "Özel Oranlar", path: "/" },
    { label: "Aviator", path: "/about" },
    { label: "Poker Klas", path: "/services" },
    { label: "Bahis", path: "/contact" },
    { label: "Canlı Bahis", path: "/contact" },
    { label: "Canlı Oyunlar", path: "/contact" },
    { label: "Canlı Casino", path: "/contact" },
    { label: "Casino", path: "/contact" },
    { label: "Canlı Loto", path: "/contact" },
    { label: "Promosyonlar", path: "/contact" },
    { label: "Discount Talep Et", path: "/contact" },
    { label: "Turnuvalar", path: "/contact" },
];

const routesEn = [
  { label: "Special Rates", path: "/" },
  { label: "Aviator", path: "/about" },
  { label: "Poker Class", path: "/services" },
  { label: "Betting", path: "/contact" },
  { label: "Live Betting", path: "/contact" },
  { label: "Live Games", path: "/contact" },
  { label: "Live Casino", path: "/contact" },
  { label: "Casino", path: "/contact" },
  { label: "Live Lotto", path: "/contact" },
  { label: "Promotions", path: "/contact" },
  { label: "Request Discount", path: "/contact" },
  { label: "Tournaments", path: "/contact" },
];


function Navbar() {
    const scrollRef = useRef(null);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    };

    return (
        <div className="main-container w-full py-2 bg-[#244409] border-b-6 border-amber-400
 flex">
            {/* Logo Section */}
            <div className="logo-container flex justify-center items-center w-[20%]">
                <img className="h-20 w-64" src="/download.svg" alt="logo" />
            </div>

            {/* Right Section */}
            <div className="side-container flex flex-col justify-center gap-2 w-[80%]">
                {/* App Icons and Login Section */}
                <div className="app-icon flex justify-end gap-6 items-center pr-4">
                    <img className="h-10 w-10 p-2 border border-3 rounded-xl border-amber-300" src="/download1.svg" alt="apple" />
                    <img className="h-10 w-10 p-2 border border-3 rounded-xl border-amber-300" src="/download2.svg" alt="android" />
                    <button className="bg-amber-300 px-4 py-2 rounded-xl text-[#244409]">KAYIT OL</button>
                    <p className="font-bold text-white text-xl">Giris</p>
                    <div className="h-full w-px bg-amber-50 opacity-20"></div>

                    <img className="h-10 w-12 border border-8 rounded-xl" src="/download3.svg" alt="profile" />
                </div>
                <div className="h-px w-full bg-amber-50 opacity-20"></div>

                {/* Nav with arrows */}
                <div className="nav-bar flex items-center gap-2 px-2">
                    <button onClick={scrollLeft} className="text-white text-xl px-2 py-1 bg-[#1f3608] rounded-md hover:bg-[#2f5110]">
                        ◀
                    </button>

                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hide px-4"
                    >
                        <ul className="flex gap-4">
                            {routes.map((route) => (
                                <li key={route.path} className="inline-block">
                                    <Link to={route.path} className="text-white whitespace-nowrap px-2 py-1 hover:underline">
                                        {route.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button onClick={scrollRight} className="text-white text-xl px-2 py-1 bg-[#1f3608] rounded-md hover:bg-[#2f5110]">
                        ▶
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
