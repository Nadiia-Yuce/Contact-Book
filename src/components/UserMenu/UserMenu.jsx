import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { logOut } from "../../redux/auth/operations";
import { Button } from "@mui/material";
import css from "./UserMenu.module.css";

export default function UserMenu() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  return (
    <div className={css.userMenu}>
      <p className={css.wellcome}>{`Wellcome, ${user.name}! 🙃`}</p>
      <Button
        variant="outlined"
        color="error"
        type="button"
        onClick={() => dispatch(logOut())}
        sx={{ borderWidth: 2 }}
      >
        Log out
      </Button>
    </div>
  );
}
