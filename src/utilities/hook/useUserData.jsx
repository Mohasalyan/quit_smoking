const useUserData = () => {
  const userData = JSON.parse(localStorage.getItem("user_data")) || {};

  const emailPrefix =
    Object.keys(userData).length > 0
      ? userData.emailSignUp.split("@")[0]
      : null;

  ///////////////

  const dateSignUp = userData.date_SignUp;

  const [day, month, year] = dateSignUp
    ? dateSignUp.split("-").map(Number)
    : [null, null, null];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formattedDate = `${day} / ${monthNames[month - 1]} / ${year}`;

  ///////////////

  const number_cigarettes = userData.number_smoke_daily;

  const cigarette_price = userData.Price_cigarettes;

  const calculate_today = ((cigarette_price / 20) * number_cigarettes).toFixed(
    2
  );

  const calculate_month = (calculate_today * 30).toFixed(2);

  const calculate_year = (calculate_month * 12).toFixed(2);

  return {
    userData,
    emailPrefix,
    formattedDate,
    number_cigarettes,
    cigarette_price,
    calculate_today,
    calculate_month,
    calculate_year,
  };
};

export default useUserData;
