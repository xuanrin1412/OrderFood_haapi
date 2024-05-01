import { useState, useEffect } from 'react';
import Char from "../assets/illustration.png";
import CharDark from "../assets/illustrationDarkMode.png";
import Blur from "../assets/EllipseBlur.png";
import BlurDark from "../assets/EllipseBlurDark.png";
import BlurTop from "../assets/EllipseBlurTop.png"
import BlurTopDark from "../assets/EllipseBlurTopDark.png"

export default function SideTheme() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const darkModeEnabled = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(darkModeEnabled);

        const darkModeListener = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        darkModeMediaQuery.addListener(darkModeListener);

        return () => {
            darkModeMediaQuery.removeListener(darkModeListener);
        };
    }, []);

    return (
        <div className={`relative  hidden md:flex md:flex-col md:w-[500px] xl:w-[640px] bg-secondary ${isDarkMode ? 'dark:bg-[#343744]' : ''} pl-[55px] pt-[86px]`}>
            <div className="w-full max-h-[582px]">
                <img className="h-full w-full object-cover" src={isDarkMode ? CharDark : Char} alt="" />
            </div>
            <div className="flex flex-col items-center justify-center mt-[4.5rem] mr-[56px]">
                <div className={`max-w-[287px] flex flex-wrap font-bold text-2xl leading-[36px] text-center ${isDarkMode ? 'text-white' : 'text-[#292C38]'} `}>Perfect Place to Analyze Your Social Media</div>
                <div className={`max-w-[359px] mt-4  flex flex-wrap text-center font-medium text-base leading-nomalText tracking-nomalText ${isDarkMode ? 'text-textMain' : 'text-textsecondary'}`}>Find out your engagement analysis, statistics and social media schedule.</div>
            </div>
            <div className="absolute top-[346px] right-[150px] h-[176px] w-[173px] z-10">
                <img src={isDarkMode ? BlurDark : Blur} className="h-full w-full object-contain" alt="" />
            </div>
            <div className="absolute -top-[80px] right-[250px] h-[176px] w-[173px] z-10">
                <img src={isDarkMode ? BlurTopDark : BlurTop} className="h-full w-full object-contain" alt="" />
            </div>
        </div>
    );
}
