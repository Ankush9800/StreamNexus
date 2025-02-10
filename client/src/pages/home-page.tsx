import { useState } from "react";
import MovieGrid from "@/components/movie-grid";
import SearchBar from "@/components/search-bar";
import CategoryFilter from "@/components/category-filter";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center gap-4">
          <h1 className="text-xl font-bold">MovieFlix</h1>
          <div className="flex-1 max-w-xl">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>
        </div>
      </header>

      <main className="container py-6">
        <CategoryFilter
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <MovieGrid
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
        />
      </main>
    </div>
  );
}
