import { List } from "@raycast/api";
import { groupBy } from "es-toolkit";
import { use } from "react";
import { FavoriteContext } from "../favorite-context";
import { VolumeItem } from "./volume-item";

const ITEMS = Array.from({ length: 21 }, (_, i) => i * 5);

export function VolumeList() {
  const { favorites } = use(FavoriteContext);

  const items = groupBy(ITEMS, (item) => (favorites?.includes(item) ? "FAVORITE" : "OTHER"));

  const hasFavorites = items.FAVORITE && items.FAVORITE.length > 0;

  return (
    <List>
      {hasFavorites && (
        <List.Section title="Favorites">
          {items.FAVORITE.map((item) => (
            <VolumeItem key={item} value={item} />
          ))}
        </List.Section>
      )}
      <List.Section title="Volumes">
        {items.OTHER.map((item) => (
          <VolumeItem key={item} value={item} />
        ))}
      </List.Section>
    </List>
  );
}
