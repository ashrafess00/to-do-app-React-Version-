import React, { useEffect, useState } from "react";
import iconMoon from "../Images/icon-moon.svg";
import iconSun from "../Images/icon-sun.svg";

import bgImg from "../Images/bg-desktop-light.jpg";
import bgImgDark from "../Images/bg-desktop-dark.jpg";

import bgImgPhone from "../Images/bg-mobile-light.jpg";
import bgImgPhoneDark from "../Images/bg-mobile-dark.jpg";

const Mode = () => {
  const [lightMode, setLightMode] = useState(true);

  if (lightMode) {
    document.documentElement.style.setProperty("--white", "#ffffff");
    document.documentElement.style.setProperty(
      "--thirdColor",
      "hsl(0, 0%, 90%)"
    );
    document.documentElement.style.setProperty(
      "--mainColor",
      "hsl(235, 21%, 11%)"
    );

    document.documentElement.style.setProperty("--bgImg", `url(${bgImg})`);
    document.documentElement.style.setProperty(
      "--bgImgPhone",
      `url(${bgImgPhone})`
    );
  } else {
    document.documentElement.style.setProperty("--white", "black");
    document.documentElement.style.setProperty(
      "--thirdColor",
      "hsl(235, 21%, 11%)"
    );
    document.documentElement.style.setProperty(
      "--mainColor",
      "hsl(234, 39%, 85%)"
    );

    document.documentElement.style.setProperty("--bgImg", `url(${bgImgDark})`);
    document.documentElement.style.setProperty(
      "--bgImgPhone",
      `url(${bgImgPhoneDark})`
    );
  }

  return (
    <div className="title flex jc-sb mb-3 ai-c">
      <h1>TODO</h1>
      <img
        src={lightMode ? iconMoon : iconSun}
        alt="mode"
        className="icon c-p"
        onClick={() => setLightMode(!lightMode)}
      />
    </div>
  );
};

export default Mode;
