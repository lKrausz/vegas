import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";
import Loader from "../Loader/Loader";
import "bootstrap/dist/css/bootstrap.min.css";


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
  const [step, setStep] = useState(1);
  const [isAllElements, setAllElements] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const brandValue = urlParams.get("brand");

  const apiOld = "https://pickbonus.myawardwallet.com/api/brandsNew/read.php";
  const apiNew = "https://pickbonus.myawardwallet.com/api/brandsNew2/read.php";
  const api1043 = "https://pickbonus.myawardwallet.com/api/brandsNew3/read.php";
  const api1044 = "https://pickbonus.myawardwallet.com/api/brandsNew4/read.php";

  function showData(array) {
    const showedArray = array.slice(); // Создаем копию массива
    //Обрезка массива до step элементов, чтобы было по шаблону
    if (showedArray.length > step) {
      setAllElements(false)
      return showedArray.slice(0, step);
    } else {
      setAllElements(true)
    }
    return showedArray;
  }

  function loadMoreItems() {
    setStep(prevIndex => prevIndex + 3);
  }

  console.log("source:", source);
  useEffect(() => {
    const geo = selectedCountry.toUpperCase();
    console.log("GEO", geo);
    const fetchData = async () => {
      try {
        let url;
        switch (source) {
          case "partner1039":
            url = apiNew; // Для partner1039
            break;
          case "partner1043":
            url = api1043; // Для partner1043
            break;
          case "partner1044":
            url = api1044; // Для partner1044
            break;
          default:
            url = apiOld; // Для всех остальных случаев
        }

        const res = await fetch(url);
        if (res.ok) {
          const responseData = await res.json();
          // const dataArray = Object.values(responseData.brandsNew);
          let filteredData = [];
          if (geo) {
            filteredData = responseData.brandsNew.filter(
              (rowData) =>
                rowData.GEO === geo &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData["High_hybrid"] === "1"
            );
          } else {
            filteredData = responseData.brandsNew.filter(
              (rowData) =>
                rowData.GEO === ipDataCode &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData["High_hybrid"] === "1"
            );
          }

          const topData = responseData.brandsNew
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

          const arrLength = filteredDataWithTopData.length / 2

          setData(showData(filteredDataWithTopData.slice(0, arrLength)));
          // setData(showData(filteredDataWithTopData));

          setTopData([...topData]);

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
  }, [ipDataCode, brandValue, currentLanguage, selectedCountry, source, step, isAllElements]);

  const combinedData = [...topData, ...data];

  return (
    <div>
      {data.length > 0 && (
        <div className="topBrands">
          <div className="tt-title d-inline-block float-none w-100 text-center">{t("Summer's Best Casino Bonuses!")}</div>
          <div className="container">
            {/* <div className="smartblog-content row"> */}
            {data.map((rowData, index) => (
              <div>

                <div class="tabs">

                  <input type="radio" name="tabs" id="tabone" checked="checked"/>
                    <label for="tabone">First Tab</label>
                    <div class="tab">
                      <h1>First Tab Content</h1>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>

                    <input type="radio" name="tabs" id="tabtwo"/>
                      <label for="tabtwo">Second Tab</label>
                      <div class="tab">
                        <h1>Second Tab Content</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      </div>

                      <input type="radio" name="tabs" id="tabthree"/>
                        <label for="tabthree">Third Tab</label>
                        <div class="tab">
                          <h1>Third tab content</h1>
                          <p>hfioezhogehzioghz</p>
                        </div>
                      </div>

                      {/* <div className="row">
                    <div className="ttblog  col-xl-4 col-lg-4 col-sm-6">
                      <a className="readmore" href={
                        rowData["GoBig"] +
                        newUrl +
                        "L_enchanted-forest_1"
                      }>
                        <div className="top-card">
                          <div className="imageContainer">
                            <img src={rowData["LinkImg"]} alt={rowData["LinkImg"]} />
                            <img src="" alt="" />
                          </div>
                          <div className="top-card-content">
                            <p className="top-card-title">{rowData["CasinoBrand"]}</p>
                            <p className="top-card-para">{rowData["OurOfferContent"]}</p>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className="ttblog  col-xl-8 col-lg-8 col-sm-6">
                      <a className="readmore" href={
                        rowData["GoBig"] +
                        newUrl +
                        "L_enchanted-forest_1"
                      }>
                        <div className="top-card">
                          <div className="imageContainer">
                            <img src={rowData["LinkImg"]} alt={rowData["LinkImg"]} />
                          </div>
                          <div className="top-card-content">
                            <p className="top-card-title">{rowData["CasinoBrand"]}</p>
                            <p className="top-card-para">{rowData["OurOfferContent"]}</p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div> */}

                      {/* <div className="row">
                    <div className="ttblog  col-xl-8 col-lg-8 col-sm-6">
                      <a className="readmore" href={
                        rowData["GoBig"] +
                        newUrl +
                        "L_enchanted-forest_1"
                      }>
                        <div className="top-card">
                          <div className="imageContainer">
                            <img src={rowData["LinkImg"]} alt={rowData["LinkImg"]} />
                          </div>
                          <div className="top-card-content">
                            <p className="top-card-title">{rowData["CasinoBrand"]}</p>
                            <p className="top-card-para">{rowData["OurOfferContent"]}</p>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className="ttblog  col-xl-4 col-lg-4 col-sm-6">
                      <a className="readmore" href={
                        rowData["GoBig"] +
                        newUrl +
                        "L_enchanted-forest_1"
                      }>
                        <div className="top-card">
                          <div className="imageContainer">
                            <img src={rowData["LinkImg"]} alt={rowData["LinkImg"]} />
                          </div>
                          <div className="top-card-content">
                            <p className="top-card-title">{rowData["CasinoBrand"]}</p>
                            <p className="top-card-para">{rowData["OurOfferContent"]}</p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div> */}
                    </div>

                    )
            )}

                </div>
                {/* </div> */}
                {/* {isAllElements ? (
                  <a href={`https://topbon.us/${newUrl}L_enchanted-forest_1`} target="_blank">
                    <button className="button-glow">{t("More offers")}</button>
                  </a>
                ) : (
                  <a target="_blank"
                    onClick={loadMoreItems}>
                    <button className="button-glow">{t("Show more")}</button>
                  </a>
                )} */}
              </div>
            )}
          </div>
          );
}

          export default TopBrands;
