import { useState, useEffect } from "react"
import { Container, Box, Alert, Modal, Button } from "@mui/material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { cyan, lightBlue } from "@mui/material/colors"
import { generateUsers } from "./data/users"
// import UserTable from "./components/Table"
import Timer from "./components/Timer"
import AnimatedDnd from "./components/AnimatedDnD"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: 0,
  boxShadow: 24,
  p: 4,
  outline: "none",
}

const theme = createTheme({
  palette: {
    primary: { main: lightBlue[500] },
    secondary: { main: cyan[500] },
  },
})

function App() {
  const [totalRows, setToTalRows] = useState(0)
  const [rows, setRows] = useState([])
  const [isSorted, setIsSorted] = useState(false)
  const [sortStarted, setSortStarted] = useState(false)

  const onSartSorting = () => setSortStarted(true)

  const onConfirm = (val) => {
    if (val < 5 || val > 200) return
    setToTalRows(val)
  }

  const onChangeStatus = (status) => {
    if (status === true) {
      setIsSorted(status)
      setSortStarted(false)
    }
  }

  const onRestart = () => {
    setToTalRows(0)
    setRows([])
    setIsSorted(false)
    setToTalRows(0)
  }

  useEffect(() => {
    if (totalRows > 0) {
      const users = generateUsers(totalRows)
      setRows(users)
    }
  }, [totalRows])

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Timer
          onConfirm={onConfirm}
          onSartSorting={onSartSorting}
          sortStarted={sortStarted}
          gameFinished={isSorted}
        />
        <AnimatedDnd
          sortStarted={sortStarted}
          onChangeStatus={onChangeStatus}
          userList={rows}
        />
        <Modal
          keepMounted
          open={isSorted}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <div>
              <Box>
                <Alert severity="success">
                  <strong>Congratulations! </strong>You have finished sorting.
                </Alert>
              </Box>
              <Box mt={4}>
                <Button
                  fullWidth
                  onClick={onRestart}
                  variant="contained"
                  color="primary"
                  startIcon={<PlayArrowIcon />}
                >
                  RESTART
                </Button>
              </Box>
            </div>
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  )
}

export default App
