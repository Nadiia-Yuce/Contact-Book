import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

//Налаштування стилів кастомної кнопки (через класи не приміняється)
export const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "rgba(114, 142, 168, 0.5)",
  // color: "white",
  "&:hover": {
    color: "var(--second-title)",
  },
  // стилі для екранів шириною 768px і менше
  [theme.breakpoints.down(768)]: {
    backgroundColor: "rgba(65, 116, 177, 0.7)",
  },
}));
