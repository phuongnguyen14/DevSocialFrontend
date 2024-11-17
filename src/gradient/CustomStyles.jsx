// customStyles.js
import { styled } from "@mui/material/styles";
import { Button, IconButton } from "@mui/material";
import LogoDevOutlinedIcon from "@mui/icons-material/LogoDevOutlined";

// Button với gradient
export const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(to right, #00c6ff, #0072ff)",  // Màu gradient
  color: "#fff",  // Màu chữ trắng
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  fontSize: "16px",
  fontWeight: "bold",
  textTransform: "none",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s, background 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    background: "linear-gradient(to right, #0072ff, #00c6ff)",  // Màu khi hover
  },
}));

// Biểu tượng với gradient
export const GradientIcon = styled(LogoDevOutlinedIcon)(({ theme }) => ({
  fontSize: "50px",
  background: "linear-gradient(to right, #00c6ff, #0072ff)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.1)",
  },
}));

// IconButton với gradient
export const GradientIconButton = styled(IconButton)(({ theme }) => ({
  background: "linear-gradient(to right, #00c6ff, #0072ff)",
  color: "#fff",
  padding: "10px",
  transition: "transform 0.2s, background 0.3s",
  "&:hover": {
    transform: "scale(1.1)",
    background: "linear-gradient(to right, #0072ff, #00c6ff)",  // Màu khi hover
  },
}));
