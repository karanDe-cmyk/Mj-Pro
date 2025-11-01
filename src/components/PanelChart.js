import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiInstance from '../utils/axios';
import moment from 'moment';
import { FaArrowLeft, FaArrowUp, FaChartBar, FaHistory } from 'react-icons/fa';

const PannaChart = () => {
  const { gameNamePanna } = useParams();
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const selectedGameName = gameNamePanna || "";

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
          <p className="text-white text-lg">Loading Panna chart data...</p>
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
        <div className="absolute top-20 right-10 w-24 h-24 bg-[#18D9D9] rounded-full"></div>
        <div className="absolute bottom-20 left-10 w-28 h-28 bg-[#F21BB9] rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-[#D99962] rounded-full"></div>
      </div>
      
      <div className="relative max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <FaChartBar className="text-[#D99962] text-3xl mr-3" />
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#D99962] to-[#18D9D9] bg-clip-text text-transparent">
              {selectedGameName} <span className="text-white">Panna Chart</span>
            </h1>
          </div>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            Complete Historical Data with Open, Close, and Jodi results for {selectedGameName}
          </p>
        </div>

        {/* Chart Table */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl shadow-2xl overflow-hidden border border-gray-600">
          <table className="w-full text-center">
            <thead>
              <tr className="bg-gradient-to-r from-[#8C162C] to-[#BF046B]">
                <th className="border-r border-gray-600 px-4 py-4 text-sm sm:text-base font-semibold">
                  <div className="flex items-center justify-center">
                    <FaHistory className="mr-2" />
                    Date
                  </div>
                </th>
                <th className="border-r border-gray-600 px-4 py-4 text-sm sm:text-base font-semibold">
                  Open Panna
                </th>
                <th className="border-r border-gray-600 px-4 py-4 text-sm sm:text-base font-semibold">
                  Jodi Result
                </th>
                <th className="px-4 py-4 text-sm sm:text-base font-semibold">
                  Close Panna
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
                    <td className="border-r border-gray-600 px-4 py-4 text-sm sm:text-base font-medium">
                      {moment(d.date).format('DD MMM YYYY')}
                    </td>
                    <td className="border-r border-gray-600 px-4 py-4">
                      <span className="bg-gradient-to-r from-[#18D9D9] to-[#8C162C] text-white font-bold text-base sm:text-lg px-3 py-2 rounded-lg inline-block min-w-[70px] shadow-lg">
                        {d.open}
                      </span>
                    </td>
                    <td className="border-r border-gray-600 px-4 py-4">
                      <span className="bg-gradient-to-r from-[#F21BB9] to-[#D99962] text-gray-900 font-bold text-lg sm:text-xl px-4 py-2 rounded-lg inline-block min-w-[60px] shadow-lg">
                        {d.jodi}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="bg-gradient-to-r from-[#18D9D9] to-[#8C162C] text-white font-bold text-base sm:text-lg px-3 py-2 rounded-lg inline-block min-w-[70px] shadow-lg">
                        {d.close}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-12 text-gray-400 text-center">
                    <div className="flex flex-col items-center">
                      <div className="text-5xl mb-4">📈</div>
                      <p className="text-xl mb-2">No Panna data available</p>
                      <p className="text-sm">Check back later for updated results</p>
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
              <p className="text-gray-400 text-sm">Data Period</p>
              <p className="text-sm font-bold text-[#D99962]">
                {dataSource.length > 1 ? 
                  `${moment(dataSource[dataSource.length-1].date).format('DD MMM')} - ${moment(dataSource[0].date).format('DD MMM')}` 
                  : 'Single Day'
                }
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-4 text-center border border-gray-600">
              <p className="text-gray-400 text-sm">Latest Open</p>
              <p className="text-lg font-bold text-white">{dataSource[0]?.open || '***'}</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-4 text-center border border-gray-600">
              <p className="text-gray-400 text-sm">Latest Close</p>
              <p className="text-lg font-bold text-white">{dataSource[0]?.close || '***'}</p>
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
          <h3 className="text-lg font-semibold text-[#D99962] mb-3 flex items-center">
            <FaChartBar className="mr-2" />
            About Panna Chart
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm leading-relaxed">
            <div>
              <h4 className="font-semibold text-[#18D9D9] mb-2">Open Panna</h4>
              <p className="text-gray-300">
                The opening result displayed for each day's game session. 
                This is the first declared result that sets the trend for the day.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[#F21BB9] mb-2">Close Panna</h4>
              <p className="text-gray-300">
                The closing result that concludes the day's game session. 
                Combined with the open, it forms the complete daily result pattern.
              </p>
            </div>
            <div className="md:col-span-2">
              <h4 className="font-semibold text-[#D99962] mb-2">Jodi Calculation</h4>
              <p className="text-gray-300">
                Jodi is derived from the sum of digits in Open and Close Panna. 
                It represents the final combined result used for analysis and pattern recognition.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PannaChart;