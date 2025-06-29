import { useLocalStorage } from "@raycast/utils";
import { createContext, useCallback, useState } from "react";

export const FavoriteContext = createContext<{
  favorites: number[];
  setFavorites: (favorites: number[]) => void;
}>({
  favorites: [],
  setFavorites: () => {},
});

export const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
  const { value, setValue } = useLocalStorage<number[]>("favorites");
  const [favorites, _setFavorites] = useState<number[]>(value ?? []);

  const setFavorites = useCallback(
    (favorites: number[]) => {
      _setFavorites(favorites);
      setValue(favorites);
    },
    [setValue, _setFavorites],
  );

  return <FavoriteContext.Provider value={{ favorites, setFavorites }}>{children}</FavoriteContext.Provider>;
};
