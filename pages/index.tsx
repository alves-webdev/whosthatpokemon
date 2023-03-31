import axios from "axios";
import { useEffect, useState } from "react";
import type { pokemon } from "../assets/types";
import { useRouter } from "next/router";

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
  const [number, setNumber] = useState<number>(151);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function getPokemon() {
    setWrong(false);
    setCorrect(false);
    setIsLoading(true);
    const res = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/" + Math.floor(Math.random() * number)
    );
    if (res.data) {
    setPokemon(res.data);
    setSprites([
      res.data.sprites.versions["generation-v"]["black-white"].front_default
    ]);
    setIsLoading(false);
    setCorrect(false);
    setVisible(false);
    setWrong(false);
  } else {
    alert("Something went wrong");
    getPokemon();
  }
  }


  



  useEffect(() => {
    if (lives < 1) {
      setPokemon(undefined);
      setGameOver(true);
    }
  }, [lives]);



  const handlesubmit = () => {
    if (guess.toLowerCase() === pokemon?.name) {
      setSprites([
        pokemon?.sprites.versions["generation-v"]["black-white"].animated
          .front_default,
      ]);
      setScore(score + 1);
      setGuess("");
      setCorrect(true);
      setWrong(false);
      setVisible(true);
      setLives(lives);
    } else {
      setLives(lives - 1);
      setGuess("");
      setCorrect(false);
      setWrong(true);
      setVisible(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: { key: string; }) => {
      if (e.key === "Enter") {
        handlesubmit();
      }
    };
  
    document.addEventListener("keydown", handleKeyDown);
  
    // Cleanup function to remove previous event listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [guess, handlesubmit]);


  return (
    <div className="min-h-screen py-2 bg-slate-400 flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-center">
        <h1 className="text-4xl text-white font-bold drop-shadow-2xl">Score: {score}</h1>
        <h1 className="text-4xl text-white font-bold ml-5 drop-shadow-2xl">Lives: {lives}</h1>
      </div>
      <select onChange={(e) => setNumber(parseInt(e.target.value))} className="bg-slate-800 text-white text-2xl text-center mt-5 border-2 border-slate-600 rounded-xl">
        <option value="151">Kanto</option>
        <option value="251">Johto</option>
        <option value="386">Hoenn</option>
        <option value="493">Sinnoh</option>
        <option value="649">Unova</option>
      </select>
      <button
        disabled={isLoading || gameOver}
        onClick={getPokemon}
        className=" cursor-pointer flex flex-col 
        bg-slate-800 items-center justify-center p-4 rounded-lg shadow-lg mt-5
        hover:bg-slate-700 transition duration-500 ease-in-out h-96 w-96
        "
      >
        {pokemon === undefined && !gameOver ? (
          <h1
            className="text-4xl text-white font-bold animate-pulse"
          >Click me</h1>
        ) : (isLoading ? (
          <div role="status">
            <svg aria-hidden="true" className="inline w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : gameOver ? (
          <h1 className="text-4xl text-white font-bold">Game Over</h1>
        )

          : (
            <img
              src={sprites[0]}
              alt="pokemon"
              className={visible ? "w-80 h-90 hover:translate-y-1 hover:scale-110 transition duration-500 ease-in-out" : "w-80 h-90 hover:translate-y-1  filter contrast-0 hover:scale-110 transition duration-500 ease-in-out"}
            ></img>
          ))}
        {gameOver ? <div className="flex flex-col items-center justify-center">

          <h1 className="text-4xl text-white shadow-lg font-bold"
          >Score: {score}</h1>
          <div className="flex flex-row items-center justify-center">
            <button
              className="bg-slate-700 text-white font-bold p-2 rounded-lg shadow-lg hover:bg-slate-700 transition duration-500 ease-in-out w-56"
              onClick={() => {
                setScore(0);
                setLives(5);
                setGameOver(false);
              }}>Play Again</button>
          </div>
        </div>
          : null}
            { wrong && !gameOver ? <div className="flex flex-col items-center justify-center">
              <h1 className="text-1xl text-white font-bold">Wrong! the answer was <p className="text-1xl text-red-400 font-bold">
              {pokemon?.name}</p></h1>
              <h1 className="text-1xl text-white font-bold">click to try again</h1>
              </div>
            : correct && !gameOver ? <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl text-green-400 font-bold animate-bounce">Correct!</h1>
              <h1 className="text-1xl text-white font-bold">click to continue</h1>
              </div>
            : null}
      </button>
      {wrong || correct ? null : 
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
            handlesubmit();
          }}
        > Go </button>
      </div>
      }
    </div>
  );
}
