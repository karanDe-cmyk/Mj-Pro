import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiInstance from '../utils/axios';
import moment from 'moment';
import { FaArrowLeft, FaArrowUp, FaChartLine } from 'react-icons/fa';

const JodiChart = () => {
  const { gameName } = useParams();
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const selectedGameName = gameName || "";

  useEffect(() => {
    async function fetchGameResults() {
      try {
        const response = await apiInstance.get("/api/mainmarketdeclareResult/DeclareResult");
        const results = response.data.results || [];

        const filteredResults = results.filter(
          (item) =>
            item.gameName.trim().toLowerCase() === selectedGameName.trim().toLowerCase()
        );

        const groupedData = {};
        filteredResults.forEach((item) => {
          const date = item.date;
          if (!groupedData[date]) {
            groupedData[date] = { date, open: null, close: null, jodi: "**" };
          }
          if (item.gameType.toLowerCase() === "open") {
            groupedData[date].open = `${item.panna}`;
          }
          if (item.gameType.toLowerCase() === "close") {
            groupedData[date].close = `${item.panna}`;
          }
        });

        Object.keys(groupedData).forEach((date) => {
          const openPanna = groupedData[date].open;
          const closePanna = groupedData[date].close;
          if (openPanna && closePanna) {
            const openSum = openPanna.split("").reduce((acc, num) => acc + parseInt(num), 0);
            const closeSum = closePanna.split("").reduce((acc, num) => acc + parseInt(num), 0);
            groupedData[date].jodi = `${openSum % 10}${closeSum % 10}`;
          } else if (openPanna) {
            const openSum = openPanna.split("").reduce((acc, num) => acc + parseInt(num), 0);
            groupedData[date].jodi = `${openSum % 10}*`;
            groupedData[date].close = groupedData[date].close || "***";
          } else if (closePanna) {
            const closeSum = closePanna.split("").reduce((acc, num) => acc + parseInt(num), 0);
            groupedData[date].jodi = `*${closeSum % 10}`;
            groupedData[date].open = groupedData[date].open || "***";
          } else {
            groupedData[date].open = "***";
            groupedData[date].close = "***";
            groupedData[date].jodi = "**";
          }
        });

        const finalData = Object.values(groupedData).sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setDataSource(finalData);
      } catch (error) {
        console.error("Error fetching results:", error);
        setError("Failed to load chart data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchGameResults();
  }, [selectedGameName]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#18D9D9] mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading chart data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Error Loading Data</h2>
          <p className="text-gray-300">{error}</p>
          <button
            onClick={handleBack}
            className="mt-6 bg-gradient-to-r from-[#F21BB9] to-[#BF046B] px-6 py-3 rounded-lg text-white font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <FaArrowLeft className="inline mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen pt-20 pb-10 px-4 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#18D9D9] rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#F21BB9] rounded-full"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-[#D99962] rounded-full"></div>
      </div>
      
      <div className="relative max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <FaChartLine className="text-[#18D9D9] text-3xl mr-3" />
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#F21BB9] to-[#18D9D9] bg-clip-text text-transparent">
              {selectedGameName} <span className="text-white">Jodi Chart</span>
            </h1>
          </div>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            Historical Data and Results for {selectedGameName} Jodi - Track patterns and make informed decisions
          </p>
        </div>

        {/* Chart Table */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl shadow-2xl overflow-hidden border border-gray-600">
          <table className="w-full text-center">
            <thead>
              <tr className="bg-gradient-to-r from-[#8C162C] to-[#BF046B]">
                <th className="border-r border-gray-600 px-4 py-4 sm:px-6 sm:py-4 text-sm sm:text-base font-semibold">
                  Date
                </th>
                <th className="px-4 py-4 sm:px-6 sm:py-4 text-sm sm:text-base font-semibold">
                  Jodi Result
                </th>
              </tr>
            </thead>
            <tbody>
              {dataSource.length > 0 ? (
                dataSource.map((d, index) => (
                  <tr 
                    key={index} 
                    className={`border-t border-gray-600 transition-all duration-300 hover:bg-gray-700 ${
                      index % 2 === 0 ? 'bg-gray-800 bg-opacity-50' : 'bg-gray-900 bg-opacity-30'
                    }`}
                  >
                    <td className="border-r border-gray-600 px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base font-medium">
                      {moment(d.date).format('DD MMM YYYY')}
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                      <span className="bg-gradient-to-r from-[#18D9D9] to-[#D99962] text-gray-900 font-bold text-lg sm:text-xl px-4 py-2 rounded-lg inline-block min-w-[60px] shadow-lg">
                        {d.jodi}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="py-8 text-gray-400 text-center">
                    <div className="flex flex-col items-center">
                      <div className="text-4xl mb-2">📊</div>
                      <p className="text-lg">No data available for this game.</p>
                      <p className="text-sm mt-1">Check back later for updated results.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Statistics Summary */}
        {dataSource.length > 0 && (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-4 text-center border border-gray-600">
              <p className="text-gray-400 text-sm">Total Records</p>
              <p className="text-2xl font-bold text-[#18D9D9]">{dataSource.length}</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-4 text-center border border-gray-600">
              <p className="text-gray-400 text-sm">Latest Date</p>
              <p className="text-lg font-bold text-[#D99962]">
                {dataSource[0]?.date ? moment(dataSource[0].date).format('DD MMM') : 'N/A'}
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-4 text-center border border-gray-600">
              <p className="text-gray-400 text-sm">Latest Jodi</p>
              <p className="text-xl font-bold text-[#F21BB9]">{dataSource[0]?.jodi || '**'}</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-4 text-center border border-gray-600">
              <p className="text-gray-400 text-sm">Data Range</p>
              <p className="text-sm font-bold text-white">
                {dataSource.length > 1 ? 
                  `${moment(dataSource[dataSource.length-1].date).format('DD MMM')} - ${moment(dataSource[0].date).format('DD MMM')}` 
                  : 'Single Day'
                }
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-center flex-wrap">
          <button
            onClick={handleBack}
            className="flex items-center bg-gradient-to-r from-[#F21BB9] to-[#BF046B] px-6 py-3 rounded-xl text-white font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 border border-[#F21BB9]"
          >
            <FaArrowLeft className="mr-2" />
            Back to Previous
          </button>
          <button
            onClick={scrollToTop}
            className="flex items-center bg-gradient-to-r from-[#18D9D9] to-[#D99962] px-6 py-3 rounded-xl text-gray-900 font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 border border-[#18D9D9]"
          >
            <FaArrowUp className="mr-2" />
            Scroll to Top
          </button>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-6 border border-gray-600">
          <h3 className="text-lg font-semibold text-[#18D9D9] mb-3">About Jodi Chart</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            The Jodi Chart displays the combined result of Open and Close Panna numbers. 
            Each Jodi represents a unique combination derived from the day's results, 
            helping you analyze patterns and trends for better predictions in future games.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JodiChart;