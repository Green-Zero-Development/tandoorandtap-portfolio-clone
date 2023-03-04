import Image from 'next/image';

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

export default function Home({ pageData, restaurantHours }) {
    const homeHeroImg = pageData.acf.hero_section.image.url;

    return (
        <>
            <div dangerouslySetInnerHTML={{__html: pageData.yoast_head[0]}}>

            </div>
            <div className="bg-orange-500 pt-40 3xl:pt-48 overflow-hidden">
                <div className="relative max-w-6xl mx-5 md:mx-auto py-16 md:py-32 hero">
                    <Image className="absolute top-0 left-0 -mt-8 -ml-8 z-20 image-divider-top" src='https://inside.tandoorandtap.com/wp-content/uploads/2022/10/yellow-dots.svg' alt="hero divider svg" width={250} height={250} />
                    <Image src={homeHeroImg} alt={pageData.acf.hero_section.image.alt} fill style={{ objectFit: 'cover' }} />
                    <h1 className="relative max-w-xs md:max-w-lg text-6xl sm:text-7xl md:text-8xl text-white text-center leading-none uppercase tracking-wide mx-auto p-4 z-30 hero-title">{pageData.acf.hero_section.title}</h1>
                    <Image className="absolute bottom-0 right-0 -mb-8 -mr-8 image-divider-bottom" src='https://inside.tandoorandtap.com/wp-content/uploads/2022/10/red-dots.svg' alt="hero divider svg" width={250} height={250} />
                </div>
                <div className="3xl:py-12"></div>
                <Image src="https://inside.tandoorandtap.com/wp-content/uploads/2022/10/section-frame.svg" className="!relative pt-16 md:pt-24 w-full hero-border" fill alt="hero divider svg" />
            </div>
            <div className="bg-yellow-500 py-12 md:py-32 overflow-hidden">
                <div className="grid md:grid-cols-12 items-center max-w-6xl mx-auto px-6 xl:px-0">
                    <div className="order-2 md:order-1 col-span-5 xs:px-6 md:pl-0 xl:pr-20">
                        <h2 className="text-2xl xs:text-3xl sm:text-4halfxl md:text-2xl lg:text-4halfxl leading-tight uppercase">{pageData.acf.menu_cta_section.title}</h2>
                        <p className="text-xl xl:text-2xl leading-tight pt-4 pb-8">{pageData.acf.menu_cta_section.description}</p>
                        <div className="flex flex-wrap items-center justify-items-start">
                            {pageData.acf.menu_cta_section.buttons.map((item, index) => {
                            let buttonLink = getButtonLink(item.button.link_to_where, item.button.onsite_link, item.button.offsite_link, item.button.file_link);
                            if (index - 1 % 2) {
                                return (
                                <a href={buttonLink} className="w-full sm:w-auto mb-4 sm:mr-4 red-button">
                                    {item.button.text}
                                </a>
                                );
                            } else {
                                return (
                                <a href={buttonLink} className="w-full sm:w-auto orange-button mb-4">
                                    {item.button.text}
                                </a>
                                );
                            }
                            })}
                        </div>
                    </div>
                    <div className="order-1 md:order-2 relative col-span-7 w-full pb-12 xl:py-80">
                        <Image className="!relative xl:hidden w-full sm:w-2/3 md:w-full mx-auto" src="https://inside.tandoorandtap.com/wp-content/uploads/2022/10/mobile-menu-cta-section.png" fill alt="hero divider svg" />
                        <Image className="hidden xl:block absolute top-0 left-0 -mt-12 -ml-12 z-20" src="https://inside.tandoorandtap.com/wp-content/uploads/2022/10/red-dots.svg" width={400} height={400} />
                        <Image className="hidden xl:block absolute top-0 left-0 z-30" src={pageData.acf.menu_cta_section.image_left.url} width={358} height={588} alt={pageData.acf.menu_cta_section.image_left.alt} />
                        <Image className="hidden xl:block absolute bottom-0 right-0 z-20" src={pageData.acf.menu_cta_section.image_right.url} width={358} height={588} alt={pageData.acf.menu_cta_section.image_right.alt} />
                        <Image className="hidden xl:block absolute bottom-0 right-0 -mb-12 -mr-12" src="https://inside.tandoorandtap.com/wp-content/uploads/2022/10/red-dots.svg" width={400} height={400} alt="hero divider svg" />
                    </div>
                </div>
            </div>
            <div className="bg-egg py-32 md:py-40">
                <div className="grid md:grid-cols-12 items-center max-w-6xl mx-auto px-6 xl:px-0">
                    <div className="order-2 md:order-1 relative col-span-7 xs:px-6 md:pl-0 xl:pr-32 z-40">
                        <h2 className="text-2xl xs:text-3xl sm:text-4halfxl md:text-2xl lg:text-4halfxl leading-tight uppercase">{pageData.acf.about_section.title}</h2>
                        <p className="text-xl xl:text-2xl leading-tight pt-4 pb-8 whitespace-pre-line">{pageData.acf.about_section.description}</p>
                        <h3 className="text-xl pb-4">Restaurant Hours:</h3>
                        {restaurantHours.map((item) => {
                            return (
                                <>
                                {item.values.map((item) => {
                                    if (item.openclose) {
                                        return (
                                            <div className="md:flex w-full pb-6 md:pb-1">
                                                <h6 className="text-sm pr-2">{item.days}:</h6>
                                                {item.openclose.map((item) => {
                                                    return (
                                                        <div className="pr-2">{item.open}-{item.closed} |</div>
                                                    );
                                                })}
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div className="flex w-full pb-6 md:pb-1">
                                                <h6 className="text-sm pr-2">{item.days}:</h6>
                                                <h6>Closed</h6>
                                            </div>
                                        );
                                    }
                                })}
                                </>
                            );
                        })}
                    </div>
                    <div className="order-1 md:order-2 relative col-span-12 md:col-span-5 w-full pb-12 md:pb-0">
                        <Image className="absolute top-0 bottom-0 left-0 -ml-48" src="https://inside.tandoorandtap.com/wp-content/uploads/2022/10/about-decoration-img.svg" width={672} height={434} alt="hero divider svg" />
                        <Image className="w-full sm:w-2/3 md:w-full rounded-md mx-auto" src={pageData.acf.about_section.image.url} width={480} height={320} alt={pageData.acf.about_section.image.alt} />
                    </div>
                </div>
            </div>
        </>
    );
}