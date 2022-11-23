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

  async function getPokemon() {
    const res = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/" + Math.floor(Math.random() * 151)
    );
    setPokemon(res.data);
    setSprites([
      res.data.sprites.versions["generation-v"]["black-white"].front_default
    ]);
    setCorrect(false);
    setVisible(false);
  }


  return (
    <div className="min-h-screen py-2 bg-slate-400">
      <div
        onClick={getPokemon}
        className=" cursor-pointer flex flex-col bg-slate-800 items-center justify-center p-4 rounded-lg shadow-lg
        mx-auto w-96"
      >

        <img
          src={sprites[0]}
          alt="pokemon"
          className={ visible ? "w-80 h-90 hover:translate-y-1 hover:scale-110 transition duration-500 ease-in-out" : "w-80 h-90 hover:translate-y-1  filter contrast-0 hover:scale-110 transition duration-500 ease-in-out"}
        ></img>
        {correct ? <h1
        className="text-2xl text-green-500"
        >acerto mizeravi</h1> : null}
      </div>
      <div className="flex flex-row items-center justify-center">
      <input
        placeholder="Who's that pokémon?"
        className="bg-slate-800 text-white text-2xl text-center mt-5 border-2 border-slate-600 rounded-xl"
        onChange={(e) => setGuess(e.target.value)}
      ></input>
      <button className="bg-slate-800 text-white text-2xl text-center mt-5 border-2 border-slate-600 rounded-xl"
      onClick={() => {
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
          alert("wrong");
          getPokemon();
        }
      }}
      > Go </button>
      </div>
      <h1 className="text-6xl font-bold text-center">Score: {score}</h1>
      <h1 className="text-6xl font-bold text-center">Lives: {lives}</h1>
    </div>
  );
}
