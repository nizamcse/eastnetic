import React, { useState, useEffect } from "react"
import { Box, Button, Typography, TextField } from "@mui/material"
import { makeStyles } from "@mui/styles"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import CancelIcon from "@mui/icons-material/Cancel"
import Modal from "@mui/material/Modal"
import CategoryIcon from "@mui/icons-material/Category"
import PropTypes from "prop-types"

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

const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `16px 0`,
  },
  startBth: {
    backgroundColor: theme.palette.primary,
    color: "#FFFFFF",
  },
  title: {
    fontWeight: 700,
    fontSize: 32,
    lineHeight: 1.12,
  },
  shortDevider: {
    width: "75px",
    height: "2px",
    backgroundColor: theme.palette.primary.main,
    marginTop: 16,
  },
  btnCancel: {
    marginRight: 16,
  },
  btnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
  },
  btnStart: {
    backgroundColor: theme.palette.primary,
    color: "#FFFFFF",
  },
  timeText: {
    fontSize: 24,
    color: theme.palette.primary.main,
    fontWeight: 300,
  },
}))

const Timer = ({ onConfirm, onSartSorting, sortStarted, gameFinished }) => {
  let timer
  const classes = useStyles()
  const [inputNumber, setInputNumber] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [hour, setHour] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const onClickStart = () => {
    if (inputNumber > 200 || inputNumber < 20) return
    onConfirm(inputNumber)
    setOpenModal(false)
    setMinutes(0)
    setSeconds(0)
    setHour(0)
    onSartSorting()
  }
  const onClose = () => {
    setOpenModal(false)
  }
  const onChangeInput = (e) => {
    setInputNumber(e.target.value)
  }

  const onClickStartSorting = () => {
    setOpenModal(true)
  }

  useEffect(() => {
    let timeInSeconds = 0
    if (gameFinished) clearInterval(timer)
    if (sortStarted && !gameFinished) {
      timer = setInterval(() => {
        timeInSeconds += 1
        setSeconds(timeInSeconds % 60)
        const m = `${Math.floor(timeInSeconds / 60)}`
        setMinutes(Math.floor(m % 60))
        setHour(Math.floor(timeInSeconds / 3600))
      }, 1000)
    }
    return () => {
      clearInterval(timer)
    }
  }, [sortStarted, gameFinished])

  return (
    <div>
      <Box className={classes.box} mb={2} mt={3}>
        <Typography component="h3" varient="h3" className={classes.title}>
          Sorting Training System
        </Typography>
        {sortStarted && (
          <Box sx={{ display: "flex" }} alignItems="center" justifyContent="end">
            <Typography
              className={classes.timeText}
              component="span"
              variant="body2"
            >
              {hour < 10 ? `0${hour}` : hour}:
            </Typography>
            <Typography
              className={classes.timeText}
              component="span"
              variant="body2"
            >
              {minutes < 10 ? `0${minutes}` : minutes}:
            </Typography>
            <Typography
              className={classes.timeText}
              component="span"
              variant="body2"
            >
              {seconds < 10 ? `0${seconds}` : seconds}
            </Typography>
          </Box>
        )}
        {!sortStarted && (
          <Button
            startIcon={<CategoryIcon />}
            className={classes.startBth}
            variant="contained"
            color="primary"
            onClick={onClickStartSorting}
          >
            Start Sorting
          </Button>
        )}
      </Box>
      <Modal
        keepMounted
        open={openModal}
        onClose={onClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            How many people ?
          </Typography>
          <div className={classes.shortDevider} />
          <Box mb={3}>
            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
              Enter a number of how many people you want to add to the list. Number
              between 20 - 100
            </Typography>
          </Box>
          <div>
            <div>
              <TextField
                type="number"
                size="small"
                fullWidth
                id="number"
                sx={{ mb: 4 }}
                autoComplete="off"
                onChange={onChangeInput}
              />
            </div>
            <Box className={classes.btnContainer}>
              <Button
                onClick={onClose}
                className={classes.btnCancel}
                variant="contained"
                color="inherit"
                startIcon={<CancelIcon />}
              >
                Cancel
              </Button>
              <Button
                disabled={inputNumber < 20 || inputNumber > 200}
                startIcon={<PlayArrowIcon />}
                className={classes.btnStart}
                variant="contained"
                color="primary"
                onClick={onClickStart}
              >
                Start
              </Button>
            </Box>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

Timer.propTypes = {
  onConfirm: PropTypes.func,
  onSartSorting: PropTypes.func,
  sortStarted: PropTypes.bool,
  gameFinished: PropTypes.bool,
}

export default Timer
