import { Action, ActionPanel, Icon, List, showHUD } from "@raycast/api";
import setVolume from "../tools/set-volume";
import { useFavorite } from "../hooks/use-favorite";

export type VolumeItemProps = {
  value: number;
};

export function VolumeItem({ value }: VolumeItemProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorite("volume");

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
            title={isFavorite(value) ? "Remove from Favorites" : "Add to Favorites"}
            icon={isFavorite(value) ? Icon.StarDisabled : Icon.Star}
            shortcut={{ modifiers: ["cmd", "shift"], key: "f" }}
            onAction={isFavorite(value) ? () => removeFavorite(value) : () => addFavorite(value)}
          />
        </ActionPanel>
      }
    />
  );
}
