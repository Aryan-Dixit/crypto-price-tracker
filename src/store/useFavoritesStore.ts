import { create } from "zustand";

interface FavoritesState {
  favorites: string[];
  toggle: (symbol: string) => void;
  isFavorite: (symbol: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),

  toggle: (symbol) => {
    const current = get().favorites;

    const updated = current.includes(symbol)
      ? current.filter((s) => s !== symbol)
      : [...current, symbol];

    localStorage.setItem("favorites", JSON.stringify(updated));
    set({ favorites: updated });
  },

  isFavorite: (symbol) => {
    return get().favorites.includes(symbol);
  },
}));