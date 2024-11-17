import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

export default function Theme({ setVisible }) {
  const dispatch = useDispatch();
  const { darkTheme } = useSelector((state) => ({ ...state }));
  return (
    <div className="absolute_wrap">
      <div className="absolute_wrap_header">
        <div
          className="circle hover1"
          onClick={() => {
            setVisible(0);
          }}
        >
          <i className="arrow_back_icon"></i>
        </div>
        Theme 
      </div>
      {/* <div className="mmenu_main">
        <div className="small_circle" >
          <i className="dark_filled_icon"></i>
        </div>
        <div className="mmenu_col">
          <span className="mmenu_span1">Dark Mode</span>
         
        </div>
      </div> */}
      <label
        htmlFor="darkOff"
        className="hover1"
        onClick={() => {
          Cookies.set("darkTheme", false);
          dispatch({ type: "LIGHT" });
        }}
      >
        <WbSunnyIcon/>
        <span>Light Mode</span>
        {darkTheme ? (
          <input type="radio" name="dark" id="darkOff" />
        ) : (
          <input type="radio" name="dark" id="darkOff" checked />
        )}
      </label>
      <label
        htmlFor="darkOn"
        className="hover1"
        onClick={() => {
          Cookies.set("darkTheme", true);

          dispatch({ type: "DARK" });
        }}
      >
        <DarkModeIcon/>
        <span>Dark Mode</span>
        {darkTheme ? (
          <input type="radio" name="dark" id="darkOn" checked />
        ) : (
          <input type="radio" name="dark" id="darkOn" />
        )}
      </label>
      
      
    </div>
  );
}
