import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/system";
import EmailIcon from "@mui/icons-material/Email";
import DraftsIcon from "@mui/icons-material/Drafts";

// Styled component để hỗ trợ tùy chỉnh màu sắc
const AnimatedWrapper = styled("div")(({ color }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  color: color || "#4e8bc8", // Mặc định màu xanh
  fontSize: "32px",
  paddingBottom:"5px",
  transition: "color 0.3s ease", // Hiệu ứng thay đổi màu
}));

const LetterAnimation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [iconColor, setIconColor] = useState("#4e8bc8"); // Màu mặc định
  const iconRef = useRef(null); // Tham chiếu tới phần tử icon

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (iconRef.current && !iconRef.current.contains(e.target)) {
      setIsOpen(false); // Reset trạng thái khi click ra ngoài
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleColorChange = (e) => {
    setIconColor(e.target.value); // Cập nhật màu từ input
  };

  return (
    <div>
      {/* Icon với màu động */}
      <AnimatedWrapper ref={iconRef} color={iconColor} onClick={handleToggle}>
        {isOpen ? <DraftsIcon /> : <EmailIcon />}
      </AnimatedWrapper>

     
    </div>
  );
};

export default LetterAnimation;
