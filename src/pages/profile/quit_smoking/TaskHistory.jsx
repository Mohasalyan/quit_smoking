import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { FaTasks } from "react-icons/fa";
import { BsCheckLg } from "react-icons/bs";
import Walk from "../../../assets/Walk.webp";
import Read from "../../../assets/Read.webp";
import Squat from "../../../assets/Squat.webp";
import "../profile.css";

const TaskHistory = () => {
  const loginData = localStorage.getItem("login");
  const [dataHistory, setDataHistory] = useState(null);
  const [displayedData, setDisplayedData] = useState([]);
  const [showMoreButton, setShowMoreButton] = useState(true);
  const [displayedItemCount, setDisplayedItemCount] = useState(2);

  useEffect(() => {
    const localStorageData = JSON.parse(
      localStorage.getItem("tableQuitSmoking")
    );

    if (localStorageData) {
      const filteredItems = localStorageData.filter(
        (item) => item.status === 1
      );
      setDataHistory(filteredItems);
    }
  }, []);

  useEffect(() => {
    if (dataHistory) {
      const limitedData = dataHistory.slice(0, displayedItemCount);
      setDisplayedData(limitedData);

      if (displayedItemCount >= dataHistory.length) {
        setShowMoreButton(false);
      } else {
        setShowMoreButton(true);
      }
    }
  }, [dataHistory, displayedItemCount]);

  const handleShowMore = () => {
    setDisplayedItemCount((prevCount) => prevCount + 2);
  };

  if (loginData === "true") {
    return (
      <section>
        {dataHistory &&
          displayedData.map((data, index) => (
            <div className="full_AllExercises" key={index}>
              <h2>
                <FaTasks /> Task List Day {data.table}
              </h2>
              <table className="AllExercises">
                <thead>
                  <tr>
                    <th>Tasks</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>
                      Reduce the number of cigarettes to ({" "}
                      {data.number_cigarettes} )
                    </th>
                    <td>
                      {data.number_cigarettes_status === 1 ? (
                        <button className="button_Exercises Done">
                          <BsCheckLg />
                          Done
                        </button>
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td className="data_Exercises_img">
                      {data.Exercises === "Walk for ten minutes" ? (
                        <img src={Walk} alt="Walk" />
                      ) : data.Exercises === "Read for ten minutes" ? (
                        <img src={Read} alt="Read" />
                      ) : data.Exercises === "Squat for ten minutes" ? (
                        <img src={Squat} alt="Squat" />
                      ) : (
                        <></>
                      )}

                      {data.Exercises}
                    </td>
                    <td>
                      {data.Exercises_status === 1 ? (
                        <button className="button_Exercises Done">
                          <BsCheckLg />
                          Done
                        </button>
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>

                  {data.AddTask === "" ? (
                    <></>
                  ) : (
                    data.AddTask.map((item, ind) => (
                      <tr key={ind}>
                        <td className="item_inputValue">{item.inputValue}</td>
                        <td>
                          {item.state === 0 ? (
                            <button
                              className="button_Exercises"
                              onClick={() => handleAddTaskChange(ind)}
                            >
                              <AiOutlineClose />
                              Done
                            </button>
                          ) : (
                            <button className="button_Exercises Done">
                              <BsCheckLg />
                              Done
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ))}

        <div className="dataHistory">
          {showMoreButton && (
            <button className="button" onClick={handleShowMore}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                ></path>
              </svg>

              <div className="button_more">More</div>
            </button>
          )}
        </div>
      </section>
    );
  } else {
    return <Navigate to="/sign-in" />;
  }
};

export default TaskHistory;
