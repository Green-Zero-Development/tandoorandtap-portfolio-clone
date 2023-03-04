'use client';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import React, { useRef, useEffect } from 'react';
import Image from 'next/image';

export default function Menu({ pageData, menu }) {

    const lunchMenuSpecifics = pageData.global_sections[1];
    const drinkMenuButtons = pageData.global_sections[2].acf.button;

    const loadMenuImg = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }

    useEffect(() => {
        document.querySelectorAll('.menu-type')[1].click();
    });

    function hoverMenuTypes(e) {
        e.target.classList.toggle('hover-menu-type');
    }

    function hoverMenuCat(e) {
        e.target.classList.toggle('hover-menu-cat');
    }

    function sortVegAndNonVeg(e) {
        const vegContainer = document.getElementById('veg-menu-items');
        const nonVegContainer = document.getElementById('non-veg-menu-items');
        let isVeg = e.querySelector('.menu-item-veg-status').innerText;
        if (isVeg === "Vegetarian") {
            vegContainer.appendChild(e);
        } else if (isVeg === "Non-Vegetarian") {
            nonVegContainer.appendChild(e);
        }
    }

    function reverseSortVegAndNonVeg(e) {
        const menuItemList = document.getElementById('menu-item-list');
        menuItemList.appendChild(e);
    }

    function clickMenuTypes(e) {
        const menuItems = document.querySelectorAll('.menu-item');
        const menuCats = document.getElementById('menu-cats');
        const menuTypes = document.querySelectorAll('.menu-type');
        const vegAndNonVeg = document.querySelectorAll('.veg-and-non-veg');
        const lunchSpecifics = document.getElementById('lunch-specifics');
        const drinkMenuButtons =document.getElementById('drink-menu-buttons');
        let menuTypeSelected = e.target.innerText;

        // toggle off conditionals by default
        lunchSpecifics.classList.add('hidden');
        drinkMenuButtons.classList.add('hidden');
        for (let i = 0; i < vegAndNonVeg.length; i++) {
            vegAndNonVeg[i].classList.add('hidden');
        }
        // END toggle off conditionals by default

        // add clicked flowers
        for (let i = 0; i < menuTypes.length; i++) {
            menuTypes[i].classList.remove('clicked-menu-type');
        }

        e.target.classList.add('clicked-menu-type');
        // END add clicked flowers

        // menu type logic
        if (menuTypeSelected === "Lunch") {
            for (let i = 0; i < vegAndNonVeg.length; i++) {
                vegAndNonVeg[i].classList.remove('hidden');
            }
            for (let i = 0; i < menuItems.length; i++) {
                menuItems[i].classList.add('hidden');
                let isOnLunchMenu = menuItems[i].querySelector('.menu-item-lunch-status').innerText;
                if (isOnLunchMenu === "Yes") {
                    menuItems[i].classList.remove('hidden');
                    sortVegAndNonVeg(menuItems[i]);
                }
            }
            menuCats.classList.add('hide-cats');
            lunchSpecifics.classList.remove('hidden');
        } else if (menuTypeSelected === "Dinner") {
            menuCats.classList.remove('hide-cats');
            for (let i = 0; i < menuItems.length; i++) {
                menuItems[i].classList.remove('hidden');
                reverseSortVegAndNonVeg(menuItems[i]);
            }
            menuCats.querySelector('.menu-cat').click();
        } else if (menuTypeSelected === "Drinks") {
            for (let i = 0; i < menuItems.length; i++) {
                menuItems[i].classList.add('hidden');
                let menuItemCats = menuItems[i].querySelector('.menu-item-cats').innerText;
                if (menuItemCats.includes('Drinks') === true) {
                    menuItems[i].classList.remove('hidden');
                }
                menuCats.classList.add('hide-cats');
                reverseSortVegAndNonVeg(menuItems[i]);
            }
            drinkMenuButtons.classList.remove('hidden');
        } else {
            menuCats.classList.add('hide-cats');
        }
        // END menu type logic
    }

    function clickMenuCat(menuCat) {
        const menuCatDivs = document.querySelectorAll('.menu-cat');
        const menuItems = document.querySelectorAll('.menu-item');
        const vegAndNonVeg = document.querySelectorAll('.veg-and-non-veg');
        let menuCatSelected = menuCat.target.innerText;

        // toggle off veg and non veg titles by default
        for (let i = 0; i < vegAndNonVeg.length; i++) {
            vegAndNonVeg[i].classList.add('hidden');
        }
        // END toggle off veg and non veg titles by default

        if (menuCatSelected === "Appetizers") {
            for (let i = 0; i < vegAndNonVeg.length; i++) {
                vegAndNonVeg[i].classList.remove('hidden');
            }
            for (let i = 0; i < menuItems.length; i++) {
                menuItems[i].classList.add('hidden');
                let menuItemCats = menuItems[i].querySelector('.menu-item-cats').innerText;
                if (menuItemCats == menuCatSelected) {
                    menuItems[i].classList.remove('hidden');
                    sortVegAndNonVeg(menuItems[i]);
                }
            }
        }

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

    const menuRef = useRef(null);

    const menuHeroImg = pageData.acf.hero_section.image.url;

    const menuTypes = [{id: 1, name: "Lunch"}, {id: 2, name: "Dinner"}, {id: 3, name: "Drinks"}];

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

    function compare( a, b ) {
        if ( a.sortValue < b.sortValue ){
            return -1;
        }
        if ( a.sortValue > b.sortValue ){
            return 1;
        }
        return 0;
    }

    const fetchedMenu = [];

    menu.map((item, index) => {
        if (item.acf.type_of_dish == "Appetizers") {
            fetchedMenu.push(
                {"name": item.acf.name, "type_of_dish": item.acf.type_of_dish, "raw_spice_level": item.acf.spice_level, "description": item.acf.description, "menu_img": item.acf.image.url, "menu_alt": item.acf.image.alt, "is_veg": item.acf.is_vegetarian, "lunch_status": item.acf.lunch_menu_option, "sortValue": 1},
            )
        }
        else if (item.acf.type_of_dish == "Flatbreads") {
            fetchedMenu.push(
                {"name": item.acf.name, "type_of_dish": item.acf.type_of_dish, "raw_spice_level": item.acf.spice_level, "description": item.acf.description, "menu_img": item.acf.image.url, "menu_alt": item.acf.image.alt, "is_veg": item.acf.is_vegetarian, "lunch_status": item.acf.lunch_menu_option, "sortValue": 2},
            )
        } else if (item.acf.type_of_dish == "Non-Vegetarian Entrees") {
            fetchedMenu.push(
                {"name": item.acf.name, "type_of_dish": item.acf.type_of_dish, "raw_spice_level": item.acf.spice_level, "description": item.acf.description, "menu_img": item.acf.image.url, "menu_alt": item.acf.image.alt, "is_veg": item.acf.is_vegetarian, "lunch_status": item.acf.lunch_menu_option, "sortValue": 3},
            )
        } else if (item.acf.type_of_dish == "Vegetarian Entrees") {
            fetchedMenu.push(
                {"name": item.acf.name, "type_of_dish": item.acf.type_of_dish, "raw_spice_level": item.acf.spice_level, "description": item.acf.description, "menu_img": item.acf.image.url, "menu_alt": item.acf.image.alt, "is_veg": item.acf.is_vegetarian, "lunch_status": item.acf.lunch_menu_option, "sortValue": 4},
            )
        } else if (item.acf.type_of_dish == "Tandoori Specialties") {
            fetchedMenu.push(
                {"name": item.acf.name, "type_of_dish": item.acf.type_of_dish, "raw_spice_level": item.acf.spice_level, "description": item.acf.description, "menu_img": item.acf.image.url, "menu_alt": item.acf.image.alt, "is_veg": item.acf.is_vegetarian, "lunch_status": item.acf.lunch_menu_option, "sortValue": 5},
            )
        } else if (item.acf.type_of_dish == "Sides") {
            fetchedMenu.push(
                {"name": item.acf.name, "type_of_dish": item.acf.type_of_dish, "raw_spice_level": item.acf.spice_level, "description": item.acf.description, "menu_img": item.acf.image.url, "menu_alt": item.acf.image.alt, "is_veg": item.acf.is_vegetarian, "lunch_status": item.acf.lunch_menu_option, "sortValue": 6},
            )
        } else if (item.acf.type_of_dish == "Desserts") {
            fetchedMenu.push(
                {"name": item.acf.name, "type_of_dish": item.acf.type_of_dish, "raw_spice_level": item.acf.spice_level, "description": item.acf.description, "menu_img": item.acf.image.url, "menu_alt": item.acf.image.alt, "is_veg": item.acf.is_vegetarian, "lunch_status": item.acf.lunch_menu_option, "sortValue": 7},
            )
        } else if (item.acf.type_of_dish == "Drinks") {
            fetchedMenu.push(
                {"name": item.acf.name, "type_of_dish": item.acf.type_of_dish, "raw_spice_level": item.acf.spice_level, "description": item.acf.description, "menu_img": item.acf.image.url, "menu_alt": item.acf.image.alt, "is_veg": item.acf.is_vegetarian, "lunch_status": item.acf.lunch_menu_option, "sortValue": 8},
            )
        }
    });

    const sortedMenu = fetchedMenu.sort(compare);

    return (
        <>
        <div dangerouslySetInnerHTML={{__html: pageData.yoast_head[0]}}>

        </div>
        <div className="bg-orange-500 pt-40 3xl:pt-48 overflow-hidden">
            <div className="relative max-w-6xl mx-5 md:mx-auto py-16 md:py-32 hero">
                <Image className="absolute top-0 left-0 -mt-8 -ml-8 z-20 image-divider-top" src='https://inside.tandoorandtap.com/wp-content/uploads/2022/10/yellow-dots.svg' alt="hero divider svg" width={250} height={250} />
                <Image src={menuHeroImg} alt={pageData.acf.hero_section.image.alt} fill style={{ objectFit: 'cover' }} />
                <h1 className="relative max-w-sm md:max-w-lg text-5xl xs:text-6xl sm:text-7xl md:text-8xl text-white text-center leading-none uppercase tracking-wide mx-auto p-4 z-30 hero-title">{pageData.acf.hero_section.title}</h1>
                <Image className="absolute bottom-0 right-0 -mb-8 -mr-8 image-divider-bottom" src='https://inside.tandoorandtap.com/wp-content/uploads/2022/10/red-dots.svg' alt="hero divider svg" width={250} height={250} />
            </div>
            <div className="3xl:py-12"></div>
            <Image src="https://inside.tandoorandtap.com/wp-content/uploads/2022/10/section-frame.svg" className="!relative pt-16 md:pt-24 w-full hero-border" fill alt="hero divider svg" />
        </div>
        <div className="bg-yellow-500 overflow-x-scroll yellow-scrolling-section">
            <div className="w-full max-w-8xl mx-auto">
                <div className="flex flex-no-wrap justify-evenly mx-auto menu-types">
                    {menuTypes.map((item, index) => {
                        return (
                            <button key={index} className="flex items-center py-8 menu-type" onClick={clickMenuTypes} onMouseEnter={hoverMenuTypes} onMouseLeave={hoverMenuTypes}>
                                {item.name}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
        <div id="menu-cats" className="overflow-x-scroll menu-cats-box hide-cats">
            <div className="w-full max-w-8xl mx-auto">
                <div className="flex flex-no-wrap justify-evenly menu-cats">
                    {menuCats.map((item, index) => {
                        return (
                            <button key={index} className="flex items-center pt-8 mb-8 menu-cat" onClick={clickMenuCat} onMouseEnter={hoverMenuCat} onMouseLeave={hoverMenuCat}>
                                {item.name}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>

        <div className="py-6"></div>

        <div id="lunch-specifics" className="max-w-8xl italic mx-auto pb-4 lunch-specifics-text">
            <h6>{lunchMenuSpecifics.acf.text}</h6>
        </div>

        <div id="menu-item-list" className="grid md:grid-cols-2 max-w-8xl mx-auto px-12" ref={menuRef}>

            <div className="hidden col-span-1 pb-24 md:pb-0 veg-and-non-veg">
                <h2 className="pb-8 px-2 menu-app-veg">Vegetarian</h2>
                <div id="veg-menu-items"></div>
            </div>
            <div className="hidden col-span-1 veg-and-non-veg">
                <h2 className="pb-8 px-2 menu-app-veg">Non-Vegetarian</h2>
                <div id="non-veg-menu-items"></div>
            </div>

            {sortedMenu.map((item, index) => {
                let spiceLevelInt = parseInt(item.raw_spice_level);
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
                        return ('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=');
                    }
                }
                let spiceLevel = getSpiceLevel(spiceLevelInt);
                if (item.menu_img) {
                    return (
                        <div key={index} className="mb-12 md:mr-12 p-2 hover:cursor-pointer menu-item" onClick={menuItemClick}>
                            <div className="hidden menu-id">{index}</div>
                            <div className="hidden menu-item-lunch-status">{item.lunch_status}</div>
                            <div className="hidden menu-item-veg-status">{item.is_veg}</div>
                            <div className="hidden menu-item-cats">
                                <div>{item.type_of_dish}</div>
                            </div>
                            <div className="flex items-center pb-2 pointer-events-none menu-title-box">
                                <h4 className="leading-none pointer-events-none menu-item-title">{item.name}</h4>
                                <svg className="ml-3 pointer-events-none" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="11.5" stroke="#9B1C56"/>
                                <path d="M15.9134 15.9132H8.0873C7.87974 15.9132 7.68068 15.8307 7.53391 15.684C7.38714 15.5372 7.30469 15.3381 7.30469 15.1306V9.65232C7.30469 9.44476 7.38714 9.2457 7.53391 9.09893C7.68068 8.95217 7.87974 8.86971 8.0873 8.86971H9.65251L10.4351 7.6958H13.5656L14.3482 8.86971H15.9134C16.1209 8.86971 16.32 8.95217 16.4668 9.09893C16.6135 9.2457 16.696 9.44476 16.696 9.65232V15.1306C16.696 15.3381 16.6135 15.5372 16.4668 15.684C16.32 15.8307 16.1209 15.9132 15.9134 15.9132Z" stroke="#9B1C56" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M11.9992 13.9567C12.9717 13.9567 13.76 13.1683 13.76 12.1958C13.76 11.2233 12.9717 10.4349 11.9992 10.4349C11.0266 10.4349 10.2383 11.2233 10.2383 12.1958C10.2383 13.1683 11.0266 13.9567 11.9992 13.9567Z" stroke="#9B1C56" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <Image id="spice-level" src={spiceLevel} className="!relative !w-auto !h-7 pb-3 pointer-events-none" fill alt='spice-level' />
                            <p className="pointer-events-none capitalize" >{item.description}</p>
                        </div>
                    );
                } else {
                    return (
                        <div key={index} className="mb-12 md:mr-12 p-2 menu-item">
                            <div className="hidden menu-id">{index}</div>
                            <div className="hidden menu-item-cats">
                                <div>{item.type_of_dish}</div>
                            </div>
                            <div className="hidden menu-item-lunch-status">{item.lunch_status}</div>
                            <div className="flex items-center pb-2 pointer-events-none menu-title-box">
                                <h4 className="leading-none pointer-events-none menu-item-title">{item.name}</h4>
                            </div>
                            <Image id="spice-level" src={spiceLevel} className="!relative !w-auto !h-7 pb-3 pointer-events-none" fill alt='spice-level' />
                            <p className="pointer-events-none capitalize" >{item.description}</p>
                        </div>
                    );
                }
            })}
            <div id="menu-slider" className="menu-slider">
                <Splide aria-label="" ref={splideRef} className="max-w-4xl mx-auto"
                options={ {
                    type   : 'loop',
                    gap: '1rem',
                    keyboard: 'global',
                  } }
                >
                    {sortedMenu.map((item, index) => {
                        let spiceLevelInt = parseInt(item.raw_spice_level);
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
                                  return ('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=');
                            }
                        }
                        let spiceLevel = getSpiceLevel(spiceLevelInt);
                        if (item.menu_img) {
                            return (
                                <SplideSlide key={index}>
                                    <svg className="absolute top-0 right-0 m-4 hover:cursor-pointer" onClick={menuClose} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle opacity="0.7" cx="20" cy="20" r="20" fill="#EDEEE9" fillOpacity="0.9"/>
                                    <path d="M16.1301 12.905C18.3876 15.1625 19.6775 17.7425 18.71 18.71C17.7425 19.6775 15.1626 18.3875 12.9051 16.13C10.6476 13.8725 9.3575 11.2925 10.325 10.325C10.97 9.35751 13.5501 10.6475 16.1301 12.905ZM21.29 21.29C20.3225 22.2575 21.6125 24.8375 23.87 27.095C26.1275 29.3525 28.7075 30.6425 29.675 29.675C30.6425 28.7075 29.3525 26.1275 27.095 23.87C24.515 21.6125 21.935 20.3225 21.29 21.29ZM29.675 10.325C28.7075 9.35751 26.1275 10.6475 23.87 12.905C21.6125 15.1625 20.3225 17.7425 21.29 18.71C22.2575 19.6775 24.8375 18.3875 27.095 16.13C29.3525 13.8725 30.32 11.2925 29.675 10.325ZM18.71 21.29C17.7425 20.3225 15.1626 21.6125 12.9051 23.87C10.6476 26.1275 9.3575 28.7075 10.325 29.675C11.2925 30.6425 13.8726 29.3525 16.1301 27.095C18.3876 24.515 19.6775 21.935 18.71 21.29Z" fill="#282829"/>
                                    </svg>
                                    <div className="text-center">
                                        <Image src={item.menu_img} alt={item.menu_alt} loader={loadMenuImg} className="w-full rounded-t-lg menu-img" width={422} height={300} />
                                        <div className="flex flex-wrap items-center justify-center bg-egg px-12 rounded-b-lg slider-menu-content">
                                            <h4 className="w-full slider-menu-title">{item.name}</h4>
                                            <Image id="spice-level" src={spiceLevel} className="!relative !w-auto !h-7 pb-3 pointer-events-none" fill alt='spice-level' />
                                            <p className="w-full capitalize">{item.description}</p>
                                        </div>
                                    </div>
                                </SplideSlide>
                            );
                        } else {

                        }
                    })}
                </Splide>
            </div>
        </div>
        <div id="drink-menu-buttons" className="grid sm:grid-cols-2 gap-8 max-w-2xl justify-center w-full mx-auto px-12">
            {drinkMenuButtons.map((item, index) => {
                return (
                    <a href={item.link.url} className="red-button">
                        {item.text}
                    </a>
                )
            })}
        </div>

        <div className="py-12"></div>

        </>
    )
}