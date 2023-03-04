'use client';

import Link from 'next/link';
import Image from 'next/image';

function toggleDropdown(dropTrig) {
  dropTrig.target.nextSibling.classList.toggle("hidden")
}

const mobiletoggle = () => {
  document.getElementById("mobile-menu").classList.toggle("mobile-menu-active");
  document.body.classList.toggle("overflow-hidden");
}

export default function Header({ logos, socialMedia, primaryMenu, mobileMenu }) {

    const mainLogo = logos[0].acf.logo.url;
    const instagram = socialMedia[0].acf.value_list[0].value;
    const facebook = socialMedia[0].acf.value_list[1].value;

    return (
        <>
        <header className="grid grid-cols-3 items-center justify-between header-container">
            <Link href="/" className="col-span-2 md:col-span-1 desktop-logo">
                <Image src={mainLogo} width={260} height={50} />
            </Link>
            <div className="md:hidden col-span-1 w-auto">
                <div id="mobile-menu-open" onClick={mobiletoggle} className="mobile-menu-open">
                <svg className="mx-auto" width="25" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="28" height="4" fill="white"/>
                    <rect y="12" width="28" height="4" fill="white"/>
                    <rect y="24" width="28" height="4" fill="white"/>
                </svg>
                </div>
            </div>
        <div className="col-span-2 flex items-center ml-auto">
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
                                <li key={item.id} className="mx-4 lg:mx-4 desktop-menu-single">
                                    <a href={item.url}>{item.title}</a>
                                </li>
                            )
                        } else {
                            return (
                                <li key={item.id} className="mx-4 lg:mx-4 desktop-menu-single">
                                    <Link href={item.url}>{item.title}</Link>
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
        </div>
          <div id="mobile-menu" className="mobile-menu">
            <div id="mobile-items" className="mobile-items">
                <div className="grid grid-cols-3 md:grid-cols-1 items-center justify-between mobile-menu-header">
                    <Link href="/" onClick={mobiletoggle} className="col-span-2">
                        <Image className="mobile-menu-logo" src={mainLogo} width={260} height={50} />
                    </Link>
                    <div id="mobile-menu-close" onClick={mobiletoggle} className="col-span-1 mobile-menu-close">
                    <svg className="mx-auto" width="25" height="28" fill="#ffffff" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="20" width="28" height="4" transform="rotate(-45 0 20)" fill="white"/>
                        <rect x="3" width="28" height="4" transform="rotate(45 3 0)" fill="white"/>
                    </svg>
                    </div>
                </div>
                <ul className="pt-12 px-6">
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
                <div className="flex px-6 mobile-social-icon-box">
                    <Link href={instagram} target="_blank" className="mobile-social-icon">
                        <svg fill='#ffffff' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
                    </Link>
                    <Link href={facebook} target="_blank" className="mobile-social-icon">
                        <svg className="" fill='#ffffff' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"/></svg>
                    </Link>
                </div>
            </div>
        </div>
        {/* <div id="mobile-menu-open" onClick={mobiletoggle} className="mobile-menu-open">
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
        </div> */}
        </header>
      </>
    );
}