
const preProd = {
  BASEURL: "http://humine.theretailinsights.co/",
  FEDIDURL: "https://preprod.idpdecathlon.oxylane.com/as/token.oauth2",
};
const prod = {
    BASEURL: "http://humine.theretailinsights.co/",
    FEDIDURL: "https://idpdecathlon.oxylane.com/as/token.oauth2",
  };

export default process.env.REACT_APP_ENV === "prod" ? prod : preProd;
