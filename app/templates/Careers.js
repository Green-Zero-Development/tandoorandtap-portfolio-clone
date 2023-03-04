'use client';

import { useEffect } from 'react';

export default function Careers({ pageData }) {
    useEffect(() => {
        const cogEmploymentForm = document.createElement('script');
        const cogEmploymentFormBox = document.getElementById('employment-form');
        cogEmploymentForm.src = "https://www.cognitoforms.com/f/seamless.js";
        cogEmploymentForm.setAttribute("data-key", "IG83lPQs7UKU2FDeP--HlA");
        cogEmploymentForm.setAttribute("data-form", "48");
        if (cogEmploymentFormBox.hasChildNodes() == true) {

        } else {
            cogEmploymentFormBox.appendChild(cogEmploymentForm);
        }
    }, []);
    return (
        <>
        <div dangerouslySetInnerHTML={{__html: pageData.yoast_head[0]}}>

        </div>
        <div className="relative bg-egg pt-56 pb-40 employment-form-wrapper">
            <div className="max-w-8xl mx-auto text-center px-6">
                <h2 className="text-2xl xs:text-3xl sm:text-5xl leading-tight uppercase pb-12">{pageData.acf.title}</h2>
                <div id="employment-form">
                    
                </div>
            </div>
        </div>
        </>
    )
}