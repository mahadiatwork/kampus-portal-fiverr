const FilterPassword = ({ RegexPattern, password, passwordRepeat }) => {
  let filteredResults = RegexPattern.map((checker) => {
    if (checker.pattern.test(password)) {
      return {
        type: checker.type,
        checkMark: true,
        text: checker.text,
      };
    } else {
      return {
        type: checker.type,
        checkMark: false,
        text: checker.text,
      };
    }
  });

  // if passwordRepeat doesn't have value then set passwords_match field false
  if (!passwordRepeat) {
    filteredResults.push({
      type: "passwords_match",
      checkMark: false,
      text: "Passwords match",
    });
  }
  // if passwordRepeat has value then check wheather password and passwordRepeat are equal or not
  if (passwordRepeat) {
    if (password === passwordRepeat) {
      filteredResults.push({
        type: "passwords_match",
        checkMark: true,
        text: "Passwords match",
      });
    } else {
      filteredResults.push({
        type: "passwords_match",
        checkMark: false,
        text: "Passwords match",
      });
    }
  }

  return filteredResults;
};

export default FilterPassword;
