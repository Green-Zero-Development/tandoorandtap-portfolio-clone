'use client';

import { useEffect } from 'react';

export default function OnLoadScripts({ pageData }) {
    useEffect(() => {
        const menuItems = document.querySelectorAll('.desktop-menu-single');
        for (let i = 0; i < menuItems.length; i++) {
            menuItems[i].classList.remove('active-desktop-menu-item');
            if (menuItems[i].firstChild.innerText.toUpperCase() === pageData.title.toUpperCase()) {
                menuItems[i].classList.add('active-desktop-menu-item');
            }
        }
    });
    return (
        <>
        
        </>
    )
}