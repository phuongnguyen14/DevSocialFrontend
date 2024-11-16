// import Cookies from "js-cookie";

// export function userReducer(
//   state = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,

//   action
// ) {
//   switch (action.type) {
//     case "LOGIN":
//       return action.payload;
//     case "LOGOUT":
//       return null;
//     case "UPDATEPICTURE":
//       return { ...state, picture: action.payload };
//     case "VERIFY":
//       return { ...state, verified: action.payload };

//     default:
//       return state;
//   }
// }
export function userReducer(
  state = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : null,
  action
) {
  switch (action.type) {
    case "LOGIN":
      sessionStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    case "LOGOUT":
      sessionStorage.removeItem("user");
      return null;
    case "UPDATEPICTURE":
      const updatedState = { ...state, picture: action.payload };
      sessionStorage.setItem("user", JSON.stringify(updatedState));
      return updatedState;
    case "VERIFY":
      const verifiedState = { ...state, verified: action.payload };
      sessionStorage.setItem("user", JSON.stringify(verifiedState));
      return verifiedState;
    default:
      return state;
  }
}
