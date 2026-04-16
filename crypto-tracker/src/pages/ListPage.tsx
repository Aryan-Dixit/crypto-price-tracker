import { useState, useMemo } from "react";
import { SYMBOLS } from "../constants/symbols";
import { useFavoritesStore } from "../store/useFavoritesStore";
import MarketTable from "../components/Market/MarketTable";

import styles from "./ListPage.module.css";
import StressControl from "../components/Controls/StressControl";

export default function ListPage() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"all" | "favorites">("all");

  const { favorites } = useFavoritesStore();

  const filtered = useMemo(() => {
    return SYMBOLS.filter(
      (item) =>
        item.symbol.toLowerCase().includes(search.toLowerCase()) ||
        item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const favoriteData = useMemo(() => {
    return SYMBOLS.filter((s) => favorites.includes(s.symbol));
  }, [favorites]);

  const data = tab === "all" ? filtered : favoriteData;

  return (
    <div className={styles.container}>
      <div className={styles.title}>Crypto Markets</div>
      <StressControl />

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          onClick={() => setTab("all")}
          className={`${styles.tabButton} ${
            tab === "all" ? styles.activeTab : ""
          }`}
        >
          All
        </button>

        <button
          onClick={() => setTab("favorites")}
          className={`${styles.tabButton} ${
            tab === "favorites" ? styles.activeTab : ""
          }`}
        >
          Favorites
        </button>
      </div>

      {/* Search */}
      <input
        className={styles.searchInput}
        placeholder="Search by name or symbol..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <MarketTable data={data} />
    </div>
  );
}