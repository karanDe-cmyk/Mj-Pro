import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiInstance from '../utils/axios'; // Assuming this path is correct
// import moment from 'moment'; // Ensure moment is installed if used

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

  if (loading) return <div className="text-center py-10 text-gray-700">Loading chart data...</div>;
  if (error) return <div className="text-center py-10 text-red-600">Error: {error}</div>;

  return (
    <div className="bg-gray-50 min-h-screen pt-20 pb-10 px-4 text-gray-800"> {/* Main container for light theme */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-center text-blue-700">
          {selectedGameName} <span className="text-gray-800">Jodi Chart</span>
        </h1>
        <p className="text-sm mb-6 text-gray-600 text-center">
          Historical Data and Results for {selectedGameName} Jodi
        </p>

        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
          <table className="table-auto w-full text-center text-xs sm:text-sm">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="border-r border-blue-600 px-3 py-2 sm:px-4 sm:py-2">Date</th>
                <th className="px-3 py-2 sm:px-4 sm:py-2">Jodi</th>
              </tr>
            </thead>
            <tbody>
              {dataSource.length > 0 ? (
                dataSource.map((d, index) => (
                  <tr key={index} className="border-t border-gray-200 even:bg-gray-100">
                    <td className="border-r border-gray-200 px-3 py-2 sm:px-4 sm:py-2">{d.date}</td>
                    <td className="px-3 py-2 sm:px-4 sm:py-2 text-red-600 font-bold text-base sm:text-lg">{d.jodi}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="py-4 text-gray-500">No data available for this game.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex gap-4 justify-center flex-wrap">
          <button
            onClick={handleBack}
            className="text-sm md:text-base px-6 py-2 shadow font-medium bg-blue-600 border border-blue-700 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Back
          </button>
          <button
            onClick={scrollToTop}
            className="text-sm md:text-base px-6 py-2 shadow font-medium bg-gray-600 border border-gray-700 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            Go to Top
          </button>
        </div>
      </div>
    </div>
  );
};

export default JodiChart;
