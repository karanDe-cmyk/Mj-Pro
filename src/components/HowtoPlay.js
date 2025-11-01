import React, { useState, useEffect } from 'react';
import { FaPlay, FaMoneyBillWave, FaTrophy, FaChartLine, FaHistory, FaGraduationCap, FaDice, FaWallet, FaClock, FaMobile } from 'react-icons/fa';
import apiInstance from "../utils/axios";

const HowToPlay = () => {
  // Data for the sections to avoid repetition
  const [whatsapp, setWhatsapp] = useState("");
  const [mobile, setMobile] = useState("");

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

  const sections = [
    {
      title: "About the Game",
      icon: FaDice,
      gradient: "from-[#F21BB9] to-[#BF046B]",
      content: (
        <>
          <p className="mb-4 text-gray-300 leading-relaxed">
            Satta is a broad word to describe <i className="text-[#18D9D9]">"betting"</i> in India or Hindi. The Matka game is sometimes referred to as Indian Satta Matka because of its early popularity. If you are interested in betting games, you can check out the numbers game. The game of online satta matka is pretty simple to understand and play. With a very little study and effort you can become online matka play king and earn huge amount. The kalyan matka game which is the online matka play market was the first online matka market introduced by Kalyanji Bhagat in 1962 and the online matka Waroli market was introduced back in 70's by Ratan Khatri.
          </p>

          <div className="bg-gradient-to-r from-[#18D9D9] to-[#8C162C] rounded-xl p-4 mb-6">
            <p className="font-bold text-white text-lg text-center">
              This is how you play matka on Madhur567:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-gray-700 to-gray-600 rounded-xl p-4 border border-gray-500">
              <div className="w-12 h-12 bg-gradient-to-r from-[#F21BB9] to-[#BF046B] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">1</span>
              </div>
              <p className="text-gray-300 text-sm text-center">
                Pick (3) numbers from 0–9. For example 5,3,6. Add them (5+3+6=14) and keep the last digit (4). Your first draw: 5,3,6 *4
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-700 to-gray-600 rounded-xl p-4 border border-gray-500">
              <div className="w-12 h-12 bg-gradient-to-r from-[#18D9D9] to-[#8C162C] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">2</span>
              </div>
              <p className="text-gray-300 text-sm text-center">
                Repeat the same process for second set. Example: 8,2,8 gives sum 18, keep last digit 8. Second draw: 8,2,8 *8
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-700 to-gray-600 rounded-xl p-4 border border-gray-500">
              <div className="w-12 h-12 bg-gradient-to-r from-[#D99962] to-[#18D9D9] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">3</span>
              </div>
              <p className="text-gray-300 text-sm text-center">
                Final card: 5,3,6 *4 X 8,2,8 *8. This is your complete betting card for the game.
              </p>
            </div>
          </div>
        </>
      )
    },
    {
      title: "How to add money in Madhur567?",
      icon: FaWallet,
      gradient: "from-[#18D9D9] to-[#D99962]",
      content: (
        <>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-3">
              <div className="flex items-center bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg p-3 border border-gray-500">
                <FaMoneyBillWave className="text-[#18D9D9] mr-3" />
                <span className="text-white">Minimum Deposit: 100 Rs</span>
              </div>
              <div className="flex items-center bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg p-3 border border-gray-500">
                <FaMoneyBillWave className="text-[#F21BB9] mr-3" />
                <span className="text-white">Minimum Withdraw: 1000 Rs</span>
              </div>
              <div className="flex items-center bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg p-3 border border-gray-500">
                <FaTrophy className="text-[#D99962] mr-3" />
                <span className="text-white">Max Withdraw: 25 Lakh/Day</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg p-3 border border-gray-500">
                <FaClock className="text-[#18D9D9] mr-3" />
                <span className="text-white">Withdrawal Time: 11 AM - 11 PM</span>
              </div>
              <div className="flex items-center bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg p-3 border border-gray-500">
                <FaMobile className="text-[#F21BB9] mr-3" />
                <span className="text-white">7 Days Service</span>
              </div>
              <div className="flex items-center bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg p-3 border border-gray-500">
                <span className="w-3 h-3 bg-[#D99962] rounded-full mr-3"></span>
                <span className="text-white">1 Point = 1 Rs</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#BF046B] to-[#F21BB9] rounded-xl p-4 mb-4">
            <p className="text-white text-center font-semibold">
              The game you played and got lucky enough to win it then accordingly your points will be increased.
              If you wish to encash the points, just apply for withdrawal request on our Madhur567 Mobile App.
            </p>
          </div>

          <div className="text-center">
            <p className="text-gray-300 mb-2">
              In case of any inconvenience regarding transactions
            </p>
            <a
              href={`https://wa.me/+91${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-[#18D9D9] to-[#D99962] px-6 py-3 rounded-lg text-gray-900 font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <FaMobile className="mr-2" />
              WhatsApp: +91 {whatsapp}
            </a>
          </div>
        </>
      )
    },
    {
      title: "Satta Matka Guide – How To Play & Win Money?",
      icon: FaGraduationCap,
      gradient: "from-[#D99962] to-[#18D9D9]",
      content: "Satta is a broad word to describe 'betting' in India or Hindi. The Matka game is sometimes referred to as Indian Satta Matka because of its early popularity. If you are interested in betting games, you can check out the numbers game at KingMatka.com"
    },
    {
      title: "WHAT IS SATTA BAZAR?",
      icon: FaChartLine,
      gradient: "from-[#8C162C] to-[#BF046B]",
      content: "Satta bazar is a highly local Indian term that means betting market. Indians love to bet on a number of things. They enjoy taking part in this activity and are therefore always willing to spend a significant amount of money in the game of Satta. Famous Form Of Satta Matka is both a lottery and a number-based game, and you have to pick a number to actually play the game and check for the turn and see whether or not your number has reached the ensuing place. Satta Matka is a form of gambling or lottery that came into India before the country got independent."
    },
    {
      title: "WHAT IS MATKA SATTA?",
      icon: FaDice,
      gradient: "from-[#F21BB9] to-[#D99962]",
      content: "Matka satta is one of the well-liked forms of betting in India. In matka satta, slips are pulled from a large earthenware pot known as matka. Sometimes, the winner is declared after dealing with the playing card. The lead person who runs the syndicate of matka gambling is known as a 'Matka King'. Kalyan and Worli are two of the most popular Matka Games."
    },
    {
      title: "WHERE TO GO FOR SATTA MATKA ONLINE FOR REAL MONEY",
      icon: FaMoneyBillWave,
      gradient: "from-[#18D9D9] to-[#8C162C]",
      content: (
        <>
          <p className="text-gray-300 mb-4">
            Satta is not currently legal in India, but it is still big business. Lotteries have become more attractive online because they combine all lotteries on an international level, so those from India can leverage their bets by only picking lottery cards where the jackpot is the biggest.
          </p>

          <div className="bg-gradient-to-r from-[#D99962] to-[#18D9D9] rounded-xl p-4 mb-4">
            <h4 className="text-gray-900 font-bold text-lg text-center mb-2">Pick Numbers Process</h4>
            <div className="grid gap-2 text-sm">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-[#8C162C] rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-xs">1</span>
                </div>
                <span className="text-gray-900">You pick (3) three numbers from 0 – 9</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-[#BF046B] rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-xs">2</span>
                </div>
                <span className="text-gray-900">Add numbers and keep last digit</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-[#F21BB9] rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-xs">3</span>
                </div>
                <span className="text-gray-900">Repeat for second set of numbers</span>
              </div>
            </div>
          </div>
        </>
      )
    },
    {
      title: "How Do You Win At Matka?",
      icon: FaTrophy,
      gradient: "from-[#BF046B] to-[#F21BB9]",
      content: "To win at Matka Satta, you have various rate payouts, ranging from 9/1 to 999/1. You can bet on the chance of all numbers coming up to the first, last, or any other type of bet allowed by the Matka gambling bookie. For this reason, it can be an attractive game because of the payout multiples, but the game is merely a game of chance and therefore can not be beaten. It requires luck to win, but many are superstitious about their numbers and always play them, just like the lottery games."
    },
    {
      title: "SATTA MATKA FEES & ODDS",
      icon: FaChartLine,
      gradient: "from-[#D99962] to-[#18D9D9]",
      content: (
        <>
          <p className="text-gray-300 mb-4">
            The Satta betting agent should only take a maximum of 5% of your wager amount assuming you win. Because the game is all luck and neither the agent nor the bettor has an advantage, the bookie should take home 5% on every Rupee wagered.
          </p>

          <div className="bg-gradient-to-br from-gray-700 to-gray-600 rounded-xl p-4 mb-4">
            <h4 className="text-[#18D9D9] font-bold mb-3">Example Of A 10 Rupees Bet:</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Correct first number:</span>
                <span className="text-[#F21BB9] font-bold">90 Rs</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Correct second number:</span>
                <span className="text-[#F21BB9] font-bold">90 Rs</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Jodi combination:</span>
                <span className="text-[#F21BB9] font-bold">900 Rs</span>
              </div>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-[#F21BB9] to-[#BF046B] py-3 rounded-lg text-white font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            Play Live Lottery Games Today!
          </button>
        </>
      )
    },
    {
      title: "HISTORY OF SATTA MATKA",
      icon: FaHistory,
      gradient: "from-[#8C162C] to-[#BF046B]",
      content: "The origins of Indian Matka gambling involve wagering on the daily price of cotton according to the Bombay and the New York Cotton Exchange. Nowadays, Matka betting, or Satta King, is a popular lottery-style game. It involves the selection of random numbers in the hopes of hitting the right number combination. The winner becomes the Satta King and they earn the bulk of the prize pool. The legendary Ratan Khatri is popularly known as the Matka King. After his arrest in 1995, he had to discontinue his games and now crooks are running the game he loved so much by fixing the numbers. A big fall from grace, but his name remains legendary among Satta Matka games in Mumbai."
    },
    {
      title: "CONCLUSION ON SATTA MATKA",
      icon: FaGraduationCap,
      gradient: "from-[#18D9D9] to-[#D99962]",
      content: "Big-time enthusiasts still play this game and they remember the days of Ratan having celebrities pull draws for him. The game has since lost most of its following. Indians have chosen the faster-paced action of online cricket betting or live dealer casinos on their mobile devices. IPL betting draws people like nothing else in India and fans wait eagerly to place bets on the event."
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen pt-24 pb-16 px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-24 h-24 bg-[#18D9D9] rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-[#F21BB9] rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-[#D99962] rounded-full"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <FaPlay className="text-5xl text-[#18D9D9] mr-4" />
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#F21BB9] via-[#18D9D9] to-[#D99962] bg-clip-text text-transparent">
              How to Play
            </h1>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-[#18D9D9] to-[#F21BB9] mx-auto rounded-full"></div>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Learn everything about Satta Matka - from basic rules to advanced strategies. Start your journey to become a Matka King!
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl shadow-2xl border border-gray-600 overflow-hidden hover:shadow-3xl transition-all duration-300"
              >
                {/* Section Header */}
                <div className={`bg-gradient-to-r ${section.gradient} p-6`}>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-black bg-opacity-20 rounded-xl">
                      <IconComponent className="text-white text-2xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      {section.title}
                    </h2>
                  </div>
                </div>

                {/* Section Content */}
                <div className="p-6 text-white">
                  {section.content}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Start CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-[#8C162C] to-[#BF046B] rounded-2xl p-8 border border-[#F21BB9]">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Playing?</h3>
            <p className="text-gray-200 mb-6">
              Join thousands of players who are already enjoying the thrill of Satta Matka
            </p>
            <button className="bg-gradient-to-r from-[#18D9D9] to-[#D99962] px-8 py-4 rounded-lg text-gray-900 font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              Start Playing Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;