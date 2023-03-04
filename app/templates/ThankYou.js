function getButtonLink(linkToWhere, onSiteLink, offSiteLink, fileLink) {
    switch (linkToWhere) {
      case "A page on this site":
        return (onSiteLink.replace('inside', 'www'));
      case "Another site":
        return (offSiteLink);
      case "A file":
        return (fileLink);
      default:
        return ('/');
    }
  }

export default function ThankYou({ pageData }) {
    let buttonLink = getButtonLink(pageData.acf.hero_section.button.link_to_where, pageData.acf.hero_section.button.onsite_link, pageData.acf.hero_section.button.offsite_link, pageData.acf.hero_section.button.file_link);
    return (
        <>
        <div dangerouslySetInnerHTML={{__html: pageData.yoast_head[0]}}>

        </div>
        <div className="flex flex-wrap w-5/6 md:w-1/2 max-w-4xl mx-auto py-80">
            <div className="w-full text-center">
                <h1 className="text-4xl sm:text-5xl font-bold leading-none">{pageData.acf.hero_section.title}</h1>
                <p className="text-xl pt-6 pb-12">{pageData.acf.hero_section.description}</p>
                <a href={buttonLink}>
                    <button className="orange-button">{pageData.acf.hero_section.button.text}</button>
                </a>
            </div>
        </div>
        <div className="py-48"></div>
        </>
    )
}