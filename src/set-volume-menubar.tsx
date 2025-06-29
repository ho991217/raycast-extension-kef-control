import { Icon, MenuBarExtra, open } from "@raycast/api";
import { useFavorite } from "./hooks/use-favorite";

export default function Command() {
  const { favorites, hasFavorites } = useFavorite("volume");

  return (
    <MenuBarExtra icon={Icon.Speaker} isLoading={!favorites} tooltip="Kef volume">
      {hasFavorites ? (
        favorites.map((favorite) => <MenuBarExtra.Item key={favorite} title={`${favorite}%`} onAction={() => {}} />)
      ) : (
        <MenuBarExtra.Section title="No favorites">
          <MenuBarExtra.Item
            title="Add preset to favorites"
            onAction={() => open("raycast://extensions/ho991217/kef-control/set-volume")}
          />
        </MenuBarExtra.Section>
      )}
    </MenuBarExtra>
  );
}
