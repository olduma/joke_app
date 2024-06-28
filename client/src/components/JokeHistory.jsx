/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  DialogActions,
  Button,
} from "@mui/material";

const JokeHistory = ({jokes, open, onClose}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Joke History</DialogTitle>
      <DialogContent>
        <List>
          {jokes.map((joke, index) => (
            <ListItem key={index}>
              {index + 1}. {joke.setup} - {joke.punchline}
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JokeHistory;
