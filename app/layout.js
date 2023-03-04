import './styles/global.css';
import './styles/header.css';
import './styles/employment-form.css';
import Header from "./components/header.js";
import Footer from "./components/footer.js";
import ContactCTA from './components/ContactCta.js';

async function getSiteData() {
  const res = await fetch(`https://inside.tandoorandtap.com/wp-json/site-data/all`)
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
}

async function getGlobalSections() {
  const res = await fetch(`https://inside.tandoorandtap.com/wp-json/global-sections/all`)
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
}

async function getMenu() {
  const res = await fetch(`https://inside.tandoorandtap.com/wp-json/menus/all`)
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
}

export default async function RootLayout({ children, page }) {
  const _siteData = getSiteData();
  const siteData = await _siteData;

  const logos = [];
  const socialMedia = [];
  const physicalAddresses = [];
  const phoneNumbers = [];
  const emails = [];

  {siteData.map((item) => {
      if (item.title === "Logos") {
          logos.push(
              {"acf": item.acf },
          )
      } else if (item.title === "Social Media Links") {
          socialMedia.push(
              {"acf": item.acf },
          )
      } else if (item.title === "Physical Addresses") {
        physicalAddresses.push(
          {"values": item.acf.value_list},
        ) 
      } else if (item.title === "Contact Numbers") {
        phoneNumbers.push(
          {"values": item.acf.value_list},
        ) 
      } else if (item.title === "Emails") {
        emails.push(
          {"values": item.acf.value_list},
        ) 
      } else {};
  })}

  const _globalSections = getGlobalSections();
  const globalSections = await _globalSections;

  const contactCtaData = [];

  {globalSections.map((item) => {
      if (item.title === "Contact CTA") {
      contactCtaData.push(
          {"acf": item.acf},
      )
      } else {};
  })}

  const _menu = getMenu();
  const menu = await _menu;

  const primaryMenu = [];
  const mobileMenu = [];

  {Object.keys(menu).map((key) => {
      if (menu[key].menu == "primary-menu") {
          primaryMenu.push(
              {"id": menu[key].id, "parent_id": menu[key].parent_id, "title": menu[key].title, "url": menu[key].url, "children": menu[key].children},
          )
      }
  })}

  {Object.keys(menu).map((key) => {
    if (menu[key].menu == "mobile-menu") {
        mobileMenu.push(
            {"id": menu[key].id, "parent_id": menu[key].parent_id, "title": menu[key].title, "url": menu[key].url, "children": menu[key].children},
        )
    }
  })}

  return (
    <html>
      <head>
      <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {page}
        <link rel="apple-touch-icon" sizes="76x76" href="/favi/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favi/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favi/favicon-16x16.png" />
        <link rel="manifest" href="/favi/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.0.7/dist/css/splide.min.css"></link>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MFRF8S6');`,
          }}
        />
      </head>
      <body>
        <Header logos={logos} socialMedia={socialMedia} primaryMenu={primaryMenu} mobileMenu={mobileMenu} />
        {children}
        <ContactCTA contactCtaData={contactCtaData} physicalAddresses={physicalAddresses} phoneNumbers={phoneNumbers} emails={emails} />
        <Footer socialMedia={socialMedia} />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MFRF8S6" height="0" width="0" style="display: none; visibility: hidden;" />`,
          }}
        />
      </body>
    </html>
  )
}