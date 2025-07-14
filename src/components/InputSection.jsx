import { TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

const InputSection = (props) => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  //   const [startGameClicked, setStartGameClicked] = useState(false);
  const [startGameEnabled, setStartGameEnabled] = useState(false);

  useEffect(() => {
    if (player1.length != 0 && player2.length != 0) {
      setStartGameEnabled(true);
    }
  }, [player1, player2]);
  return (
    <>
      <Grid container>
        <Grid size={12}>
          <Typography
            variant="h2"
            textAlign={"center"}
            fontWeight={400}
            component="h1"
            mb={3}
          >
            Tic Tac Toe
          </Typography>
        </Grid>
        <Grid container justifyContent={"center"} size={12} spacing={3}>
          <Grid container justifyContent={"center"} size={3}>
            <Grid size={12}>
              <TextField
                id="player-1"
                label="Player 1 : Name"
                variant="filled"
                fullWidth
                onChange={(e) => {
                  setPlayer1(e.target.value);
                }}
                value={player1}
                disabled={props.startGameClicked}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent={"center"} size={3}>
            <Grid size={12}>
              <TextField
                id="player-2"
                label="Player 2 : Name"
                variant="filled"
                fullWidth
                onChange={(e) => {
                  setPlayer2(e.target.value);
                }}
                value={player2}
                disabled={props.startGameClicked}
              />
            </Grid>
          </Grid>
          {/* <Grid size={3}>
            <TextField id="player-2" label="Player 2: Name" variant="filled" />
          </Grid> */}
          <Grid
            container
            justifyContent={"center"}
            size={12}
            textAlign={"center"}
          >
            <Grid size={6}>
              <Button
                disabled={!startGameEnabled}
                fullWidth
                variant="contained"
                onClick={() => {
                  props.setStartGameClicked(true);
                  props.setNames([player1, player2]);
                }}
              >
                Start Game
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default InputSection;
