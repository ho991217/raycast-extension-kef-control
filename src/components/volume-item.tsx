import { Action, ActionPanel, Icon, List, showHUD } from "@raycast/api";
import setVolume from "../tools/set-volume";
import { use } from "react";
import { FavoriteContext } from "../favorite-context";

export type VolumeItemProps = {
  value: number;
};

export function VolumeItem({ value }: VolumeItemProps) {
  const { favorites, setFavorites } = use(FavoriteContext);

  const isFavorite = favorites?.includes(value);

  const addToFavorites = () => {
    const newValue = [...(favorites ?? []), value].sort((a, b) => a - b);
    setFavorites(newValue);
    showHUD(`Volume ${value}% added to favorites`);
  };

  const removeFromFavorites = () => {
    const newValue = (favorites ?? []).filter((v) => v !== value).sort((a, b) => a - b);
    setFavorites(newValue);
    showHUD(`Volume ${value}% removed from favorites`);
  };

  return (
    <List.Item
      key={value}
      title={`Volume ${value}%`}
      subtitle={`Set volume to ${value}%`}
      actions={
        <ActionPanel>
          <Action
            title="Set Volume"
            icon={Icon.Speaker}
            onAction={async () => {
              await setVolume(value);
              showHUD(`Volume set to ${value}%`);
            }}
          />
          <Action
            title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            icon={isFavorite ? Icon.StarDisabled : Icon.Star}
            shortcut={{ modifiers: ["cmd", "shift"], key: "f" }}
            onAction={isFavorite ? removeFromFavorites : addToFavorites}
          />
        </ActionPanel>
      }
    />
  );
}
