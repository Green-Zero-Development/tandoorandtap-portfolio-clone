import { notFound } from 'next/navigation';
import ThankYou from "../../../templates/ThankYou.js";
import Menu from "../../../templates/Menu.js";
import Careers from "../../../templates/Careers.js";
import OnLoadScripts from "../../../components/OnLoadScripts.js";

async function getAllPages() {
  const res = await fetch(`https://inside.tandoorandtap.com/wp-json/pages/all`)
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
}

async function getSinglePage(slug) {
  const res = await fetch(`https://inside.tandoorandtap.com/wp-json/pages/all/${slug}`)
  if (!res.ok) {
    return notFound();
  } else {
    return res.json();
  }
}

async function getMenu() {
  const res = await fetch(`https://inside.tandoorandtap.com/wp-json/menu/all`)
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
}

export default async function Page({ params: { slug } }) {
  const _page = getSinglePage(slug);
  const page = await _page;

  if (!page.slug) return notFound();

  const _menu = getMenu();
  const menu = await _menu;

  if (slug == "thank-you") {
    return (
      <>
        <ThankYou pageData={page} />
        <OnLoadScripts pageData={page} />
      </>
    );
  } else if (slug == "menu") {
    return (
      <>
        <Menu pageData={page} menu={menu} />
        <OnLoadScripts pageData={page} />
      </>
    );
  } else if (slug == "careers") {
    return (
      <>
        <Careers pageData={page} />
        <OnLoadScripts pageData={page} />
      </>
    );
  } else {
    return (null);
  }
}

export async function generateStaticParams() {
  const _pages = getAllPages();
  const pages = await _pages;
  return pages.map((pageSing) => ({ 
      slug: pageSing.slug 
    }));
}