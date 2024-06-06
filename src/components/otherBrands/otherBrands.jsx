import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { useTranslation } from "react-i18next";


function OtherBrands({
  newUrl,
  ipData,
  ipDataCode,
  currentLanguage,
  country,
  source,
  selectedCountry,
  setSelectedCountry,
}) {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [otherData, setOtherData] = useState([]);
  // const [visibleBrands, setVisibleBrands] = useState(8);
  const [step, setStep] = useState(4);
  const [isAllElements, setAllElements] = useState(false);


  // const handleShowMore = () => {
  //   setVisibleBrands((prevVisibleBrands) => prevVisibleBrands + 8);
  // };

  const apiOld = "https://pickbonus.myawardwallet.com/api/brandsNew/read.php";
  const apiNew = "https://pickbonus.myawardwallet.com/api/brandsNew2/read.php";
  const api1043 = "https://pickbonus.myawardwallet.com/api/brandsNew3/read.php";
  const api1044 = "https://pickbonus.myawardwallet.com/api/brandsNew4/read.php";

  function showData(array) {
    const showedArray = array.slice();
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
    setStep(prevIndex => prevIndex + 4);
  }

  useEffect(() => {
    const geo = selectedCountry.toUpperCase();

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
          // const dataArray = Object.values(responseData);
          let filteredDataOther = [];

          if (geo) {
            filteredDataOther = responseData.brandsNew.filter(
              (rowData) =>
                rowData.GEO === geo &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData["High_hybrid"] === "1"
            );
          } else {
            filteredDataOther = responseData.brandsNew.filter(
              (rowData) =>
                rowData.GEO === ipDataCode &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData["High_hybrid"] === "1"
            );
          }

          const arrLength = filteredDataOther.length / 2

          setOtherData(showData(filteredDataOther.slice(arrLength)));
          // setOtherData(showData(filteredDataOther));
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
  }, [ipDataCode, currentLanguage, selectedCountry, source, step, isAllElements]);

  // ...

  return (
    <div>
      {otherData.length > 0 && (
        <div id="ttsmartblog" className="style2 my-40 my-sm-25">
          <div className="tt-title d-inline-block float-none w-100 text-center">{t("Exclusive Summer Specials – Limited Time Only!")}</div>
          <div className="container">
            <div className="smartblog-content row">
              {otherData.length > 0 ? (
                otherData.map((rowData, index) => (
                  <div className="ttblog  col-xl-3 col-lg-3 col-sm-6">
                    <a className="readmore" href={
                      rowData["GoBig"] +
                      newUrl +
                      "L_enchanted-forest_2"
                    }>
                      <div className="card">
                        <div className="imageContainer">
                          <img src={rowData["LinkImg"]} alt={rowData["LinkImg"]} />
                        </div>
                        <div className="card-content">
                          <p className="card-title">{rowData["CasinoBrand"]}</p>
                          <p className="card-para">{rowData["OurOfferContent"]}</p>
                        </div>
                      </div>
                    </a>
                  </div>
                ))
              ) : (
                <p className="ti">{t("No brands available for your country")}</p>
              )}
            </div>
          </div>
          {isAllElements ? (
            <a href={`https://topbon.us/${newUrl}L_enchanted-forest_2`} target="_blank">
              <button class="button-glow">{t("More offers")}</button>
            </a>
          ) : (
            <a target="_blank"
              onClick={loadMoreItems}>
              <button class="button-glow">{t("Show more")}</button>
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default OtherBrands;
