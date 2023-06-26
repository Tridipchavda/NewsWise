import { Grid, Paper, Typography } from "@mui/material";
import comman from "../comman.jpg";

export default function NewsBox(props) {
  var gridHeight = undefined;
  var gridWidth = undefined;
  if (props.index % 4 == 0) {
    gridHeight = 300;
    gridWidth = 700;
  } else if (props.index % 4 == 1) {
    gridHeight = 300;
    gridWidth = 500;
  } else if (props.index % 4 == 2) {
    gridHeight = 300;
    gridWidth = 600;
  } else {
    gridHeight = 300;
    gridWidth = 600;
  }

  return (
    <Grid item className="newsBox">
      <Paper
        className="Paper"
        sx={{
          height: gridHeight,
          width: gridWidth,
          backgroundImage: `url(${comman})`,
          background: `url(${props.headline["urlToImage"]})`,
          backgroundSize: "cover",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "white",
            paddingLeft: 2,
            paddingTop: 25,
            width: 650,
            textAlign: "left",
          }}
        >
          {props.headline["title"]}
        </Typography>
      </Paper>
    </Grid>
  );
}
