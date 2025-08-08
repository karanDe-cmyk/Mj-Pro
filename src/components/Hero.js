import React, { useEffect, useState, useCallback } from "react";
import {
  FaHandPointRight,
  FaPhone,
  FaWhatsapp,
  FaPlayCircle,
} from "react-icons/fa";
import apiInstance from "../utils/axios"; // Assuming this path is correct
import moment from "moment";

const ANDROID_64_BIT_URL = "https://mj-matka.s3.ap-south-1.amazonaws.com/app-universal-release+(1).apk";
// const ANDROID_32_BIT_URL = "https://3d-gama-matka-app.s3.ap-south-1.amazonaws.com/app-armeabi-v7a-release.apk";
// const IOS_APP_STORE_URL = "https://apps.apple.com/app/idXXXXXXXXX"; // Replace with actual App Store link
const DEFAULT_DOWNLOAD_URL = ANDROID_64_BIT_URL; // default to 64-bit

function Hero() {
  const [games, setGames] = useState([]);
  const [charts, setCharts] = useState([]); // Added from user's latest input
  const [declaredResults, setDeclaredResults] = useState([]);
  const today = moment().format("YYYY-MM-DD");
  console.log(charts); // User's original console log
  console.log(games); // User's original console log

  const [whatsapp, setWhatsapp] = useState("");
  const [mobile, setMobile] = useState("");

  // Removed detectArchitecture and downloadUrl state as the download link is now hardcoded in JSX
  // and the original provided code didn't use the state for the download button's href.

  const getResultStringForGame = (gameName) => {
    const gameResults = declaredResults.filter(
      (item) =>
        item.gameName.trim().toUpperCase() === gameName.trim().toUpperCase()
    );
    const openResult = gameResults.find((item) => item.gameType === "open");
    const closeResult = gameResults.find((item) => item.gameType === "close");

    if (openResult && closeResult) {
      return `${openResult.panna}-${openResult.digit}${closeResult.digit}-${closeResult.panna}`;
    } else if (openResult && !closeResult) {
      return `${openResult.panna}-${openResult.digit}*-***`;
    } else if (!openResult && closeResult) {
      return `***-*${closeResult.digit}-${closeResult.panna}`;
    } else {
      return "***-**-***";
    }
  };

  useEffect(() => {
    const fetchWhatsapp = async () => {
      try {
        const res = await apiInstance.get('/api/settings/general/whatsapp');
        setWhatsapp(res.data.whatsappnumber);
        setMobile(res.data.mobile);
      } catch (err) {
        console.log(err);
      }
    };
    fetchWhatsapp();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await apiInstance.get("/api/marketManagement/getMarketGames");
      const data = response.data || [];
      const activeGames = data.filter((game) => game.isActive);
      const currentDay = moment().format("dddd");

      const mappedGames = activeGames.map((game) => {
        const weekendRecord = game.weekends.find(
          (item) => item.day.toLowerCase() === currentDay.toLowerCase()
        );

        let status = game.is_open ? "Running" : "Closed for today";
        let displayOpenTime = game.openTime;
        let displayCloseTime = game.closeTime;
        const gameName = game.gameName || game.name || 'unknown-game';

        const cleanGameName = gameName.toString()
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');

        if (weekendRecord) {
          if (!weekendRecord.is_on || !weekendRecord.is_open) {
            status = "Closed for today";
            displayOpenTime = weekendRecord.openTime;
            displayCloseTime = weekendRecord.closeTime;
          } else {
            status = "Running";
          }
        }

        return {
          name: game.gameName.toUpperCase(),
          originalName: game.gameName,
          openTime: displayOpenTime,
          closeTime: displayCloseTime,
          status,
          createdAt: game.createdAt,
          jodiChart: `/mrecords/${cleanGameName}-jodi-chart`,
          pannaChart: `/mrecords/${cleanGameName}-panel-chart`,
        };
      });

      const sortedGames = mappedGames.sort((a, b) =>
        moment(a.createdAt).diff(moment(b.createdAt))
      );
      setGames(sortedGames);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  const fetchDeclaredResults = useCallback(async () => {
    try {
      const response = await apiInstance.get("/api/mainmarketdeclareResult/DeclareResult");
      const results = response.data.results || [];
      const todayResults = results.filter(
        (item) => item.date === today && item.marketName === "Main Market"
      );
      setDeclaredResults(todayResults);
      setCharts(response.data.results ? Object.entries(response.data.results) : []);
    } catch (error) {
      console.error("Error fetching declared results:", error);
    }
  }, [today]);

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    fetchDeclaredResults();
  }, [fetchDeclaredResults]);

  const [gameRatesObject, setGameRatesObject] = useState({});
  const [gameRatesArray, setGameRatesArray] = useState([]);

  useEffect(() => {
    const fetchGameRates = async () => {
      try {
        const response = await apiInstance.get("/api/rates/getBetRatesWeb");
        setGameRatesObject(response.data);
      } catch (err) {
        console.error("Error fetching game rates:", err);
      }
    };
    fetchGameRates();
  }, []);

  useEffect(() => {
    const requiredKeys = [
      { key: "singleDigits", label: "Single Digit" },
      { key: "jodi", label: "Jodi Digit" },
      { key: "doublePana", label: "Double Pana" },
      { key: "halfSangamA", label: "Half Sangam A" },
      { key: "redBracket", label: "Red Bracket" },
      { key: "singlePana", label: "Single Pana" },
      { key: "triplePana", label: "Triple Pana" },
      { key: "fullSangam", label: "Full Sangam" },
    ];

    const convertObjectToArray = () => {
      const convertedArray = requiredKeys.map(({ key, label }) => ({
        rateLabel: label,
        rate: gameRatesObject[key] ?? 0,
        valueLabel: `${key}Value`,
        value: gameRatesObject[`${key}Value`] ?? 0,
      }));
      setGameRatesArray(convertedArray);
    };

    if (Object.keys(gameRatesObject).length > 0) {
      convertObjectToArray();
    }
  }, [gameRatesObject]);

  return (
    <div className="bg-white text-gray-800"> {/* Main container for light theme */}
      <a href={`https://wa.me/+91${whatsapp}`} target="blank" className="fixed bottom-4 right-4 z-50 bg-teal-600 p-3 rounded-full shadow-lg hover:bg-teal-700 transition-colors duration-200">
        <FaWhatsapp size={26} color="white" />
      </a>

      <div className="flex flex-col items-center min-h-screen mt-[1cm]">
        {/* Header Section */}
        <section className="flex flex-col w-full text-center header mt-4">
          <div className="z-10">
            <p className="text-[35px] sm:text-[40px] md:text-[55px] font-bold text-gray-800">
              Welcome to <span className="text-teal-600"> Matka</span>
            </p>
            <p className="text-xl md:text-2xl text-gray-600">
              Business Of Faith, With Confidence
            </p>
          </div>
        </section>

        {/* Download Button Section */}
        <section id="hero" className="w-full h-72 bg-gray-100 pt-4"> {/* Changed background */}
          <div className="max-w-7xl mx-auto px-4 overflow-hidden sm:px-6 lg:px-8">
            <div className="flex justify-center space-x-6">
              <a href={DEFAULT_DOWNLOAD_URL} // Using the constant for download URL
                className="animate-bounce bg-teal-600 p-2 rounded-full w-72 text-white border-teal-700 border-2 shadow mt-3 text-center hover:bg-teal-700 transition-colors duration-200">
                <FaHandPointRight className="inline-block text-lg mr-2" />
                Download Now
              </a>
            </div>

            <div className="mt-8 text-center text-base">
              <h3 className="text-2xl text-gray-800">
                <strong> +91 {whatsapp} </strong>
              </h3>
            </div>

            <div className="mt-6 flex justify-center space-x-6">
              <a className="bg-white border-teal-500 p-3 rounded-full text-gray-800 w-48 border-2 shadow text-center hover:bg-gray-50 transition-colors duration-200"
                href={`tel:+91${mobile}`}>
                <FaPhone className="inline-block mr-2" />
                Call Now
              </a>

              <a className="bg-green-600 p-3 rounded-full text-white w-48 border-green-700 border-2 shadow text-center hover:bg-green-700 transition-colors duration-200"
                href={`https://wa.me/+91${whatsapp}`} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="inline-block mr-2" />
                Whats App
              </a>
            </div>
          </div>
        </section>

        {/* Rates Section */}
        <section id="pricing" className="w-full h-auto pt-4 p-4 bg-white"> {/* Changed background */}
          <div className="text-center my-4">
            <h2 className="text-4xl font-bold text-gray-800">
              Game<span className="text-teal-600"> Rates</span>
            </h2>
            <p className="separator text-gray-600">We have Best Game Rates for you</p>
            <br /><br />

            <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2">
              {gameRatesArray.map((m, i) => (
                <div key={i} className="flex items-center justify-between border-l-[5px] border-l-teal-500 px-[.3cm] py-[.25cm] bg-gray-50 rounded-[5px]"> {/* Changed background and border color */}
                  <div className="w-fit flex items-center gap-[.2cm]">
                    <FaHandPointRight size={20} className="text-teal-600" />
                    <p className="font-bold text-[18px] text-gray-700">{m.rateLabel}</p>
                  </div>
                  <p className="font-bold text-teal-600 text-[18px]">
                    {m.rate} RS KA {m.value} RS
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Available Games Section */}
        <section id="availableGames" className="w-full h-auto pt-4 p-4 bg-white"> {/* Changed background */}
          <div className="text-center my-4">
            <h2 className="text-4xl font-bold text-gray-800">
              Available<span className="text-teal-600"> Games</span>
            </h2>
            <p className="separator text-gray-600">We have multiple types of games for you</p>
          </div>

          <div className="md:grid md:grid-cols-2 md:gap-4" id="available-game-row">
            {games.map((game, index) => (
              <div key={index} className="bg-gray-50 rounded-r-lg grid grid-cols-2 pt-2 h-36 text-lg md:text-lg shadow border-l-4 border-l-teal-500 my-2 px-2 text-gray-700"> {/* Changed background, border, and text color */}
                <div className="mt-4 text-center">
                  <h3><strong>{game.name}</strong></h3>
                  <h2 className="text-teal-600">
                    <strong>{getResultStringForGame(game.name)} </strong>
                  </h2>
                  <div>
                    <a className="text-teal-600 viewChartFont hover:underline" href={`/jodi-chart/${game.name}`}>
                      {game.jodiChart ? "Jodi chart" : "View Chart"}
                    </a>
                    {game.pannaChart && (
                      <>
                        <span className="text-gray-500"> | </span>
                        <a className="text-teal-600 viewChartFont hover:underline" href={`/panna-chart/${game.name}`}>
                          Panna Chart
                        </a>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-right pr-4 flex flex-col items-end ">
                  <a href={DEFAULT_DOWNLOAD_URL} className="mr-2 "> {/* Using the constant for download URL */}
                    <FaPlayCircle size={60} className="text-teal-600 text-2xl shadow rounded-full shadow-teal-500 shadow-lg" />
                  </a>
                  <h5 className="mt-2 text-base font-bold text-gray-800">Play Now</h5>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Hero;
