import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container } from "@mui/material";
import JokeHistory from "./JokeHistory";

const JOKE_URL = "https://official-joke-api.appspot.com/random_joke";
const API_URL = "http://localhost:3000/jokes";

export const Joke = () => {
  const [joke, setJoke] = useState({ setup: "", punchline: "" });
  const [jokes, setJokes] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchJoke = async () => {
    try {
      const response = await axios.get(JOKE_URL);
      const { setup, punchline } = response.data;
      setJoke({ setup, punchline });

      await axios.post(API_URL, { setup, punchline });
    } catch (error) {
      console.error("Error fetching joke:", error);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.get(API_URL);
      const jokes = response.data;
      setJokes(jokes);
    } catch (error) {
      console.error("Error fetching joke history:", error);
    }
  };

  useEffect(() => {
    fetchJoke();
    fetchHistory();
  }, []);

  const handleHistoryClick = () => {
    fetchHistory();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container id="joke-box">
      <div id="text">&quot;{joke.setup}&quot;</div>
      <div id="punchline">- {joke.punchline}</div>
      <div>
        <Button color="primary" variant="text" onClick={handleHistoryClick}>
          View Joke History
        </Button>
        <Button
          color="secondary"
          variant="contained"
          id="new-quote"
          onClick={fetchJoke}
        >
          New Joke
        </Button>
      </div>
      <JokeHistory jokes={jokes} open={open} onClose={handleClose} />
    </Container>
  );
};
