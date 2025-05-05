"use client";

import React, { HTMLAttributes } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { osIconMap, browserIconMap } from "./constants";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faLocationDot,
  faCakeCandles,
} from "@fortawesome/free-solid-svg-icons";
import { timeAgo } from "@/src/utils/time";
import { Separator } from "@bugpilot/ui/components/separator";
interface IssueSummaryProps extends HTMLAttributes<HTMLDivElement> {
  os: string;
  browser: string;
  country: string;
  timestamp: string;
}

const IconText: React.FC<{ icon?: IconProp; text: string }> = ({
  icon,
  text,
}) => {
  return (
    <div className="flex flex-row gap-2 items-center justify-center">
      {icon && <FontAwesomeIcon icon={icon} />}
      {/* capitalize the first letter */}
      <span className="text-sm">
        {text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()}
      </span>
    </div>
  );
};
const IssueSummary: React.FC<IssueSummaryProps> = ({
  os,
  browser,
  country,
  timestamp,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-4">
        <IconText icon={osIconMap[os as keyof typeof osIconMap]} text={os} />
        <IconText
          icon={browserIconMap[browser as keyof typeof browserIconMap]}
          text={browser}
        />
        <IconText icon={faLocationDot} text={country} />
        <IconText icon={faCakeCandles} text={`${timeAgo(timestamp)} ago`} />
      </div>
    </div>
  );
};

export default IssueSummary;
