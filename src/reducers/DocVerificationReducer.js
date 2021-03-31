const GroupReducer = (state, action) => {
  switch (action.type) {
    case "DOCUMENSTS_TO_VERIFY":
      console.log("response");

      console.log("verification.....");
      return { ...state, docsToVerify: action.payload };
  }
};
export default GroupReducer;
