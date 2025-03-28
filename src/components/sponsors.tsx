import React from "react";
import { motion } from "framer-motion";
import { Sponsor } from "@/types";
import Image from "next/image";
import Heading from "./heading";

interface SponsorGroups {
  [key: string]: Sponsor[];
}

const Sponsors = ({ sponsors }: { sponsors: Sponsor[] }) => {
  // Group sponsors by tier
  const sponsorsByTier = sponsors.reduce<SponsorGroups>((groups, sponsor) => {
    const tier = sponsor.tier;
    if (!groups[tier]) {
      groups[tier] = [];
    }
    groups[tier].push(sponsor);
    return groups;
  }, {});

  // Sort tiers by importance
  const tierOrder = ["Platin", "Altın", "Gümüş", "Bronz", "Default"];
  const sortedTiers = Object.keys(sponsorsByTier).sort(
    (a, b) => tierOrder.indexOf(a) - tierOrder.indexOf(b)
  );

  const formatTierTitle = (tier: string): string => {
    const tierMap: Record<string, string> = {
      Platin: "PLATİN SPONSORLARIMIZ",
      Altın: "ALTIN SPONSORLARIMIZ",
      Gümüş: "GÜMÜŞ SPONSORLARIMIZ",
      Bronz: "BRONZ SPONSORLARIMIZ",
      "": "KATILIMCI ŞİRKETLER",
    };
    return tierMap[tier] || `${tier.toUpperCase()} SPONSORLARIMIZ`;
  };

  return (
    <div className="container mx-auto px-4 min-h-[50vh] flex items-end justify-end align-bottom mt-12">
      {sortedTiers.map((tier) => (
        <div key={tier} className="mb-16">
          <motion.h1
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-2xl text-center font-bold font-sans"
          >
            {formatTierTitle(tier)}
          </motion.h1>

          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-y-8 gap-x-12 pt-12 w-1/2 m-auto">
            {sponsorsByTier[tier].map((sponsor) => (
              <motion.div
                key={sponsor.sponsorSlug}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                className="w-[150px] h-[75px] flex items-center justify-center"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={`/images/sponsors/${sponsor.sponsorSlug}.webp`}
                    alt={sponsor.sponsorSlug || `${tier} Sponsor`}
                    className="opacity-80 hover:opacity-100 transition-opacity object-contain"
                    fill={true}
                    sizes="150px"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sponsors;
