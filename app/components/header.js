'use client';

import Link from 'next/link';

function toggleDropdown(dropTrig) {
  dropTrig.target.nextSibling.classList.toggle("hidden")
}

const mobiletoggle = () => {
  document.getElementById("mobile-menu").classList.toggle("mobile-menu-active");
  document.getElementById("mobile-menu-open").classList.toggle("opacity-0");
  document.getElementById("mobile-menu-close").classList.toggle("opacity-0");
  document.body.classList.toggle("overflow-hidden");
}

export default function Header({ logos, socialMedia, primaryMenu, mobileMenu }) {

    const mainLogo = logos[0].acf.logo.url;
    const instagram = socialMedia[0].acf.value_list[0].value;
    const facebook = socialMedia[0].acf.value_list[1].value;

    return (
        <>
        <header className="header-container">
            <Link href="/" className="desktop-logo">
                <img src={mainLogo} />
            </Link>
          <ul className="desktop-menu">
            {primaryMenu.map((item) => {
                if (item.children) {
                    return (
                        <li key={item.id} className="desktop-menu-single">
                            <div id="dropdown-trigger" onClick={toggleDropdown} className="">{item.title}</div>
                            <div id="dropdown" className="hidden absolute flex">
                            {Object.keys(item.children).map((key, index) => {
                                if (item.children[key].url.includes("#")) {
                                    return (
                                        <a key={index} href={item.children[key].url}>{item.children[key].title}</a>
                                    );
                                } else {
                                    return (
                                        <Link key={index} href={item.children[key].url}>{item.children[key].title}</Link>
                                    );
                                }
                            })}
                            </div>
                        </li>
                    )
                } else {
                    if (item.url.includes("#")) {
                        return (
                            <li className="ml-8 lg:ml-10 desktop-menu-single">
                                <a key={item.id} href={item.url}>{item.title}</a>
                            </li>
                        )
                    } else {
                        return (
                            <li className="ml-8 lg:ml-10 desktop-menu-single">
                                <Link key={item.id} href={item.url}>{item.title}</Link>
                            </li>
                        )
                    }
                }
            })}
          </ul>
          <div className="hidden md:flex ml-8">
            <Link href={instagram} target="_blank">
                <svg fill="#ffffff" className="w-6 mr-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
            </Link>
            <Link href={facebook} target="_blank">
                <svg fill="#ffffff" className="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"/></svg>
            </Link>
        </div>
          <div id="mobile-menu" className="mobile-menu">
            <div id="mobile-items" className="mobile-items">
                <Link href="/" onClick={mobiletoggle}>
                    <img className="mobile-menu-logo" src={mainLogo} />
                </Link>
                <ul className="text-center pt-12">
                {mobileMenu.map((item) => {
                    if (item.children) {
                        return (
                            <li key={item.id} className="mb-6 mobile-menu-single">
                                <div id="dropdown-trigger" className="flex items-center" onClick={toggleDropdown}>
                                    <div className="ml-auto pointer-events-none">{item.title}</div>
                                    <svg className="w-5 p-1 mr-auto pointer-events-none" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
                                </div>
                                <div id="dropdown" className="hidden">
                                {Object.keys(item.children).map((key, index) => {
                                    if (item.children[key].url.includes("#")) {
                                        return (
                                            <a key={index} href={item.children[key].url} onClick={mobiletoggle}>{item.children[key].title}</a>
                                        );
                                    } else {
                                        return (
                                            <Link key={index} href={item.children[key].url} onClick={mobiletoggle}>{item.children[key].title}</Link>
                                        );
                                    }
                                })}
                                </div>
                            </li>
                        )
                    } else {
                        if (item.url.includes("#")) {
                            return (
                                <li key={item.id} className="mb-6 mobile-menu-single">
                                    <a href={item.url} className="" onClick={mobiletoggle} >{item.title}</a>
                                </li>
                            )
                        } else {
                            return (
                                <li key={item.id} className="mb-6 mobile-menu-single">
                                    <Link href={item.url} onClick={mobiletoggle}>{item.title}</Link>
                                </li>
                            )
                        }
                    }
                })}
                </ul>
                <div className="flex justify-center mobile-social-icon-box">
                    <Link href={instagram} target="_blank" className="mobile-social-icon">
                        <svg className="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z"/></svg>
                    </Link>
                    <Link href={facebook} target="_blank" className="mobile-social-icon">
                        <svg className="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"/></svg>
                    </Link>
                </div>
            </div>
        </div>
        <div id="mobile-menu-open" onClick={mobiletoggle} className="mobile-menu-open">
            <svg className="mx-auto" width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="25" height="4" fill="white"/>
                <rect y="12" width="25" height="4" fill="white"/>
                <rect y="24" width="25" height="4" fill="white"/>
            </svg>
        </div>
        <div id="mobile-menu-close" onClick={mobiletoggle} className="opacity-0 mobile-menu-close">
            <svg className="mx-auto" width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="25" height="4" fill="white"/>
                <rect y="12" width="25" height="4" fill="white"/>
                <rect y="24" width="25" height="4" fill="white"/>
            </svg>
        </div>
        </header>
      </>
    );
}