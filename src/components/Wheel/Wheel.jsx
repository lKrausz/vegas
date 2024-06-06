import { useState, useEffect, useRef } from "react";
import Header from "../dataBrands/Header";
import Footer from "../dataBrands/Footer";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AnotherBrands2 from "../AnotherBrands2/AnotherBrands2";

const Wheel = () => {
  // const { t } = useTranslation();
  const { t, i18n } = useTranslation();

  const [iframeWidth, setIframeWidth] = useState(1200);
  const [iframeHeight, setIframeHeight] = useState(675);

  const updateIframeSize = () => {
    const screenWidth = window.innerWidth;

    // Определите свои собственные условия для изменения размеров iframe
    if (screenWidth <= 767) {
      setIframeWidth("100%");
      setIframeHeight("100%");
    } else {
      setIframeWidth(1200);
      setIframeHeight(675);
    }
  };

  const iframe = document.getElementById("myIframe");
  // const [newUrl, setNewUrl] = useState("");
  // useEffect(() => {
  //   const url = window.location.href;
  //   const urlObj = new URL(url);
  //   const searchParams = new URLSearchParams(urlObj.search);
  //   const newUrl = "?" + searchParams.toString();
  //   setNewUrl(newUrl);
  // }, []);

  // window.addEventListener("message", function (event) {
  //   if (event.data) {
  //     console.log("Повідомлення від iframe: ", event.data);
  //     // window.location.href = `/${newUrl}`;
  //   }
  // });

  // // Додаємо обробник події message для отримання повідомлень від iframe
  // window.addEventListener("message", function (event) {
  //   // Перевіряємо, чи не є event.data пустим
  //   if (event.data) {
  //     console.log("Повідомлення від iframe: ", event.data);
  //     // Тут можна виконати подальші дії з event.data, якщо воно не є пустим
  //   } else {
  //     console.log("Отримано порожнє повідомлення від iframe.");
  //   }
  // });

  // window.addEventListener("message", function (event) {
  //   if (event.data === "Home") {
  //     ///дія до дому
  //     console.log("Повідомлення від iframe: ", event.data);
  //     window.location.href = `/${newUrl}`;
  //   }
  // });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split("?")[1]);
    const keyword = urlParams.get("keyword");
    console.log("---------", keyword);

    // При монтировании компонента и при изменении размера окна вызывается updateIframeSize
    updateIframeSize();

    window.addEventListener("resize", updateIframeSize);

    return () => {
      // Очистка слушателя событий при размонтировании компонента
      window.removeEventListener("resize", updateIframeSize);
    };
  }, []);

  const [ipData, setIpData] = useState(null);
  const [ipDataCode, setIpDataCode] = useState(null);
  const [newUrl, setNewUrl] = useState("");
  const [source, setSource] = useState("");

  const [selectedCountry, setSelectedCountry] = useState(
    localStorage.getItem("selectedCountry") || ""
  );

  // ...

  useEffect(() => {
    // Запрос к API с использованием fetch
    fetch(
      "https://ipapi.co/json/?key=YD0x5VtXrPJkOcFQMjEyQgqjfM6jUcwS4J54b3DI8ztyrFpHzW"
    )
      .then((response) => response.json())
      .then((data) => {
        setIpData(data.country_name);
        setIpDataCode(data.country);
        const countryFromLocalStorage = localStorage.getItem("selectedCountry");
        setSelectedCountry(
          countryFromLocalStorage || data.country.toLowerCase()
        );
      })
      .catch((error) => {
        console.error("Ошибка при запросе к API:", error);
      });
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const urlObj = new URL(url);
    const searchParams = new URLSearchParams(urlObj.search);
    searchParams.delete("brand");

    const currentSource = searchParams.get("keyword");

    if (
      currentSource !== null &&
      (currentSource.includes("partner1039"))
    ) {
      // Если в строке есть "partner1039" или "partner1041", вырезаем и добавляем в setSource
      const partnerIndex = currentSource.indexOf("partner");
      const partnerText = currentSource.substring(
        partnerIndex,
        partnerIndex + 11
      ); // 11 - длина "partner1039" или "partner1041"
      setSource(partnerText);

      // Используем "partner1039" или "partner1041" в newUrl
      searchParams.set("source", partnerText);
    } else {
      // Если "partner1039" или "partner1041" отсутствует, добавляем 0 в setSource
      setSource("0");

      // Используем "0" в newUrl
      searchParams.set("source", "0");
    }

    // Удаляем "source" из searchParams
    // searchParams.delete("source");

    // Добавить source в новый URL только если он существует
    const newUrl =
      "?" +
      (searchParams.toString() ? searchParams.toString() + "&" : "") +
      "creative_id=MAW";

    setNewUrl(newUrl);
  }, []);

  const countryOptions = [
    { code: "au", name: "Australia", flag: "🇦🇺" },
    { code: "at", name: "Austria", flag: "🇦🇹" },
    { code: "be", name: "Belgium", flag: "🇧🇪" },
    { code: "bg", name: "Bulgaria", flag: "🇧🇬" },
    { code: "ca", name: "Canada", flag: "🇨🇦" },
    { code: "cz", name: "Czech", flag: "🇨🇿" },
    { code: "dk", name: "Denmark", flag: "🇩🇰" },
    { code: "fi", name: "Finland", flag: "🇫🇮" },
    { code: "fr", name: "France", flag: "🇫🇷" },
    { code: "de", name: "Germany", flag: "🇩🇪" },
    { code: "gr", name: "Greece", flag: "🇬🇷" },
    { code: "hu", name: "Hungary", flag: "🇭🇺" },
    { code: "ie", name: "Ireland", flag: "🇮🇪" },
    { code: "it", name: "Italy", flag: "🇮🇹" },
    { code: "nl", name: "Netherlands", flag: "🇳🇱" },
    { code: "nz", name: "New Zealand", flag: "🇳🇿" },
    { code: "no", name: "Norway", flag: "🇳🇴" },
    { code: "pl", name: "Poland", flag: "🇵🇱" },
    { code: "pt", name: "Portugal", flag: "🇵🇹" },
    { code: "sk", name: "Slovakia", flag: "🇸🇰" },
    { code: "es", name: "Spain", flag: "🇪🇸" },
    { code: "se", name: "Sweden", flag: "🇸🇪" },
    { code: "ch", name: "Switzerland", flag: "🇨🇭" },
    { code: "tr", name: "Turkey", flag: "🇹🇷" },
    { code: "gb", name: "United Kingdom", flag: "🇬🇧" },
    { code: "all", name: "World", flag: "🌍" },
  ];

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    // Сохранить в localStorage
    localStorage.setItem("selectedCountry", country);
  };

  const videos = {
    en: "https://www.youtube.com/embed/GEeEG393PjU?si=uq_PvG10Hx2LBjFV",
    nl: "https://www.youtube.com/embed/suqKh159URk?si=ug0ylBG-ZaPvStHN",
    fi: "https://www.youtube.com/embed/B2dFhVLYI7k?si=w1r2fXk1Dx6cd3qc",
    fr: "https://www.youtube.com/embed/zkCssK44CIU?si=IRNde63jcC9bgXqE",
    de: "https://www.youtube.com/embed/wwyVVF8vgVw?si=JLj38j7s5gRGahxu",
    at: "https://www.youtube.com/embed/wwyVVF8vgVw?si=JLj38j7s5gRGahxu",
    ch: "https://www.youtube.com/embed/wwyVVF8vgVw?si=JLj38j7s5gRGahxu",
    be: "https://www.youtube.com/embed/zkCssK44CIU?si=IRNde63jcC9bgXqE",
    it: "https://www.youtube.com/embed/mH0egvutPl4?si=PPj9JwZ2s4FMmSPL",
    no: "https://www.youtube.com/embed/hEH7tZXiWzE?si=zQ_5hz_0e1Za7qVX",
    se: "https://www.youtube.com/embed/KHaWEYScldc?si=pzI5Mz4onJI1ymDn"
  };
  const selectedVideo = videos[i18n.language] || videos.en;

    // Создайте реф для элемента, к которому вы хотите выполнить скролл
    const iframeRef = useRef(null);

    // Обработчик события клика на кнопку
    const handleScrollClick = () => {
      // Используйте метод scrollIntoView для выполнения плавного скролла
      iframeRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start', // Или 'center', 'end', 'nearest'
      });
    };

    

  return (
    <div className="game">
      <Header />
      <div className="container container-game">
        <button className="to-instruction" onClick={handleScrollClick}>{t("How does it work?")}</button>
        <Link className="back-to-home" to={`/${newUrl}`}>
        {t("Main Page")}
        </Link>
        <iframe
          id="myIframe"
          src="https://pickbonus.myawardwallet.com/wheel5/"
          width={iframeWidth}
          height={iframeHeight}
        ></iframe>
      </div>
      <div className="select-brand container">
        <p>{t("select")}</p>
        <select
          id="countrySelect"
          value={selectedCountry}
          // onChange={(e) => setSelectedCountry(e.target.value)}
          onChange={(e) => handleCountryChange(e.target.value)}
        >
          {countryOptions.map((country, index) => (
            <option
              key={index}
              value={country.code}
              selected={country.code === ipDataCode}
            >
              {country.flag} {country.name}
            </option>
          ))}
        </select>
      </div>
      <AnotherBrands2
        newUrl={newUrl}
        ipData={ipData}
        ipDataCode={ipDataCode}
        currentLanguage={i18n.language}
        source={source}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
      <div className="yt" ref={iframeRef}>
        <iframe
          id="myIframe22"
          width={iframeWidth}
          height={iframeHeight}
          src={selectedVideo}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>

      <Footer />
    </div>
  );
};

export default Wheel;
