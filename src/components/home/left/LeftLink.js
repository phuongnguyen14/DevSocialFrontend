import { Link } from "react-router-dom";

export default function LeftLink({ icon, text, notification, to , dataFriend }) {
  return (
    <Link to={to} className="left_link hover2">
      {icon}
      {notification !== undefined ? (
        <div className="col">
          <div className="col_1">{text}</div>
          <div className="col_2">{notification}</div>
        </div>
      ) : (
        <span>{text}</span>
      )}
    </Link>
  );
}
