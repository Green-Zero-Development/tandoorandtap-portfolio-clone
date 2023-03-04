import Home from '../../templates/Home';
import OnLoadScripts from "../../components/OnLoadScripts.js";

async function getPage() {
  const res = await fetch(`https://inside.tandoorandtap.com/wp-json/pages/all/home`)
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
}

export default async function Page() {
  const _page = getPage();
  const page = await _page;

  const restaurantHours = [];
  
  {page.site_data.map((item) => {
      if (item.title === "Restaurant Hours") {
          restaurantHours.push(
            {"values": item.acf.value_list},
          );
      } else {};
  })}
  
  return (
    <>
      <Home pageData={page} restaurantHours={restaurantHours} />
      <OnLoadScripts pageData={page} />
    </>
  );
}
