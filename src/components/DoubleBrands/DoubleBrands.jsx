import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function DoubleBrands({
  newUrl,
  ipDataCode,
  currentLanguage,
  source,
  selectedCountry,
}) {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [otherData, setOtherData] = useState([]);
  const [visibleBrands, setVisibleBrands] = useState(4);

  const handleShowMore2 = () => {
    setVisibleBrands((prevVisibleBrands) => prevVisibleBrands + 4);
  };

  const apiOld =
    "https://pickbonus.myawardwallet.com/api/brands/read.php";
  const apiNew =
    "https://pickbonus.myawardwallet.com/api/brands/read2.php";

  function shuffleArray(array) {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  useEffect(() => {
    const geo = selectedCountry.toUpperCase();

    const fetchData = async () => {
      try {
        const url =
          source === "partner1039"
            ? apiNew
            : apiOld;

        const res = await fetch(url);
        if (res.ok) {
          const responseData = await res.json();
          // const dataArray = Object.values(responseData);

          let filteredDataOther = [];

          if (geo) {
            filteredDataOther = responseData.brands.filter(
              (rowData) =>
                rowData.GEO === geo &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData.Hottest === "1"
            );
          } else {
            filteredDataOther = responseData.brands.filter(
              (rowData) =>
                rowData.GEO === ipDataCode &&
                rowData["Current Status"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData.Hottest === "1"
            );
          }

          // Перемешиваем данные перед отображением
          setOtherData(shuffleArray(filteredDataOther));
          setLoading(false);

          // Если нет брендов, вызывать setSelectedCountry
          // if (filteredDataOther.length === 0) {
          //   setSelectedCountry("all");
          // }
        } else {
          console.error("Failed to fetch data:", res.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        setLoading(false);
      }
    };

    if ((ipDataCode && currentLanguage) || (geo && currentLanguage)) {
      fetchData();
    }
  }, [ipDataCode, currentLanguage, selectedCountry, source]);

  // ...

  return (
    <div className="flexbasis">
      <div className="banner-slot1">
        <div className="banner-text">
          <h3>{t("Hottest Bonus Deals")}</h3>
        </div>
      </div>
      <div className="all-brands">
        {otherData.length > 0 ? (
          otherData.slice(0, visibleBrands).map((rowData, index) => (
            <div className="one-brand" key={index}>
              <div>
                <a
                  id="hottestBonus"
                  target="_blank"
                  href={rowData["GoBig"] + newUrl}
                >
                  <img src={rowData["LinkImg"]} alt="" />
                </a>
                <p>{rowData["OurOfferContent"]}</p>
              </div>
              <a
                id="hottestBonus"
                className="btn btn-primary"
                target="_blank"
                href={rowData["GoBig"] + newUrl}
              >
                {t("getBonus")}
              </a>
            </div>
          ))
        ) : (
          <p className="ti">{t("No brands available for your country")}</p>
        )}
      </div>
      {visibleBrands < otherData.length && (
        <button id="hottestBonusShowMore" className="btn btn-primary big-btn" onClick={handleShowMore2}>
          {t("showMore")}
        </button>
      )}
    </div>
  );
}

export default DoubleBrands;
