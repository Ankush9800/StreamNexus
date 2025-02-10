import { useState } from "react";
import { Movie } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MovieForm from "@/components/admin/movie-form";
import AnalyticsDashboard from "@/components/admin/analytics-dashboard";
import { getMovies, addMovie, updateMovie, deleteMovie } from "@/lib/movies";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function AdminPage() {
  const [movies, setMovies] = useState<Movie[]>(getMovies());
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const { toast } = useToast();

  const handleAddMovie = (data: Omit<Movie, "id" | "downloadCount">) => {
    const newMovie = addMovie(data);
    setMovies(getMovies());
    toast({
      title: "Success",
      description: "Movie added successfully",
    });
  };

  const handleUpdateMovie = (data: Omit<Movie, "id" | "downloadCount">) => {
    if (!editingMovie) return;
    updateMovie(editingMovie.id, data);
    setMovies(getMovies());
    setEditingMovie(null);
    toast({
      title: "Success",
      description: "Movie updated successfully",
    });
  };

  const handleDeleteMovie = (id: number) => {
    if (confirm("Are you sure you want to delete this movie?")) {
      deleteMovie(id);
      setMovies(getMovies());
      toast({
        title: "Success",
        description: "Movie deleted successfully",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl py-6 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Movie
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Movie</DialogTitle>
              </DialogHeader>
              <MovieForm onSubmit={handleAddMovie} />
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="movies" className="space-y-6">
          <TabsList className="justify-center">
            <TabsTrigger value="movies">Movies</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="movies">
            <div className="grid gap-4 max-w-4xl mx-auto">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={movie.imageUrl}
                      alt={movie.title}
                      className="w-16 h-24 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold">{movie.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {movie.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setEditingMovie(movie)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Movie</DialogTitle>
                        </DialogHeader>
                        <MovieForm
                          initialData={movie}
                          onSubmit={handleUpdateMovie}
                        />
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteMovie(movie.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="max-w-4xl mx-auto">
              <AnalyticsDashboard movies={movies} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}