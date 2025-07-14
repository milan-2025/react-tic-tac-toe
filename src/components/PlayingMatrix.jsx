import { Box, Grid, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
// import { Button } from "react-native-paper";
import Button from "@mui/material/Button";

const PlayingMatrix = (props) => {
  const [matrix, setMatrix] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  const [scale, setScale] = useState({ value: 1, prop: "" });

  const handleMouseEnter = (i, j) => {
    setScale({ value: 1.2, prop: "" + i + "-" + j });
  };

  const handleMouseLeave = () => {
    setScale({ value: 1, prop: "" });
  };

  const [currentTurn, setCurrentTurn] = useState(0);

  const checkElements = (arr) => {
    console.log("arr-", arr);
    let first = arr[0];

    for (let i = 0; i < 3; i++) {
      console.log("i-", arr[i]);
      if (arr[i] == null || arr[i] != first) {
        return false;
      }
    }
    return true;
  };
  function transposeMatrix(matrix) {
    // Check if the matrix is empty or not a valid 2D array
    if (
      !matrix ||
      matrix.length === 0 ||
      !matrix[0] ||
      matrix[0].length === 0
    ) {
      return []; // Return an empty array for invalid input
    }

    // Get the number of columns from the first row
    const numCols = matrix[0].length;

    // Use map to iterate over each column index
    return Array.from({ length: numCols }).map((_, colIndex) => {
      // For each column index, use map to create a new row
      // by collecting elements from the corresponding column in the original matrix
      return matrix.map((row) => row[colIndex]);
    });
  }

  const allFilled = (matrix) => {
    // let flag = false;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!matrix[i][j]) {
          return false;
        }
      }
    }
    return true;
  };

  useEffect(() => {
    let gotWinner = false;
    let transposedMatrix = transposeMatrix(matrix);
    console.log("matrix;-", matrix);
    console.log("mat1", matrix[0][0]);
    // check diagnals
    if (
      matrix[0][0] &&
      matrix[0][0] == matrix[1][1] &&
      matrix[1][1] == matrix[2][2]
    ) {
      gotWinner = true;
      if (currentTurn == 0) {
        props.setWinner(1);
        // alert(1)
        // ;
        let mt = `${props.names[1]} won. Hurray!!!!`;
        handleOpen(mt);
      } else {
        props.setWinner(0);
        // alert(0);
        let mt = `${props.names[0]} won. Hurray!!!!`;
        handleOpen(mt);
      }
    } else if (
      matrix[0][2] &&
      matrix[0][2] == matrix[1][1] &&
      matrix[1][1] == matrix[2][0]
    ) {
      gotWinner = true;
      if (currentTurn == 0) {
        props.setWinner(1);
        // alert(1);
        let mt = `${props.names[1]} won. Hurray!!!!`;
        handleOpen(mt);
      } else {
        props.setWinner(0);
        // alert(0);
        let mt = `${props.names[0]} won. Hurray!!!!`;
        handleOpen(mt);
      }
    }

    // check rows
    if (
      checkElements(matrix[0]) ||
      checkElements(matrix[1]) ||
      checkElements(matrix[2])
    ) {
      gotWinner = true;
      if (currentTurn == 0) {
        props.setWinner(1);
        // alert(1);
        let mt = `${props.names[1]} won. Hurray!!!!`;
        handleOpen(mt);
      } else {
        props.setWinner(0);
        // alert(0);
        let mt = `${props.names[0]} won. Hurray!!!!`;
        handleOpen(mt);
      }
    }
    // check cols
    else if (
      checkElements(transposedMatrix[0]) ||
      checkElements(transposedMatrix[1]) ||
      checkElements(transposedMatrix[2])
    ) {
      gotWinner = true;
      if (currentTurn == 0) {
        props.setWinner(1);
        // alert(1);
        let mt = `${props.names[1]} won. Hurray!!!!`;
        handleOpen(mt);
      } else {
        props.setWinner(0);
        // alert(0);
        let mt = `${props.names[0]} won. Hurray!!!!`;
        handleOpen(mt);
      }
    } else if (allFilled(matrix)) {
      gotWinner = false;
      //   props.setWinner(currentTurn);
      //   alert("draw");
      let mt = `It's a Draw!!!!`;
      handleOpen(mt);
    }
    // all filled -- draw
  }, [matrix, currentTurn]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = (modalText) => {
    setModalText(modalText);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [modalText, setModalText] = useState("");

  return (
    <>
      <Grid container size={12} mt={3}>
        <Grid size={12}>
          <Typography textAlign={"center"} variant="h5">{`${
            props.names[currentTurn]
          }'s turn ${currentTurn == 0 ? "(O)" : "(X)"}`}</Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent={"center"} mt={3} size={12} spacing={1}>
        <Grid container size={6}>
          {matrix.map((item, i) => {
            return item.map((innerItem, j) => {
              return (
                <Grid
                  border={1}
                  boxShadow={3}
                  height={90}
                  key={"" + i + "-" + j}
                  size={4}
                  borderRadius={2}
                  bgcolor={"#d2e2f3"}
                  sx={{
                    cursor: innerItem == null ? "pointer" : "",
                    transition: "transform 0.3s ease-in-out",
                    transform:
                      innerItem == null && "" + i + "-" + j == scale.prop
                        ? `scale(${scale.value})`
                        : "",
                  }}
                  onMouseEnter={() => {
                    handleMouseEnter(i, j);
                  }}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => {
                    if (innerItem == null) {
                      if (currentTurn == 0) {
                        setMatrix((oldState) => {
                          oldState[i][j] = "O";
                          return oldState;
                        });
                        setCurrentTurn(1);
                      } else if (currentTurn == 1) {
                        setMatrix((oldState) => {
                          oldState[i][j] = "X";
                          return oldState;
                        });
                        setCurrentTurn(0);
                      }
                    }
                  }}
                  alignItems={"center"}
                  container
                  textAlign={"center"}
                >
                  <Grid size={12}>
                    <Typography
                      variant="h3"
                      textAlign={"center"}
                      fontWeight={400}
                      alignSelf={"center"}
                    >
                      {innerItem}
                    </Typography>
                  </Grid>
                </Grid>
              );
            });
          })}
        </Grid>
      </Grid>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography mb={2} id="modal-modal-title" variant="h6" component="h2">
            {modalText}
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <Button
            fullWidth
            onClick={() => {
              window.location.reload();
            }}
            variant="contained"
          >
            Play Again !!!
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default PlayingMatrix;
