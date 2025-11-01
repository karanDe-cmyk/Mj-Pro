import React, { useEffect, useState, useCallback } from "react";
import {
  FaHandPointRight,
  FaPhone,
  FaWhatsapp,
  FaPlayCircle,
} from "react-icons/fa";
import apiInstance from "../utils/axios";
import moment from "moment";

const ANDROID_64_BIT_URL = "https://madhur567.s3.ap-south-1.amazonaws.com/madhur567.apk";
const DEFAULT_DOWNLOAD_URL = ANDROID_64_BIT_URL;

function Hero() {
  const [games, setGames] = useState([]);
  const [charts, setCharts] = useState([]);
  const [declaredResults, setDeclaredResults] = useState([]);
  const today = moment().format("YYYY-MM-DD");
  console.log(charts);
  console.log(games);

  const [whatsapp, setWhatsapp] = useState("");
  const [mobile, setMobile] = useState("");

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
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen">
      {/* WhatsApp Floating Button */}
      <a 
        href={`https://wa.me/+91${whatsapp}`} 
        target="blank" 
        className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-[#BF046B] to-[#F21BB9] p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
      >
        <FaWhatsapp size={26} color="white" />
      </a>

      <div className="flex flex-col items-center pt-20">
        {/* Header Section */}
        <section className="flex flex-col w-full text-center header mt-4">
          <div className="z-10">
            <p className="text-[35px] sm:text-[40px] md:text-[55px] font-bold bg-gradient-to-r from-[#F21BB9] to-[#18D9D9] bg-clip-text text-transparent">
              Welcome to <span className="text-[#BF046B]">Matka</span>
            </p>
            <p className="text-xl md:text-2xl text-gray-300 mt-2">
              Business Of Faith, With Confidence
            </p>
          </div>
        </section>

        {/* Download Button Section */}
        <section id="hero" className="w-full py-12 bg-gradient-to-br from-[#8C162C] to-[#BF046B]">
          <div className="max-w-7xl mx-auto px-4 overflow-hidden sm:px-6 lg:px-8">
            <div className="flex justify-center space-x-6">
              <a 
                href={DEFAULT_DOWNLOAD_URL}
                className="animate-pulse bg-gradient-to-r from-[#18D9D9] to-[#D99962] p-4 rounded-full w-72 text-white font-bold border-2 border-white shadow-2xl mt-3 text-center hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
              >
                <FaHandPointRight className="inline-block text-lg mr-2" />
                Download Now
              </a>
            </div>

            <div className="mt-8 text-center text-base">
              <h3 className="text-2xl font-bold text-white">
                <strong> +91 {whatsapp} </strong>
              </h3>
            </div>

            <div className="mt-6 flex justify-center space-x-6">
              <a 
                className="bg-gradient-to-r from-[#18D9D9] to-[#D99962] p-3 rounded-full text-white w-48 border-2 border-white shadow text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                href={`tel:+91${mobile}`}
              >
                <FaPhone className="inline-block mr-2" />
                Call Now
              </a>

              <a 
                className="bg-gradient-to-r from-[#18D9D9] to-[#D99962] p-3 rounded-full text-white w-48 border-2 border-white shadow text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                href={`https://wa.me/+91${whatsapp}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="inline-block mr-2" />
                Whats App
              </a>
            </div>
          </div>
        </section>

        {/* Rates Section */}
        <section id="pricing" className="w-full py-12 px-4 bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="text-center my-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#F21BB9] to-[#18D9D9] bg-clip-text text-transparent">
              Game<span className="text-[#BF046B]"> Rates</span>
            </h2>
            <p className="separator text-gray-300 mt-2">We have Best Game Rates for you</p>
            <br /><br />

            <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto">
              {gameRatesArray.map((m, i) => (
                <div 
                  key={i} 
                  className="flex items-center justify-between border-l-[5px] border-l-[#18D9D9] px-4 py-3 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="w-fit flex items-center gap-3">
                    <FaHandPointRight size={20} className="text-[#F21BB9]" />
                    <p className="font-bold text-[18px] text-white">{m.rateLabel}</p>
                  </div>
                  <p className="font-bold text-[#18D9D9] text-[18px]">
                    {m.rate} RS KA {m.value} RS
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Available Games Section */}
        <section id="availableGames" className="w-full py-12 px-4 bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="text-center my-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#F21BB9] to-[#18D9D9] bg-clip-text text-transparent">
              Available<span className="text-[#BF046B]"> Games</span>
            </h2>
            <p className="separator text-gray-300 mt-2">We have multiple types of games for you</p>
          </div>

          <div className="max-w-6xl mx-auto md:grid md:grid-cols-2 md:gap-6" id="available-game-row">
            {games.map((game, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl grid grid-cols-2 p-4 h-36 text-lg md:text-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-l-[#F21BB9] my-3"
              >
                <div className="mt-2 text-center">
                  <h3 className="font-bold text-white">{game.name}</h3>
                  <h2 className="text-[#18D9D9] font-bold text-lg">
                    {getResultStringForGame(game.name)}
                  </h2>
                  <div className="mt-2">
                    <a 
                      className="text-[#D99962] viewChartFont hover:underline text-sm" 
                      href={`/jodi-chart/${game.name}`}
                    >
                      {game.jodiChart ? "Jodi chart" : "View Chart"}
                    </a>
                    {game.pannaChart && (
                      <>
                        <span className="text-gray-400 mx-1"> | </span>
                        <a 
                          className="text-[#D99962] viewChartFont hover:underline text-sm" 
                          href={`/panna-chart/${game.name}`}
                        >
                          Panna Chart
                        </a>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-right flex flex-col items-end justify-center">
                  <a href={DEFAULT_DOWNLOAD_URL} className="mr-2">
                    <FaPlayCircle 
                      size={60} 
                      className="text-[#18D9D9] rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110" 
                    />
                  </a>
                  <h5 className="mt-2 text-base font-bold text-white">Play Now</h5>
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