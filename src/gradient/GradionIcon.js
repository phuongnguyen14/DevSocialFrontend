// GradientIcon.js
import { SvgIcon } from "@mui/material";

export default function GradientIcon() {
  return (
    <SvgIcon
      sx={{
        fontSize: 50,
        "& path": {
          fill: "none", // Đảm bảo "fill" được set đúng cho path
        },
      }}
    >
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#00c6ff", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#0072ff", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
