const RegexPattern = [
  {
    type: "upper_lower_case",
    pattern: /[a-zA-z]/,
    text: "Upper and lowercase letters",
  },
  {
    type: "valid_symbol",
    pattern: /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
    text: "Valid Symbols",
  },
  {
    type: "numerical",
    pattern: /\d+/,
    text: "At least one numeral",
  },
  {
    type: "eight_character",
    pattern: /.{8,}/,
    text: "At least eight characters",
  },
];
export default RegexPattern;
