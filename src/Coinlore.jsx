import React, { useState, useEffect } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Loading from "./Loading";

const Coinlore = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Fetching from the API
    fetch("https://api.coinlore.net/api/tickers/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCoins(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;
  if (error)
    return (
      <p className="font-bold flex justify-center items-center h-screen">
        😟 Sorry, no coins to fetch
      </p>
    );

  //   Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = coins.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(coins.length / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  //   Rendered Page
  return (
    <>
      <div className="grid place-content-center container mx-auto my-8">
        {/* DESKTOP */}
        <table className="rounded-md shadow-xl hidden lg:block min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="font-bold py-3 ">💰Coin</th>
              <th className="font-bold py-3">📄Code</th>
              <th className="font-bold py-3">🤑Price</th>
              <th className="font-bold py-3 ">📉Total Supply</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((item) => (
              <tr
                key={item.id}
                className="odd:bg-gray-300 border-b border-gray-200"
              >
                <td className="font-medium px-6 py-4">{item.name}</td>
                <td className="font-medium px-6 py-4">{item.symbol}</td>
                <td className="font-medium px-6 py-4">${item.price_usd}</td>
                <td className="font-medium px-6 py-4">
                  {item.tsupply} {item.symbol}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* MOBILE */}
        <div className="block lg:hidden text-sm ">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="border-b border-gray-200 grid grid-cols-2 odd:bg-gray-300"
            >
              <div>
                <div className="flex flex-col">
                  <div className="px-6 py-2 text-left font-bold">💰Coin</div>

                  <div className="px-6 py-2 font-medium">{item.name}</div>
                </div>
                <div className="flex flex-col">
                  <div className="px-6 py-2 font-bold">🤑 Price</div>

                  <div className="px-6 py-2 font-medium">${item.price_usd}</div>
                </div>
              </div>

              <div>
                <div className="flex flex-col">
                  <div className="px-6 py-2 font-bold">📄 Code</div>

                  <div className="px-6 py-2 font-medium">{item.symbol}</div>
                </div>
                <div className="flex flex-col">
                  <div className="px-6 py-2 font-bold">📉Total Supply</div>
                  <div className="px-6 py-2 font-medium">
                    {item.tsupply} {item.symbol}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between">
          {/* Previous Button */}
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="px-4 my-2 hover:border hover:border-yellow-400 focus:border-green-300 disabled:opacity-0 flex items-center gap-2"
          >
            <span>
              <FaLongArrowAltLeft />
            </span>
            Previous
          </button>

          {/* Next Button */}
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-4 my-2 hover:border hover:border-yellow-400 focus:border-green-300 disabled:opacity-0 flex items-center gap-2"
          >
            Next
            <span>
              <FaLongArrowAltRight />
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Coinlore;
