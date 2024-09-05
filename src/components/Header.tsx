import { Box, TextField, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { MdArrowForwardIos } from "react-icons/md";

const Header = () => {
  const styles = useStyles();

  return (
    <Box className={styles.wrapper}>
      <Box>
        <Typography className={styles.text}>
          <span>Home</span>
          <MdArrowForwardIos />
          <span>Dashboard</span>
        </Typography>
      </Box>
      <Box>
        <TextField
          variant="outlined"
          placeholder="Search anything..."
          InputProps={{
            startAdornment: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className={styles.searchIcon}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.784 14.496a6.5 6.5 0 111.719-1.719l3.978 3.978a1.5 1.5 0 11-2.122 2.122l-3.978-3.978z"
                />
              </svg>
            ),
          }}
          className={styles.searchBox}
        />
      </Box>
    </Box>
  );
};

export default Header;

const useStyles = makeStyles(() =>
  createStyles({
    searchBox: {
      "& .MuiOutlinedInput-root": {
        borderRadius: "20px",
        backgroundColor: "#f5f9ff",
        padding: "6px 10px",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#ccc",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#b39ddb",
        },
      },
      width: "100%",
    },
    searchIcon: {
      marginRight: "8px",
    },
    wrapper: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 16px",
    },
    text: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
  })
);
