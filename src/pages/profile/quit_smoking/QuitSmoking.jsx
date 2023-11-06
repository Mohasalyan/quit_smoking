import React from "react";
import { NavLink, Navigate } from "react-router-dom";
import { FaTasks } from "react-icons/fa";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import Walk from "../../../../public/assets/Walk.webp";
import Read from "../../../../public/assets/Read.webp";
import Squat from "../../../../public/assets/Squat.webp";
import AddTask from "./AddTask";
import AddTaskView from "./AddTaskView";
import congratulations from "../../../../public/assets/congratulations.webp";
import "../profile.css";
import useQuitSmokingData from "../../../utilities/hook/useQuitSmokingData";

const QuitSmoking = () => {
  const loginData = localStorage.getItem("login");

  if (loginData === "true") {
    const {
      data,
      setLocalStorageUpdateFlag,
      openAddTask,
      setOpenAddTask,
      feedBack,
      feedbackText,
      handleSaveToLocalStorage,
      handleTextareaChange,
      newindex,
      handleExerciseStatusChange,
      handleStatusChange,
      handleCigarettesChange,
      handleopenAddTask,
      successfully_task,
    } = useQuitSmokingData();

    return (
      <div className="full_AllExercises">
        {data ? (
          <>
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
                    {data.number_cigarettes_status === 0 ? (
                      <button
                        className="button_Exercises"
                        onClick={handleCigarettesChange}
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
                    {data.Exercises_status === 0 ? (
                      <button
                        className="button_Exercises"
                        onClick={handleExerciseStatusChange}
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

                <AddTaskView
                  newindex={newindex}
                  setLocalStorageUpdateFlag={setLocalStorageUpdateFlag}
                />
              </tbody>
            </table>
            <div className="add_task">
              <button className="button_Exercises" onClick={handleopenAddTask}>
                Add Task
              </button>
              <AddTask
                index={newindex.table - 1}
                openAddTask={openAddTask}
                setOpenAddTask={setOpenAddTask}
                setLocalStorageUpdateFlag={setLocalStorageUpdateFlag}
              />
            </div>

            <div className="button_Div">
              {(data.number_cigarettes_status === 1 &&
                data.Exercises_status === 1 &&
                successfully_task === "New_task") ||
              successfully_task === "successfully_task" ? (
                <button
                  className="button_Exercises"
                  onClick={handleStatusChange}
                >
                  Next Day
                </button>
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <div className="congratulations_quit_smoking">
            <img src={congratulations} alt="congratulations" />

            {feedBack ? (
              <div>{feedBack}</div>
            ) : (
              <>
                <div className="input_AddTask">
                  <div className="form-card">
                    <textarea
                      className="form-input"
                      type="text"
                      value={feedbackText}
                      onChange={handleTextareaChange}
                    ></textarea>

                    <label className="form-label" htmlFor="Add_Task">
                      Summary of the experiment to stop smoking
                    </label>
                  </div>
                  <button
                    className="button_Exercises"
                    onClick={handleSaveToLocalStorage}
                  >
                    Send
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        <div className="TaskHistory">
          <NavLink className="button_Exercises" to="/task-history">
            Task History
          </NavLink>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/sign-in" />;
  }
};

export default QuitSmoking;
