import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { Movie } from "@shared/schema";

interface AnalyticsDashboardProps {
  movies: Movie[];
}

export default function AnalyticsDashboard({ movies }: AnalyticsDashboardProps) {
  const totalDownloads = movies.reduce((sum, movie) => sum + movie.downloadCount, 0);
  const topMovies = [...movies]
    .sort((a, b) => b.downloadCount - a.downloadCount)
    .slice(0, 5);

  const categoryData = movies.reduce((acc, movie) => {
    const existing = acc.find((item) => item.category === movie.category);
    if (existing) {
      existing.downloads += movie.downloadCount;
    } else {
      acc.push({ category: movie.category, downloads: movie.downloadCount });
    }
    return acc;
  }, [] as { category: string; downloads: number }[]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total Downloads</CardTitle>
          <CardDescription>Across all movies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{totalDownloads}</div>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Downloads by Category</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="downloads" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Top Movies</CardTitle>
          <CardDescription>By download count</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {topMovies.map((movie) => (
              <div
                key={movie.id}
                className="flex items-center justify-between py-2 border-b"
              >
                <span className="font-medium">{movie.title}</span>
                <span className="text-muted-foreground">{movie.downloadCount} downloads</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
