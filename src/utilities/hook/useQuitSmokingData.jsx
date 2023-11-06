import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useQuitSmokingData = () => {
  const [data, setData] = useState(null);
  const [index, setIndex] = useState(null);
  const [localStorageUpdateFlag, setLocalStorageUpdateFlag] = useState(false);
  const [openAddTask, setOpenAddTask] = useState(false);
  const [feedBack, setFeedBack] = useState(localStorage.getItem("feedback"));

  const [feedbackText, setFeedbackText] = useState("");

  const handleSaveToLocalStorage = () => {
    if (feedbackText.length >= 1) {
      localStorage.setItem("feedback", feedbackText);

      toast.success("successfully added feedback.");

      setFeedBack(feedbackText);
    } else {
      toast.error("You must add text.");
    }
  };

  useEffect(() => {}, [feedBack]);

  const handleTextareaChange = (e) => {
    setFeedbackText(e.target.value);
  };

  /////////////////

  const userData = JSON.parse(localStorage.getItem("user_data")) || {};

  const number_cigarettes = userData.number_smoke_daily;

  const tableQuitSmoking = [];

  const Exercises_data = [
    "Walk for ten minutes",
    "Read for ten minutes",
    "Squat for ten minutes",
  ];

  for (let i = 0; i < number_cigarettes; i++) {
    const randomExercises =
      Exercises_data[Math.floor(Math.random() * Exercises_data.length)];

    tableQuitSmoking.push({
      AddTask: "",
      table: i + 1,
      number_cigarettes: number_cigarettes - i - 1,
      number_cigarettes_status: 0,
      Exercises: randomExercises,
      Exercises_status: 0,
      status: 0,
    });
  }

  if (!localStorage.getItem("tableQuitSmoking")) {
    localStorage.setItem("tableQuitSmoking", JSON.stringify(tableQuitSmoking));
  }

  ///////////////////
  const [newindex, setNewindex] = useState(null);

  useEffect(() => {
    const localStorageData = JSON.parse(
      localStorage.getItem("tableQuitSmoking")
    );

    const filteredData = localStorageData.find((item, i) => item.status === 0);

    setData(filteredData);
    setIndex(localStorageData.findIndex((item) => item.status === 0));
    setNewindex(filteredData);
  }, [localStorageUpdateFlag]);

  const handleExerciseStatusChange = () => {
    if (data && index !== null) {
      const updatedData = { ...data, Exercises_status: 1 };

      const localStorageData = JSON.parse(
        localStorage.getItem("tableQuitSmoking")
      );

      localStorageData[index] = updatedData;

      localStorage.setItem(
        "tableQuitSmoking",
        JSON.stringify(localStorageData)
      );

      setData(updatedData);

      toast.success("successfully Done.");
    }
  };

  const handleStatusChange = () => {
    if (data && index !== null) {
      const updatedData = { ...data, status: 1 };

      const localStorageData = JSON.parse(
        localStorage.getItem("tableQuitSmoking")
      );

      localStorageData[index] = updatedData;

      localStorage.setItem(
        "tableQuitSmoking",
        JSON.stringify(localStorageData)
      );

      setData(updatedData);

      setLocalStorageUpdateFlag((prevFlag) => !prevFlag);
    }
  };

  const handleCigarettesChange = () => {
    if (data && index !== null) {
      const updatedData = { ...data, number_cigarettes_status: 1 };

      const localStorageData = JSON.parse(
        localStorage.getItem("tableQuitSmoking")
      );

      localStorageData[index] = updatedData;

      localStorage.setItem(
        "tableQuitSmoking",
        JSON.stringify(localStorageData)
      );

      setData(updatedData);

      setLocalStorageUpdateFlag((prevFlag) => !prevFlag);

      toast.success("successfully Done.");
    }
  };

  const handleopenAddTask = () => {
    setOpenAddTask(!openAddTask);
    window.scrollTo(0, 0);
  };

  let successfully_task = "";

  if (data && data.AddTask) {
    const allStatesAreOne = data.AddTask.every((item) => item.state == 1);

    if (
      allStatesAreOne &&
      data.number_cigarettes_status === 1 &&
      data.Exercises_status === 1
    ) {
      successfully_task = "successfully_task";
    }
  } else {
    successfully_task = "New_task";
  }

  return {
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
  };
};

export default useQuitSmokingData;
