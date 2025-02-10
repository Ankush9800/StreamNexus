import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";
import type { Movie } from "@shared/schema";
import { incrementDownload } from "@/lib/movies";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const handleDownload = () => {
    incrementDownload(movie.id);
    window.open(movie.downloadUrl, "_blank");
  };

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
      <AspectRatio ratio={2/3}>
        <img
          src={movie.imageUrl}
          alt={movie.title}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
      </AspectRatio>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold line-clamp-1">{movie.title}</h3>
          <Badge variant="secondary">{movie.category}</Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {movie.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleDownload}
          className="w-full"
          variant="default"
        >
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
}
