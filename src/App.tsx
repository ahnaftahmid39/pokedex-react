import Index from "@/pages";
import Locations from "@/pages/locations";
import Pokedex from "@/pages/pokedex";
import PokemonDetail from "@/pages/pokemon";
import PokemonInLocation from "@/pages/pokemon_in_location";
import { NavLink, Outlet, Route, Routes } from "react-router";
import { Button } from "./components/ui/button";

function App() {
  return (
    <div className="flex h-svh flex-col">
      <nav className="flex gap-2 py-2 border-b">
        <NavLink to={"/"}>
          <Button variant={"link"}>Home</Button>
        </NavLink>
        <NavLink to={"/pokeapi/location"}>
          <Button variant={"link"}>Locations</Button>
        </NavLink>
        <NavLink to={"/pokeapi/pokedex"}>
          <Button variant={"link"}>Pokedex</Button>
        </NavLink>
      </nav>
      <Routes>
        <Route element={<div className="p-4"><Outlet /></div>}>
          <Route path="/" element={<Index />} />
          <Route path="/pokeapi/location" element={<Locations />} />
          <Route path="/pokeapi/location/:name" element={<PokemonInLocation />} />
          <Route path="/pokeapi/pokemon/:name" element={<PokemonDetail />} />
          <Route path="/pokeapi/pokedex" element={<Pokedex />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
