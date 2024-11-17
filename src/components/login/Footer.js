import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="login_footer">
      <div className="login_footer_wrap">
      <p>Social Network Project</p>

      </div>
      
      <div className="footer_splitter"></div>
      <div className="login_footer_wrap">
       
        <Link to="/">Sign Up</Link>
        <Link to="/">Log in</Link>
        
        <Link to="/">Privacy</Link>
        <Link to="/">Cookies</Link>
        <Link to="/">Terms</Link>
      </div>
      
    </footer>
  );
}
