import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pokemon } from "@/pages/pokemon";
import { DialogDescription } from "@radix-ui/react-dialog";
import { ReactNode, useEffect, useState } from "react";


const CAUGHT_STATE = {
  CATCHING: 1,
  CAUGHT: 2,
  UNCAUGHT: 3,
};

function PokemonCatchModal({
  pokemon,
  children,
  open,
  onOpenChange,
  onCaught,
}: {
  pokemon: Pokemon;
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCaught: (pokemon: Pokemon) => void;
}) {
  const images = [
    pokemon.sprites.front_default,
    pokemon.sprites.front_shiny,
    pokemon.sprites.back_default,
    pokemon.sprites.back_shiny,
  ];

  const [pokemonCatchStatus, setPokemonCatchStatus] = useState(
    CAUGHT_STATE.CATCHING
  );

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    setPokemonCatchStatus(CAUGHT_STATE.CATCHING);
    if (open) {
      const probability = Math.random() * 100;
      timeoutId = setTimeout(() => {
        if (probability > 50) {
          setPokemonCatchStatus(CAUGHT_STATE.CAUGHT);
          onCaught(pokemon);
        } else {
          setPokemonCatchStatus(CAUGHT_STATE.UNCAUGHT);
        }
      }, 2000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [open, onCaught, pokemon, onOpenChange]);

  return (
    <Dialog modal onOpenChange={onOpenChange} open={open}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Catching {pokemon.name} ...</DialogTitle>
          <div className="flex justify-between">
            {images.map((img) => (
              <img
                key={img}
                className={`w-24 h-24 animate-[spin_2000ms_linear_infinite]${pokemonCatchStatus !== CAUGHT_STATE.CATCHING ? "animate-none" : ""}`}
                src={img}
              ></img>
            ))}
          </div>
          <div>
            {pokemonCatchStatus === CAUGHT_STATE.CATCHING &&
              "Catching wait for it!!"}
            {pokemonCatchStatus === CAUGHT_STATE.CAUGHT && <span className="text-green-500 font-bold">"You Caught it!!"</span>}
            {pokemonCatchStatus === CAUGHT_STATE.UNCAUGHT &&
              "Better Luck next time"}
          </div>
        </DialogHeader>
        <DialogDescription></DialogDescription>
      </DialogContent>
    </Dialog>
  );
}


export default PokemonCatchModal
