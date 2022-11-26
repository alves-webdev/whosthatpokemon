import axios from "axios";
import { useEffect, useState } from "react";
import type { pokemon } from "../assets/types";

export default function App() {
  const [pokemon, setPokemon] = useState<pokemon>();
  const [guess, setGuess] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(5);
  const [sprites, setSprites] = useState<string[]>([]);
  const [correct, setCorrect] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [wrong, setWrong] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [number , setNumber] = useState<number>(151);

  async function getPokemon() {
    const res = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/" + Math.floor(Math.random() * number )
    );
    setPokemon(res.data);
    setSprites([
      res.data.sprites.versions["generation-v"]["black-white"].front_default
    ]);
    setCorrect(false);
    setVisible(false);
    setWrong(false);
  }

  useEffect(() => {
    if (lives === 0) {
      setGameOver(true);
    }
  }, [lives]);
  
  const handlesubmit = () => {
    if (guess.toLowerCase() === pokemon?.name) {
      setSprites([
        pokemon?.sprites.versions["generation-v"]["black-white"].animated.front_default,
      ]);
      setScore(score + 1);
      setGuess("");
      setCorrect(true);
      setVisible(true);
    } else {
      setLives(lives - 1);
      setGuess("");
      setWrong(true);
      setVisible(true);
    }
  }
  

  return (
    <div className="min-h-screen py-2 bg-slate-400">
      <select onChange={(e) => setNumber(parseInt(e.target.value))}>
        <option value="151">Kanto</option>
        <option value="251">Johto</option>
        <option value="386">Hoenn</option>
        <option value="493">Sinnoh</option>
        <option value="649">Unova</option>
      </select>
      <div
        onClick={getPokemon}
        className=" cursor-pointer flex flex-col bg-slate-800 items-center justify-center p-4 rounded-lg shadow-lg
        mx-auto w-96"
      >
        {pokemon === undefined ? (
          <div className="animate-pulse">
            <h1
            className="text-4xl text-white font-bold"
            >Click me</h1>
          </div>
        ) : (
        <img
          src={sprites[0]}
          alt="pokemon"
          className={ visible ? "w-80 h-90 hover:translate-y-1 hover:scale-110 transition duration-500 ease-in-out" : "w-80 h-90 hover:translate-y-1  filter contrast-0 hover:scale-110 transition duration-500 ease-in-out"}
        ></img>
        
        )}
        {gameOver ? <h1>
          Game Over <br></br> Score: {score} <br></br> <button
          className="bg-slate-800 text-white font-bold p-2 rounded-lg shadow-lg hover:bg-slate-700 transition duration-500 ease-in-out"
          onClick={() => {
            setScore(0);
            setLives(5);
            setGameOver(false);
          }}>Play Again</button>
        </h1>
        : null}
        {correct ? <h1
        className="text-2xl text-green-500"
        >CORRECT <br/>
        <h3>click again to continue</h3></h1> : null}
        {wrong ? <h1
        className="text-2xl text-red-500"
        >WRONG <br/>it's {pokemon?.name}</h1> : null}
      </div>
      <div className="flex flex-row items-center justify-center">
      <input
        placeholder="Who's that pokémon?"
        className="bg-slate-800 text-white text-2xl text-center mt-5 border-2 border-slate-600 rounded-xl"
        onChange={(e) => setGuess(e.target.value)}
      ></input>
      <button 
      disabled={gameOver}
      type="submit" className="bg-slate-800 text-white text-2xl text-center mt-5 border-2 border-slate-600 rounded-xl"
      onClick={() => {
        if (guess.toLowerCase() === pokemon?.name) {
          setSprites([
            pokemon?.sprites.versions["generation-v"]["black-white"].animated.front_default,
          ]);
          setScore(score + 1);
          setCorrect(true);
          setVisible(true);
          setWrong(false);
        } else {
          setLives(lives - 1);
          setGuess("");
          setVisible(true);
          setWrong(true);
          setCorrect(false);
        }
      }}
      > Go </button>
      </div>
      <h1 className="text-6xl font-bold text-center">Score: {score}</h1>
      <h1 className="text-6xl font-bold text-center">Lives: {lives}</h1>
    </div>
  );
}
