import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";
import Loader from "../components/Loader/Loader";

function TopBrands({
  newUrl,
  ipDataCode,
  currentLanguage,
  source,
  selectedCountry,
  setSelectedCountry, // Функция для обновления selectedCountry
}) {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [topData, setTopData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    centerPadding: "20px",
    centerMode: true,
  };


  const urlParams = new URLSearchParams(window.location.search);
  const brandValue = urlParams.get("brand");

  const apiOld = "https://pickbonus.myawardwallet.com/api/brands/read.php";
  const apiNew = "https://pickbonus.myawardwallet.com/api/brands/read2.php";

  function shuffleArray(array) {
    const shuffledArray = array.slice(); // Создаем копию массива
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  console.log("============", source);
  useEffect(() => {
    const geo = selectedCountry.toUpperCase();
    console.log("GEO", geo);
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const url =
          source === "partner1039"
            ? apiNew
            : apiOld;

        const res = await fetch(url);
        if (res.ok) {
          const responseData = await res.json();
          // const dataArray = Object.values(responseData.brands);
          let filteredData = [];
          console.log("respons3dData", responseData.brands)
          if (geo) {
            filteredData = responseData.brands.filter(
              (rowData) =>
                rowData.GEO === geo &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData.Segment2 === "Premium"
            );
          } else {
            filteredData = responseData.brands.filter(
              (rowData) =>
                rowData.GEO === ipDataCode &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData.Segment2 === "Premium"
            );
          }

          console.log("filtered", filteredData)

          const topData = responseData.brands
            .filter((rowData) => rowData.Tech === brandValue)
            .map((item) => ({
              ...item,
              clas: "topbrand",
            }));

          // Фильтрация объектов в массиве data
          const filteredDataWithTopData = filteredData.filter((dataItem) => {
            // Проверка, есть ли объект с таким же Casino brand в topData
            const existsInTopData = topData.some(
              (topDataItem) =>
                topDataItem["CasinoBrand"] === dataItem["CasinoBrand"]
            );

            // Возвращаем true только для объектов, которые не совпадают
            return !existsInTopData;
          });

          // Перемешиваем данные перед отображением
          setData(shuffleArray(filteredDataWithTopData));

          setTopData([...topData]);
          setIsLoading(false);

          // Если нет брендов, вызывать setSelectedCountry
          if (filteredDataWithTopData.length === 0) {
            setSelectedCountry("all");
            console.log(filteredDataWithTopData);
          }
        } else {
          console.error("Failed to fetch data:", res.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    if ((geo && currentLanguage) || (!geo && ipDataCode && currentLanguage)) {
      fetchData();
    }
  }, [ipDataCode, brandValue, currentLanguage, selectedCountry, source]);

  // console.log("SELECTED COUNTRY", selectedCountry);
  // const handleEmail = () => {
  //   window.gtag("event", "click", {
  //     event_category: "Choice from E-mail",
  //     event_label: "Choice from E-mail",
  //   });
  // };

  // const handleTop = () => {
  //   window.gtag("event", "click", {
  //     event_category: "Top Brand",
  //     event_label: "Top Brand",
  //   });
  // };

  const combinedData = [...topData, ...data];
  console.log("combined", combinedData);
















  return (
    <div className="bg1">
      {isLoading && <Loader />}
      <div className="container api-content">
        <div className="brand">
          <h1>{t("greeting")}</h1>
          <div className="desctop">
            {data.length > 2 && (
              <Slider {...settings}>
                {topData ? (
                  topData.map((rowData, index) => (
                    <div className={`flex ${rowData.clas}`} key={index}>
                      <div className="imgDiv">
                        <a
                          id="top_brand"
                          target="_blank"
                          href={rowData["GoBig"] + newUrl}
                          // onClick={handleEmail}
                        >
                          <img src={rowData["LinkImg"]} alt="" />
                        </a>
                        <p className="bonus">{rowData["OurOfferContent"]}</p>
                      </div>
                      <div>
                        <a
                          id="top_brand"
                          className="btn btn-primary big-btn"
                          target="_blank"
                          href={rowData["GoBig"] + newUrl}
                          // onClick={handleEmail}
                        >
                          {t("proceed")}
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <li>No matching data found.</li>
                )}
                {data ? (
                  data.map((rowData, index) => (
                    <div className={`flex ${rowData.clas}`} key={index}>
                      <div className="imgDiv">
                        <a
                          id="top_brand"
                          target="_blank"
                          href={rowData["GoBig"] + newUrl}
                          // onClick={handleTop}
                        >
                          <img src={rowData["LinkImg"]} alt="" />
                        </a>
                        <p className="bonus">{rowData["OurOfferContent"]}</p>
                      </div>
                      <div>
                        <a
                          id="top_brand"
                          className="btn btn-primary big-btn"
                          target="_blank"
                          href={rowData["GoBig"] + newUrl}
                          // onClick={handleTop}
                        >
                          {t("proceed")}
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <li>No matching data found.</li>
                )}
              </Slider>
            )}
            <div className="nosliders">
              {data.length <= 2 &&
                combinedData.map((rowData, index) => (
                  <div className={`flex noslider ${rowData.clas}`} key={index}>
                    <div className="imgDiv">
                      <a
                        id="top_brand"
                        target="_blank"
                        href={rowData["GoBig"] + newUrl}
                        // onClick={handleEmail}
                      >
                        <img src={rowData["LinkImg"]} alt="" />
                      </a>
                      <p className="bonus">{rowData["OurOfferContent"]}</p>
                    </div>
                    <div>
                      <a
                        id="top_brand"
                        className="btn btn-primary big-btn"
                        target="_blank"
                        href={rowData["GoBig"] + newUrl}
                        // onClick={handleEmail}
                      >
                        {t("proceed")}
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="mobile">
            {combinedData ? (
              combinedData.map((rowData, index) => (
                <div className="flex" key={index}>
                  <div className="imgDiv">
                    <a
                      id="top_brand"
                      target="_blank"
                      href={rowData["GoBig"] + newUrl}
                      // onClick={handleEmail}
                    >
                      <img src={rowData["LinkImg"]} alt="" />
                    </a>
                    <p className="bonus">{rowData["OurOfferContent"]}</p>
                  </div>
                  <div>
                    <a
                      id="top_brand"
                      className="btn btn-primary big-btn"
                      target="_blank"
                      href={rowData["GoBig"] + newUrl}
                    >
                      {t("proceed")}
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <li>No matching data found.</li>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBrands;
