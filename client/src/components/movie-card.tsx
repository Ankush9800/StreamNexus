import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { Movie } from "@shared/schema";
import { Link } from "wouter";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
      <Link href={`/movie/${movie.id}`}>
        <AspectRatio ratio={2/3}>
          <img
            src={movie.imageUrl}
            alt={movie.title}
            className="object-cover w-full h-full transition-transform group-hover:scale-105 cursor-pointer"
          />
        </AspectRatio>
      </Link>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold line-clamp-1">{movie.title}</h3>
          <Badge variant="secondary">{movie.category}</Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {movie.description}
        </p>
      </CardContent>
    </Card>
  );
}