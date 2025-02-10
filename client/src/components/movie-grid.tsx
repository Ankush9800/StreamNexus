import { useEffect, useState } from "react";
import { Movie } from "@shared/schema";
import MovieCard from "./movie-card";
import { getMovies } from "@/lib/movies";

interface MovieGridProps {
  searchTerm: string;
  selectedCategory: string | null;
}

export default function MovieGrid({ searchTerm, selectedCategory }: MovieGridProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const moviesPerPage = 12;

  useEffect(() => {
    setMovies(getMovies());
  }, []);

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || movie.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const displayedMovies = filteredMovies.slice(0, page * moviesPerPage);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        if (displayedMovies.length < filteredMovies.length) {
          setPage((p) => p + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [displayedMovies.length, filteredMovies.length]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {displayedMovies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
