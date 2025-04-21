import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import apiInstance from '../utils/axios';

const StarlineChart = () => {
    const { starlineGame } = useParams();
    const navigate = useNavigate();
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const selectedGameName = starlineGame || "";
    console.log(selectedGameName)

    useEffect(() => {
        async function fetchGameResults() {
            try {
                const res = await apiInstance.get("/api/starlinebid/getDeclareResultWeb");
                const gameResults = res.data.results;

                const finalData = gameResults?.filter(g => g.market === selectedGameName);
                setDataSource(finalData || []);
            } catch (error) {
                console.error("Error fetching results:", error);
                setError("Something went wrong.");
            } finally {
                setLoading(false);
            }
        }

        fetchGameResults();
    }, [selectedGameName]);


    console.log(dataSource)

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (loading) return <div className="text-center py-10">Loading chart data...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

    return (
        <div className="divTable mt-50 px-4">
            <div className="gameNameChart text-lg sm:text-xl font-bold mb-2 text-center">
                {selectedGameName} Starline Chart
            </div>
            <div className="gameNameDesc text-sm mb-4 text-gray-600 text-center">
                {selectedGameName} Starline Chart - Historical Data and Results
            </div>

            <div className="overflow-x-auto">
                <table className="table-auto w-full text-center border border-gray-300 text-xs sm:text-sm">
                    <thead className="bg-orange text-white">
                        <tr>
                            <th className="border px-2 py-1">Date</th>


                            <th className="border px-2 py-1">Panna</th>
                            <th className="border px-2 py-1">Digit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataSource.map((d, index) => (
                            <tr key={index} className="border-t">
                                <td className="border px-2 py-1">{d.date}</td>

                                <td className="border px-2 py-1">{d.panna}</td>
                                <td className="border px-2 py-1">{d.digit}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="divBottomButtons mt-6 flex gap-4 justify-center flex-wrap">
                <button
                    onClick={handleBack}
                    className="text-sm md:text-base px-4 py-2 shadow font-medium bg-orange border-orange text-white rounded-lg"
                >
                    Back
                </button>
                <button
                    onClick={scrollToTop}
                    className="text-sm md:text-base px-4 py-2 shadow font-medium bg-orange border-orange text-white rounded-lg"
                >
                    Go to Top
                </button>
            </div>
        </div>
    );
};

export default StarlineChart;
