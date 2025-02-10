import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { getMovies } from "@/lib/movies";
import { Movie } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Download, MessageCircle, Star } from "lucide-react";

const TELEGRAM_LINK = "https://t.me/movie_db1";

export default function MovieDetailsPage() {
  const [, params] = useRoute("/movie/:id");
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (params?.id) {
      const movies = getMovies();
      const foundMovie = movies.find((m) => m.id === parseInt(params.id));
      setMovie(foundMovie || null);
    }
  }, [params?.id]);

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Movie not found</p>
      </div>
    );
  }

  const downloadOptions = [
    { quality: "480p", url: movie.downloadUrl480p },
    { quality: "720p", url: movie.downloadUrl720p },
    { quality: "1080p", url: movie.downloadUrl1080p },
    { quality: "2160p", url: movie.downloadUrl2160p },
  ].filter((option) => option.url); // Only show options with valid URLs

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header with movie title and time */}
      <header className="relative h-[60vh] w-full">
        <div className="absolute inset-0">
          <img
            src={movie.imageUrl}
            alt={movie.title}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>
        <div className="absolute bottom-0 w-full p-6">
          <div className="container max-w-6xl mx-auto">
            <div className="flex justify-between items-end">
              <h1 className="text-4xl font-bold">{movie.title}</h1>
              <div className="flex items-center text-muted-foreground">
                <Clock className="w-4 h-4 mr-2" />
                <time>Added recently</time>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto py-8 px-4">
        {/* Join Telegram Channel Button */}
        <div className="mb-8 text-center">
          <Button
            variant="outline"
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => window.open(TELEGRAM_LINK, "_blank")}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Join our Telegram Channel for Updates
          </Button>
        </div>

        {/* Movie Details Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Movie Details</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <p className="text-muted-foreground">Category</p>
              <Badge variant="outline">{movie.category}</Badge>
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground">Language</p>
              <Badge variant="outline">{movie.language}</Badge>
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground">Rating</p>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span>{movie.rating || "N/A"}</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground">Release Year</p>
              <p>{movie.releaseYear || "N/A"}</p>
            </div>
          </div>
        </section>

        {/* Description Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Synopsis</h2>
          <p className="text-muted-foreground leading-relaxed">
            {movie.description}
          </p>
        </section>

        {/* Screenshots Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Screenshots</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[movie.imageUrl, movie.imageUrl, movie.imageUrl].map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Screenshot ${i + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            ))}
          </div>
        </section>

        {/* Download Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Download Options</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {downloadOptions.map(({ quality, url }) => (
              <Button
                key={quality}
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => window.open(url, "_blank")}
              >
                <Download className="mr-2 h-4 w-4" />
                Download {quality}
              </Button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}