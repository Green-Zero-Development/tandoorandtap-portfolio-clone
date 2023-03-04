export default function Loading() {
    return (
        <div className="bg-orange-500 pt-40 3xl:pt-48 overflow-hidden">
            <div className="relative max-w-6xl mx-auto py-32 hero" style={{backgroundImage: 'url(https://inside.tandoorandtap.com/wp-content/uploads/2022/11/home-hero-img.jpg)'}}>
                <img className="absolute top-0 left-0 -mt-8 -ml-8 z-20" src="https://inside.tandoorandtap.com/wp-content/uploads/2022/10/yellow-dots.svg" />
                <h1 className="relative max-w-sm md:max-w-lg text-6xl sm:text-7xl md:text-8xl text-white text-center leading-none uppercase tracking-wide mx-auto p-4 z-30 hero-title">Loading</h1>
                <img className="hidden lg:block absolute bottom-0 right-0 -mb-8 -mr-8" src="https://inside.tandoorandtap.com/wp-content/uploads/2022/10/red-dots.svg" />
            </div>
            <div className="3xl:py-12"></div>
            <img src="https://inside.tandoorandtap.com/wp-content/uploads/2022/10/section-frame.svg" className="pt-16 md:pt-24 w-full hero-border" />
        </div>
    );
}