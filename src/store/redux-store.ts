import { Pokemon } from "@/pages/pokemon";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import logger from "redux-logger";

const initialState: Pokemon[] = [];


const pokedexSlice = createSlice({
  initialState,
  name: "pokedex",
  reducers: {
    addPokemon: (state, action: PayloadAction<Pokemon>) => {
      state.push(action.payload);
      return state;
    },
  },
});

export const { addPokemon } = pokedexSlice.actions;
export const store = configureStore({
  reducer: {
    pokedex: pokedexSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
    },
  }).concat(logger),
});
export type RootState = ReturnType<typeof store.getState>;

