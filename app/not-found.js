function getButtonLink(linkToWhere, onSiteLink, offSiteLink, fileLink) {
    switch (linkToWhere) {
      case "A page on this site":
        return (onSiteLink);
      case "Another site":
        return (offSiteLink);
      case "A file":
        return (fileLink);
      default:
        return ('/');
    }
}

export default async function NotFound() {

    async function getPage() {
        const res = await fetch(`https://inside.tandoorandtap.com/wp-json/pages/all/404-2`)
        if (!res.ok) {
            throw Error(res.statusText);
        } else {
            return res.json();
        }
    }

    const _page = getPage();
    const pageData = await _page;

    let buttonLink = getButtonLink(pageData.acf.hero_section.button.link_to_where, pageData.acf.hero_section.button.onsite_link, pageData.acf.hero_section.button.offsite_link, pageData.acf.hero_section.button.file_link);
   
    return (
        <>
        <div dangerouslySetInnerHTML={{__html: pageData.yoast_head[0]}}>

        </div>
        <div className="bg-egg -mt-32 pt-72 pb-40 md:pt-80 md:pb-56">
            <div className="max-w-2xl mx-auto text-center px-6">
                <h2 className="text-2xl xs:text-3xl sm:text-5xl leading-tight uppercase">{pageData.acf.hero_section.title}</h2>
                <p className="text-xl xl:text-2xl leading-tight pt-4 pb-8 whitespace-pre-line">{pageData.acf.hero_section.description}</p>
                <a href={buttonLink} className="w-full sm:w-auto !text-sm md:!text-lg mb-4 sm:mr-4 red-button">{pageData.acf.hero_section.button.text}</a>
            </div>
        </div>
        </>
    );
}