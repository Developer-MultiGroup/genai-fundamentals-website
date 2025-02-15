import React from "react";

const SponsorSlider = ({
  sponsors,
  reverse = false,
}: {
  sponsors: string[];
  reverse?: boolean;
}) => {
  // Duplicate sponsors array once to ensure enough content for the loop
  const duplicatedSponsors = [
    ...sponsors,
    ...sponsors,
    ...sponsors,
    ...sponsors,
  ];

  return (
    <div className="w-full bg-[#F6DA29]">
      <div className="relative flex overflow-hidden h-40">
        {/* Main track */}
        <div
          className={`flex items-center ${
            reverse ? "animate-marquee-reverse" : "animate-marquee"
          }`}
        >
          {duplicatedSponsors.map((sponsor, index) => (
            <div
              key={`first-${sponsor}-${index}`}
              className="mx-8 flex-shrink-0"
            >
              <img
                draggable={false}
                src={`/images/sponsors/${sponsor}.png`}
                alt={`${sponsor} logo`}
                className="h-14 w-auto object-contain  opacity-70 hover:opacity-100 select-none brightness-0 hover:brightness-100 hover:invert-0 ease-in-out duration-200 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SponsorSlider;
