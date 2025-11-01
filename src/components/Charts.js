import React, { useEffect, useState } from 'react';
import apiInstance from '../utils/axios';
import { Link } from 'react-router-dom';
import { FaChartLine, FaChartBar, FaStar, FaDice, FaArrowRight } from 'react-icons/fa';

const Charts = () => {
  const [chartSections, setChartSections] = useState([
    { 
      title: "STARLINE CHARTS", 
      charts: [], 
      icon: FaStar,
      gradient: "from-[#18D9D9] to-[#8C162C]",
      bgGradient: "from-[#8C162C] to-[#BF046B]"
    },
    { 
      title: "JACKPOT CHARTS", 
      charts: [], 
      icon: FaDice,
      gradient: "from-[#F21BB9] to-[#D99962]",
      bgGradient: "from-[#BF046B] to-[#F21BB9]"
    },
    { 
      title: "PANNA CHARTS", 
      charts: [], 
      icon: FaChartBar,
      gradient: "from-[#D99962] to-[#18D9D9]",
      bgGradient: "from-[#F21BB9] to-[#18D9D9]"
    },
    { 
      title: "JODI CHARTS", 
      charts: [], 
      icon: FaChartLine,
      gradient: "from-[#18D9D9] to-[#F21BB9]",
      bgGradient: "from-[#18D9D9] to-[#D99962]"
    },
  ]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await apiInstance.get("/api/marketManagement/getMarketGames");
        const starlineResponse = await apiInstance.get('/api/starline/getGameListWeb');
        const jackpotChartsResponse = await apiInstance.get('/api/GaliDisawar/getAllMarketWeb');

        const data = response.data;

        const pannaCharts = data.map((sa) => ({
          name: sa.gameName,
          link: `/panna-chart/${sa.gameName}`,
        }));

        const jodiCharts = data.map((sa) => ({
          name: sa.gameName,
          link: `/jodi-chart/${sa.gameName}`,
        }));

        const starlineCharts = starlineResponse.data.data.map((sa) => ({
          name: sa.game_name,
          link: `/starline-chart/${sa.game_name}`,
        }));

        const jackpotCharts = jackpotChartsResponse.data.data.map((sa) => ({
          name: sa.game_name,
          link: `/jackpot-chart/${sa.game_name}`,
        }));

        setChartSections([
          { 
            title: "STARLINE CHARTS", 
            charts: starlineCharts, 
            icon: FaStar,
            gradient: "from-[#18D9D9] to-[#8C162C]",
            bgGradient: "from-[#8C162C] to-[#BF046B]"
          },
          { 
            title: "JACKPOT CHARTS", 
            charts: jackpotCharts, 
            icon: FaDice,
            gradient: "from-[#F21BB9] to-[#D99962]",
            bgGradient: "from-[#BF046B] to-[#F21BB9]"
          },
          { 
            title: "PANNA CHARTS", 
            charts: pannaCharts, 
            icon: FaChartBar,
            gradient: "from-[#D99962] to-[#18D9D9]",
            bgGradient: "from-[#F21BB9] to-[#18D9D9]"
          },
          { 
            title: "JODI CHARTS", 
            charts: jodiCharts, 
            icon: FaChartLine,
            gradient: "from-[#18D9D9] to-[#F21BB9]",
            bgGradient: "from-[#18D9D9] to-[#D99962]"
          },
        ]);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen pt-24 pb-10 px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-24 h-24 bg-[#18D9D9] rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-[#F21BB9] rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-[#D99962] rounded-full"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#F21BB9] via-[#18D9D9] to-[#D99962] bg-clip-text text-transparent mb-4">
            Game Charts & Analytics
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Explore comprehensive charts and historical data for all game types. 
            Analyze patterns and make informed decisions.
          </p>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {chartSections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <div 
                key={index} 
                className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl shadow-2xl overflow-hidden border border-gray-600 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Section Header */}
                <div className={`bg-gradient-to-r ${section.bgGradient} p-6`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-black bg-opacity-20 rounded-lg">
                        <IconComponent className="text-white text-xl" />
                      </div>
                      <h2 className="text-xl font-bold text-white">
                        {section.title}
                      </h2>
                    </div>
                    <div className="text-white text-sm font-semibold bg-black bg-opacity-20 px-3 py-1 rounded-full">
                      {section.charts.length} Charts
                    </div>
                  </div>
                </div>

                {/* Charts List */}
                <div className="p-6">
                  <div className="grid gap-3">
                    {section.charts.length > 0 ? (
                      section.charts.map((chart, chartIndex) => (
                        <Link 
                          key={chartIndex} 
                          to={chart.link}
                          className="group"
                        >
                          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl border border-gray-600 hover:border-[#18D9D9] transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg">
                            <div className="flex items-center space-x-3">
                              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${section.gradient}`}></div>
                              <span className="text-white font-medium group-hover:text-[#18D9D9] transition-colors duration-300">
                                {chart.name}
                              </span>
                            </div>
                            <FaArrowRight className="text-gray-400 group-hover:text-[#18D9D9] group-hover:translate-x-1 transition-all duration-300" />
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-4xl mb-3">📊</div>
                        <p className="text-gray-400">No charts available</p>
                        <p className="text-gray-500 text-sm mt-1">Check back later for updates</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Section Footer */}
                <div className="px-6 pb-4">
                  <div className="border-t border-gray-600 pt-4">
                    <p className="text-gray-400 text-sm text-center">
                      Click on any chart to view detailed analytics
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-8 border border-gray-600">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-[#18D9D9] to-[#8C162C] rounded-full flex items-center justify-center mb-3">
                <FaChartLine className="text-white text-xl" />
              </div>
              <h3 className="text-white font-semibold mb-2">Real-time Data</h3>
              <p className="text-gray-300 text-sm">
                Live updates with the latest game results and statistics
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-[#F21BB9] to-[#D99962] rounded-full flex items-center justify-center mb-3">
                <FaChartBar className="text-white text-xl" />
              </div>
              <h3 className="text-white font-semibold mb-2">Pattern Analysis</h3>
              <p className="text-gray-300 text-sm">
                Identify trends and patterns for better predictions
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-[#D99962] to-[#18D9D9] rounded-full flex items-center justify-center mb-3">
                <FaStar className="text-white text-xl" />
              </div>
              <h3 className="text-white font-semibold mb-2">Multiple Formats</h3>
              <p className="text-gray-300 text-sm">
                Various chart types for comprehensive data visualization
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;