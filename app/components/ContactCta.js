'use client';

import { useEffect } from 'react';
import Image from 'next/image';

export default function ContactCTA({ contactCtaData, physicalAddresses, phoneNumbers, emails }) {
    useEffect(() => {
        const cogForm = document.createElement('script');
        const cogFormBox = document.getElementById('contact-form');
        cogForm.src = "https://www.cognitoforms.com/f/seamless.js";
        cogForm.setAttribute("data-key", "IG83lPQs7UKU2FDeP--HlA");
        cogForm.setAttribute("data-form", "47");
        if (cogFormBox.hasChildNodes() == true) {

        } else {
            cogFormBox.appendChild(cogForm);
        }
    }, []);
    return (
        <div id="contact" className="relative bg-red-500 pt-32">
            <div className="max-w-2xl mx-auto text-center px-6">
                <h2 className="text-2xl xs:text-3xl sm:text-5xl leading-tight text-white uppercase">{contactCtaData[0].acf.title}</h2>
                <p className="text-xl xl:text-2xl leading-tight text-white pt-4 pb-8 whitespace-pre-line">{contactCtaData[0].acf.description}</p>
            </div>
            <div id="contact-form" className="relative max-w-7xl mx-auto px-6 z-10">
                
            </div>
            <div className="relative flex flex-wrap items-center max-w-7xl mt-12 sm:-mt-16 mx-auto px-6 text-white text-lg z-20">
                <div className="flex items-center w-full lg:w-auto pb-5 sm:pb-0 pr-3">
                    <svg className="w-3 mr-2" fill="#f57f29" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z"/></svg>
                    <div id="physical-address">{physicalAddresses[0].values[0].street}, {physicalAddresses[0].values[0].city}, {physicalAddresses[0].values[0].state} {physicalAddresses[0].values[0].zip}</div>
                </div>
                <a href={`tel:${phoneNumbers[0].values[0].value}`} className="flex items-center w-full lg:w-auto pb-5 sm:pb-0 pr-3">
                    <svg className="w-3 mr-2" fill="#f57f29" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>
                    {phoneNumbers[0].values[0].value}
                </a>
                <a href={`mailto:${emails[0].values[0].value}`} className="flex items-center w-full lg:w-auto pb-5 sm:pb-0 pr-3">
                    <svg className="w-3 mr-2" fill="#f57f29" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
                    {emails[0].values[0].value}
                </a>
            </div>
            <Image src="https://inside.tandoorandtap.com/wp-content/uploads/2022/10/orange-border.svg" className="!relative pt-16 md:pt-24 w-full pointer-events-none home-hero-border" fill />
        </div>
    );
}