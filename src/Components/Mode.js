import React, { useEffect, useState } from "react";
import iconMoon from "../Images/icon-moon.svg";
import iconSun from "../Images/icon-sun.svg";

import bgImg from "../Images/bg-desktop-light.jpg";
import bgImgDark from "../Images/bg-desktop-dark.jpg";

import bgImgPhone from "../Images/bg-mobile-light.jpg";
import bgImgPhoneDark from "../Images/bg-mobile-dark.jpg";

const Mode = () => {
  const [lightMode, setLightMode] = useState(true);

  const lightModeColors = {
    white: "#ffffff",
    mainColor: "hsl(235, 21%, 11%)",
    thirdColor: "hsl(0, 0%, 90%)",
    img: `url(${bgImg})`,
    imgPhone: `url(${bgImgPhone})`,
  };

  const darkModeColors = {
    black: "#000000",
    mainColor: "hsl(234, 39%, 85%)",
    thirdColor: "hsl(235, 21%, 11%)",
    img: `url(${bgImgDark})`,
    imgPhone: `url(${bgImgPhoneDark})`,
  };

  if (lightMode) {
    document.documentElement.style.setProperty(
      "--white",
      lightModeColors.white
    );
    document.documentElement.style.setProperty(
      "--thirdColor",
      lightModeColors.thirdColor
    );
    document.documentElement.style.setProperty(
      "--mainColor",
      lightModeColors.mainColor
    );

    document.documentElement.style.setProperty("--bgImg", lightModeColors.img);
    document.documentElement.style.setProperty(
      "--bgImgPhone",
      lightModeColors.imgPhone
    );
  } else {
    document.documentElement.style.setProperty("--white", darkModeColors.black);
    document.documentElement.style.setProperty(
      "--thirdColor",
      darkModeColors.thirdColor
    );
    document.documentElement.style.setProperty(
      "--mainColor",
      darkModeColors.mainColor
    );

    document.documentElement.style.setProperty("--bgImg", darkModeColors.img);
    document.documentElement.style.setProperty(
      "--bgImgPhone",
      darkModeColors.imgPhone
    );
  }

  return (
    <div className="title flex jc-sb mb-3 ai-c">
      <h1>TODO</h1>
      <div>
        <img
          src={lightMode ? iconMoon : iconSun}
          alt="mode"
          className="icon c-p"
          onClick={() => setLightMode(!lightMode)}
        />
      </div>
    </div>
  );
};

export default Mode;
