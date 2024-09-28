import { useDispatch, useSelector } from "react-redux";
import { selectNameFilter } from "../../redux/filters/selectors";
import { changeFilter } from "../../redux/filters/slice";
import css from "./SearchBox.module.css";
import { TextField } from "@mui/material";

export default function SearchBox() {
  const dispatch = useDispatch();
  const query = useSelector(selectNameFilter);

  const handleChange = evt => {
    dispatch(changeFilter(evt.target.value));
  };
  return (
    <div className={css.searchContainer}>
      <TextField
        value={query}
        onChange={handleChange}
        name="search"
        label="Find contacts by name"
        type="search"
        variant="outlined"
        className={css.a}
        sx={{ backgroundColor: "rgba(212, 231, 255, 0.5)", borderRadius: 1 }}
      />
    </div>
  );
}
