import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useSpeechSynthesis } from 'react-speech-kit';
import toast from 'react-hot-toast';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import risk from '../../Resources/Images/risk.png'
import market from '../../Resources/Images/market.png'
import political from '../../Resources/Images/political.png'
import word_cloud from '../../Resources/Images/word_cloud.png'
import honda_robot from '../../Resources/Images/honda_robot.png'
import Predicted_Icons from '../../Resources/Predicted_Icons.zip'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://bloopglobal.com/wp-content/uploads/2020/11/interactive-presentation-header-1.gif)',
    // backgroundImage : 'url(https://cdn.dribbble.com/users/42048/screenshots/8350927/robotintro_dribble.gif)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    //margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    //margin: theme.spacing(3, 0, 2),
  },
  card : {
    backgroundColor: '#e2e1fc'
  }
}));

const MySpace = () => {
  const classes = useStyles();
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [notes, setNotes] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [openImage, setOpenImage] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenImage = () => {
    setOpenImage(true);
  };

  const handleCloseImage = () => {
    setOpenImage(false);
  };


//   const [value, setValue] = useState('');
  const { speak } = useSpeechSynthesis();

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
  });

  useEffect(() => {
    notifyWelcome();
  }, []);

  function stopCapture() {
    SpeechRecognition.stopListening();
    console.log(transcript);
    speak({ text: "Note has been made for " + transcript, rate: 0.9 })
    setNotes(prevArray => [...prevArray, transcript]);
    console.log(notes);
    notifyAddNote();
  }

  const notifyWelcome = () => {
    console.log("here")
    toast.success("IVI welcomes you !");
  };

  const notifyAddNote = () => {
    toast.success("Great! Your Note is submitted.", {
        icon: '🔥',
    });
};

const downloadFile = () => {
  window.location.href = "../../Resources/Images/word_cloud.png"
}


  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  return (
    <React.Fragment>
      <CssBaseline />
        <Container maxWidth="lg">
          <br />
          <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={5} component={Paper} elevation={5} className={classes.image} />
            <Grid item xs={12} sm={4} md={7} component={Paper} elevation={5} >
              <div className={classes.paper}>
                <img alt="mind_note" width="60%" height="20%" src="https://www.pocketprep.com/wp-content/uploads/2021/03/Brain-dumps-and-other-test-day-hacks_post-image-full.jpg" />
                <Autocomplete
                  id="combo-box-demo"
                  options={top100Films}
                  getOptionLabel={(option) => option.title}
                  style={{ width: 300 , height:60}}
                  renderInput={(params) => <TextField {...params} label="Select Slide Number" variant="outlined" />}
                />

                
                <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.submit}
                    onClick={handleClickOpen}
                  >
                    Predict Icon
                </Button>
                <br/>
                <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.submit}
                    onClick={handleClickOpenImage}
                  >
                    Image Context Analysis
                </Button>
                
                <br/><br/>

                <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle id="alert-dialog-slide-title">Predicted Icons</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                    <Typography gutterBottom variant="body1" component="h2">
                      {text_dat}
                    </Typography>
                    <br/>
                    <center>
                    <img alt="word_cloud" src = {word_cloud} style={{height:"250px", width:"450px"}}/>
                    <br/>
                    <p><b>Risk, Market, Political</b></p>
                      <img alt="risk" src = {risk} style={{height:"100px", width:"100px"}}/>
                      <img alt="market" src = {market} style={{height:"100px", width:"100px"}}/>
                      <img alt="political" src = {political} style={{height:"100px", width:"100px"}}/>
                      <br/>
                      <a href={Predicted_Icons} download="Predicted_Icons" target='_blank'>
                      <Button
                          variant="outlined"
                          color="secondary"
                          className={classes.submit}
                          // onClick={()=> downloadFile()}
                        >
                          Download Icons
                      </Button>
                      </a>
                    </center>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Done
                    </Button>
                  </DialogActions>
                </Dialog>




                <Dialog
                  open={openImage}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleCloseImage}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle id="alert-dialog-slide-title">Deep Learning based Image Context Analysis </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                    
                   
                    <center>
                    <img alt="word_cloud" src = {honda_robot} style={{height:"450px", width:"400px"}}/>
                    <Typography gutterBottom variant="body1" component="h2">
                      <b>Text Capture from Image:</b> <i>Honda Robots are coming soon</i>
                    </Typography>
                    <Typography gutterBottom variant="body1" component="h2">
                      <b>Image Caption Generator:</b> <i>{text_dat_image}</i>
                    </Typography>

                    <Typography gutterBottom variant="body1" component="h2">
                      <b>Similarity Score - 60%</b>
                    </Typography>
                    
                    </center>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseImage} color="primary">
                      Done
                    </Button>
                  </DialogActions>
                </Dialog>

                <div>
                  <Button
                    // type="submit"
                    // fullWidth
                    variant="outlined"
                    color="secondary"
                    className={classes.submit}
                    onClick={SpeechRecognition.startListening}
                  >
                    Capture
            </Button>
            &nbsp;
            <Button
                    // type="submit"
                    // fullWidth
                    variant="outlined"
                    color="secondary"
                    className={classes.submit}
                    onClick={stopCapture}
                  >
                    Stop
            </Button>
            &nbsp;
            <Button
                    // type="submit"
                    // fullWidth
                    variant="outlined"
                    color="secondary"
                    className={classes.submit}
                    onClick={resetTranscript}
                  >
                    Reset
            </Button>
                  {/* <button onClick={SpeechRecognition.startListening}>Capture</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button> */}
                  <h5>{transcript}</h5>
                  {/* {notes.map((item) => (
                    <p>{item}</p>
                  ))} */}

                </div>
                <Container maxWidth="lg">
                  <Grid container spacing={4}>
                    {notes.map((note) => (
                      <Grid item xs={12} sm={6} md={6}>
                        <Card className={classes.card}>

                          <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="body1" component="h2">
                              {note}
                            </Typography>
                          </CardContent>
                          {/* <center> */}
                            <CardActions>
                              <Button
                                variant="outlined"
                                size="small"
                                color="primary"
                                fullWidth
                              // onClick={() => {window.open('/#/digital')}}
                              >
                                Edit/delete
                      </Button>

                            </CardActions>
                          {/* </center> */}
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Container>
              </div>
            </Grid>
          </Grid>
        </Container>
        <br />
    </React.Fragment>
  )
}
export default MySpace

const top100Films = [
  { title: 'Slide 1' },
  { title: 'Slide 2'},
  { title: 'Slide 3'},
  { title: 'Slide 4'},
  { title: 'Slide 5'},
  { title: 'Slide 6'},
  // { title: 'Slide 7'},
  // { title: 'Slide 8'},
  // { title: 'Slide 9'},
]

const text_dat = "Risk is a much riskier proposition than it used to be. New risks emerge every day as markets get desrupted, political instability interrupts supply chains and new technology pushes boundaries across the risk landscape. Yet, while many organisations see risk as a negative, good risk management can actually help companies go faster"
const text_dat_image = "A white robot on a table"