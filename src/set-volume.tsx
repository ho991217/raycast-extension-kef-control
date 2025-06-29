import { VolumeList } from "./components/volume-list";
import { FavoriteProvider } from "./favorite-context";

export default function Command() {
  return (
    <FavoriteProvider>
      <VolumeList />
    </FavoriteProvider>
  );
}
