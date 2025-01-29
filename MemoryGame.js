import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const words = ["apple", "banana", "cherry", "grape", "orange"];

const MemoryGame = () => {
  const [shuffledWords, setShuffledWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState("");
  const [guess, setGuess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setShuffledWords([...words].sort(() => Math.random() - 0.5));
    setSelectedWord(words[Math.floor(Math.random() * words.length)]);
  }, []);

  const handleGuess = (e) => {
    e.preventDefault();
    if (guess.toLowerCase() === selectedWord) {
      setMessage("Correct!");
    } else {
      setMessage("Try Again!");
    }
    setShowModal(true);
  };

  return (
    <div className="container text-center mt-5 game-container">
      <h2 className="title">Memory Game</h2>
      <p className="subtitle">Memorize the words and guess the hidden word!</p>
      <div className="word-container">
        {shuffledWords.map((word, index) => (
          <span key={index} className="word-badge">{word}</span>
        ))}
      </div>
      <Form onSubmit={handleGuess} className="mt-3">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Guess the word"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className="guess-input"
          />
        </Form.Group>
        <Button variant="success" type="submit" className="submit-button">
          Submit Guess
        </Button>
      </Form>
      <ReusableModal show={showModal} onHide={() => setShowModal(false)} title="Result">
        <p className="modal-message">{message}</p>
      </ReusableModal>
    </div>
  );
};

const ReusableModal = ({ show, onHide, title, children }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MemoryGame;
