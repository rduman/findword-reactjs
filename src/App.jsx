import React, { useState, useEffect } from 'react'

import Score from './components/Score';
import Questions from './components/Questions';
import Finish from './components/Finish';

export default () => {
    const [totalScore, setTotalScore] = useState(0);
    const [message, setMessage] = useState(null);
    const [time, setTime] = useState(null);
    const [game, setGame] = useState({
        currentQuestion: null,
        questions: [
            {
                question: "What name is given to a person who is against increasing the powers of the European Union?",
                answer: "EUROSCEPTIC",
                asked: false,
            },
            {
                question: "Which of these are located at the back of your throat?",
                answer: "ADENOIDS",
                asked: false,
            },
            {
                question: "Which of these is the French word for king?",
                answer: "ROI",
                asked: false,
            },
            {
                question: "Which one of these is not a European river?",
                answer: "MISSOURI",
                asked: false,
            },
            {
                question: "The national police force of Ireland is known as what?",
                answer: "GARDA",
                asked: false,
            }
        ],
        characters: [],
        score: 0,
        charactersScore: 0,
        time: null,
        destinationTime: 0,
        finish: false,
        competitorAnswer: "",
        message: "",
        messageVisibleTime: null,
        messageClass: "bg-info text-white"
    })
    const viweMessage = (message, type) => {
        if (type === "error") {
            setMessage({ message, style: "bg-danger text-white" });
        } else if (type === "success") {
            setMessage({ message, style: "bg-success text-white" });
        } else {
            setMessage({ message, style: "bg-dark text-white" });
        }
    }
    useEffect(() => {
        if (time && time.timer > 0) {
            const timeInterval = setInterval(() => {
                setTime({ ...time, timer: time.timer - 1 })
            }, 1000);

            return () => {
                clearInterval(timeInterval);
            }
        }
    });

    const startGame = () => {
        setTime({
            timer: 240,
            timeout: function () {

            }

        });

        setMessage(null);
        setTotalScore(0);
        setGame({
            ...game,
            questions: game.questions.map(q => {
                q.asked = false;
                return q;
            }),
            score: 0,
            charactersScore: 0,
            finish: false
        })

        askQuestion();
    }
    const getCharachter = () => {
        if (game.charactersScore <= 100) {
            return;
        }
        let randonCharIndex = Math.floor(Math.random() * game.characters.length);
        let character = game.characters[randonCharIndex];
        if (character.open) {
            let randonCharIndex = Math.floor(Math.random() * game.characters.length);
            let character = game.characters[randonCharIndex];
        }
        setGame({
            ...game, characters: game.characters.map((h, index) => {
                if (index === randonCharIndex) {
                    h.open = true;
                }
                return h;
            }),
            charactersScore: game.charactersScore - 100
        })

    }
    const askQuestion = () => {
        let questions = game.questions;
        let currentQuestion = game.questions.find(questions => !questions.asked);
        if (!currentQuestion) {
            gameOver();
            return;
        }
        let characters = [];
        currentQuestion.answer.split("").map(h => {
            characters.push({
                value: h,
                open: false
            });
        });
        currentQuestion.asked = true;
        setGame({
            ...game,
            currentQuestion,
            characters,
            questions,
            charactersScore: characters.length * 100,
            competitorAnswer: ""
        });
    }
    const answer = () => {
        let total = totalScore;
        if (
            game.competitorAnswer.toLocaleUpperCase("tr") ===
            game.currentQuestion.answer.toLocaleUpperCase("tr")) {
            setTotalScore(total);
            viweMessage("Congrat!, Corret", "success");
        } else {
            total -= game.charactersScore
            viweMessage("Oops!, Wrong.", "error");
        }
        setTotalScore(total);
        askQuestion();
    }

    const gameOver = () => {
        debugger;
        setGame({
            ...game,
            finish: true,
            currentQuestion: null,
            characters: []
        });
    }

    const answerChanged = e => {
        setGame({
            ...game,
            competitorAnswer: e.target.value
        })
    }
    return (
        <div className="container mt-4">
            {!game.currentQuestion && (
                <div className="card mb-4">
                    <div className="card-header"><h4 className="mb-0">Welcome to Word Game</h4></div>
                    <div className="card-body"><p className="mb-0">Click start button</p></div>
                    <div className="card-footer">
                        <button className="btn btn-primary" onClick={startGame}>Start Game</button>
                    </div>
                </div>
            )}
            <Finish finish={game.finish} totalScore={totalScore}></Finish>
            {
                game.currentQuestion && (
                    <div className="card mb-4">
                        <Questions question={game.currentQuestion.question} characters={game.characters}></Questions>
                        <Score totalScore={totalScore} charactersScore={game.charactersScore} timer={time.timer}></Score>
                        <div className="card-footer">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Your answer" value={game.competitorAnswer} onChange={answerChanged} />
                                <div className="input-group-append">
                                    <button className="btn btn-success" type="button" onClick={answer}>Answer</button>
                                    <button className="btn btn-dark" type="button" onClick={getCharachter}>Get Character</button>
                                </div>
                            </div>
                            {message && (
                                <div className={"card-footer " + message.style}>
                                    {message.message}
                                </div>
                            )}

                        </div>
                    </div>
                )}
        </div>
    )
}
