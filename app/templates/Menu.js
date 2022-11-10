'use client';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import React, { useRef, useEffect } from 'react';

export default function Menu({ pageData, menu }) {

    useEffect(() => {
        document.querySelector('.menu-cat').click();
    });

    function hoverMenuCat(menuCat) {
        menuCat.target.classList.toggle('hover-menu-cat');
    }

    const menuRef = useRef(null);

    function clickMenuCat(menuCat) {
    
        const menuCatDivs = document.querySelectorAll('.menu-cat');
        const menuItems = document.querySelectorAll('.menu-item');
        let menuCatSelected = menuCat.target.innerText;
        for (let i = 0; i < menuCatDivs.length; i++) {
            menuCatDivs[i].classList.remove('clicked-menu-cat');
        }
        menuCat.target.classList.add('clicked-menu-cat');
        for (let i = 0; i < menuItems.length; i++) {
            menuItems[i].classList.add('hidden');
            let menuItemCats = menuItems[i].querySelector('.menu-item-cats').innerText;
            if (menuItemCats == menuCatSelected) {
                menuItems[i].classList.remove('hidden');
            }
        }
    }

    const menuHeroImg = pageData.acf.hero_section.image.url;

    const menuCats = [{id: 1, name: "Appetizers"}, {id: 2, name: "Flatbreads"}, {id: 3, name: "Non-Vegetarian Entrees"}, {id: 4, name: "Vegetarian Entrees"}, {id: 5, name: "Tandoori Specialties"}, {id: 6, name: "Sides"}, {id: 7, name: "Desserts"}];

    const splideRef = useRef(null);

    const menuItemClick = (e) => {
        let indexToNavi = e.target.querySelector('.menu-id').innerText;
        splideRef.current.splide.go(parseInt(indexToNavi));
        document.getElementById("menu-slider").classList.toggle("menu-slider-active");
    };

    const menuClose = () => {
        document.getElementById("menu-slider").classList.toggle("menu-slider-active");
    };

    return (
        <>
        <div dangerouslySetInnerHTML={{__html: pageData.yoast_head[0]}}>

        </div>
        <div className="bg-orange-500 pt-40 3xl:pt-48 overflow-hidden">
            <div className="relative max-w-6xl mx-auto py-32 hero" style={{backgroundImage: `url(` + menuHeroImg + `)`}}>
                <img className="absolute top-0 left-0 -mt-8 -ml-8 z-20" src="https://inside.tandoorandtap.com/wp-content/uploads/2022/10/yellow-dots.svg" />
                <h1 className="relative max-w-sm md:max-w-xl text-6xl sm:text-7xl md:text-8xl text-white text-center leading-none uppercase tracking-wide mx-auto p-4 z-30 hero-title">{pageData.acf.hero_section.title}</h1>
                <img className="hidden lg:block absolute bottom-0 right-0 -mb-8 -mr-8" src="https://inside.tandoorandtap.com/wp-content/uploads/2022/10/red-dots.svg" />
            </div>
            <div className="3xl:py-12"></div>
            <img src="https://inside.tandoorandtap.com/wp-content/uploads/2022/10/section-frame.svg" className="pt-16 md:pt-24 w-full hero-border" />
        </div>
        <div className="bg-yellow-500 overflow-x-scroll">
            <div className="w-full max-w-8xl mx-auto">
                <div className="flex flex-no-wrap justify-evenly menu-cats">
                    {menuCats.map((item, index) => {
                        return (
                            <button className="flex items-center py-8 menu-cat" onClick={clickMenuCat} onMouseEnter={hoverMenuCat} onMouseLeave={hoverMenuCat}>
                                {item.name}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>

        <div className="grid md:grid-cols-2 max-w-8xl mx-auto py-24 px-12" ref={menuRef}>
            {menu.map((item, index) => {
                let spiceLevelInt = parseInt(item.acf.spice_level);
                function getSpiceLevel(spiceLevelInt) {
                    switch (spiceLevelInt) {
                        case 1:
                          return ('https://inside.tandoorandtap.com/wp-content/uploads/2022/11/heat-one.svg');
                        case 2:
                          return ('https://inside.tandoorandtap.com/wp-content/uploads/2022/11/39.svg');
                        case 3:
                          return ('https://inside.tandoorandtap.com/wp-content/uploads/2022/11/heat-three.svg');
                        case 4:
                        return ('https://inside.tandoorandtap.com/wp-content/uploads/2022/11/4-Star-Heat.svg');
                        default:
                          return ('');
                    }
                }
                let spiceLevel = getSpiceLevel(spiceLevelInt);
                return (
                    <div className="mb-12 md:mr-12 p-2 hover:cursor-pointer menu-item" onClick={menuItemClick}>
                        <div className="hidden menu-id">{index}</div>
                        <div className="hidden menu-item-cats">
                            {item.acf.type_of_dish.map((item) => {
                                return (
                                   <div>{item}</div>
                                );
                            })}
                        </div>
                        <div className="flex items-center pb-2 pointer-events-none menu-title-box">
                            <h4 className="leading-none pointer-events-none menu-item-title">{item.acf.name}</h4>
                            <svg className="ml-3 pointer-events-none" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="11.5" stroke="#F68A33"/>
                            <path d="M15.9134 15.9127H8.0873C7.87974 15.9127 7.68068 15.8303 7.53391 15.6835C7.38714 15.5367 7.30469 15.3377 7.30469 15.1301V9.65183C7.30469 9.44427 7.38714 9.24521 7.53391 9.09845C7.68068 8.95168 7.87974 8.86923 8.0873 8.86923H9.65251L10.4351 7.69531H13.5656L14.3482 8.86923H15.9134C16.1209 8.86923 16.32 8.95168 16.4668 9.09845C16.6135 9.24521 16.696 9.44427 16.696 9.65183V15.1301C16.696 15.3377 16.6135 15.5367 16.4668 15.6835C16.32 15.8303 16.1209 15.9127 15.9134 15.9127Z" stroke="#F68A33" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12.0001 13.9563C12.9726 13.9563 13.761 13.1679 13.761 12.1954C13.761 11.2229 12.9726 10.4346 12.0001 10.4346C11.0276 10.4346 10.2393 11.2229 10.2393 12.1954C10.2393 13.1679 11.0276 13.9563 12.0001 13.9563Z" stroke="#F68A33" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <img id="spice-level" src={spiceLevel} className="pb-3 pointer-events-none" />
                        <p className="pointer-events-none" >{item.acf.description}</p>
                    </div>
                );
            })}
            <div id="menu-slider" className="menu-slider">
                <Splide aria-label="" ref={splideRef} className="max-w-4xl mx-auto"
                options={ {
                    type   : 'loop',
                    gap: '1rem',
                  } }
                >
                    {menu.map((item, index) => {
                        let spiceLevelInt = parseInt(item.acf.spice_level);
                        function getSpiceLevel(spiceLevelInt) {
                            switch (spiceLevelInt) {
                                case 1:
                                  return ('https://inside.tandoorandtap.com/wp-content/uploads/2022/11/heat-one.svg');
                                case 2:
                                  return ('https://inside.tandoorandtap.com/wp-content/uploads/2022/11/39.svg');
                                case 3:
                                  return ('https://inside.tandoorandtap.com/wp-content/uploads/2022/11/heat-three.svg');
                                case 4:
                                return ('https://inside.tandoorandtap.com/wp-content/uploads/2022/11/4-Star-Heat.svg');
                                default:
                                  return ('');
                            }
                        }
                        let spiceLevel = getSpiceLevel(spiceLevelInt);
                        return (
                            <SplideSlide>
                                <svg className="absolute top-0 right-0 m-4 hover:cursor-pointer" onClick={menuClose} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle opacity="0.7" cx="20" cy="20" r="20" fill="#EDEEE9" fill-opacity="0.9"/>
                                <path d="M16.1301 12.905C18.3876 15.1625 19.6775 17.7425 18.71 18.71C17.7425 19.6775 15.1626 18.3875 12.9051 16.13C10.6476 13.8725 9.3575 11.2925 10.325 10.325C10.97 9.35751 13.5501 10.6475 16.1301 12.905ZM21.29 21.29C20.3225 22.2575 21.6125 24.8375 23.87 27.095C26.1275 29.3525 28.7075 30.6425 29.675 29.675C30.6425 28.7075 29.3525 26.1275 27.095 23.87C24.515 21.6125 21.935 20.3225 21.29 21.29ZM29.675 10.325C28.7075 9.35751 26.1275 10.6475 23.87 12.905C21.6125 15.1625 20.3225 17.7425 21.29 18.71C22.2575 19.6775 24.8375 18.3875 27.095 16.13C29.3525 13.8725 30.32 11.2925 29.675 10.325ZM18.71 21.29C17.7425 20.3225 15.1626 21.6125 12.9051 23.87C10.6476 26.1275 9.3575 28.7075 10.325 29.675C11.2925 30.6425 13.8726 29.3525 16.1301 27.095C18.3876 24.515 19.6775 21.935 18.71 21.29Z" fill="#282829"/>
                                </svg>
                                <div className="text-center">
                                    <img src={item.acf.image.url} className="w-full rounded-t-lg menu-img" />
                                    <div className="flex flex-wrap items-center justify-center bg-egg px-12 rounded-b-lg slider-menu-content">
                                        <h4 className="w-full slider-menu-title">{item.acf.name}</h4>
                                        <img id="spice-level" src={spiceLevel} className="pb-1 mx-auto" />
                                        <p className="w-full">{item.acf.description}</p>
                                    </div>
                                </div>
                            </SplideSlide>
                        );
                    })}
                </Splide>
            </div>
        </div>
        </>
    )
}