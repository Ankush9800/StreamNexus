import { Button } from "@/components/ui/button";
import { MOVIE_CATEGORIES } from "@shared/schema";

interface CategoryFilterProps {
  selected: string | null;
  onSelect: (category: string | null) => void;
}

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex justify-center flex-wrap gap-2 pb-4">
      <Button
        variant={selected === null ? "default" : "outline"}
        onClick={() => onSelect(null)}
      >
        All
      </Button>
      {MOVIE_CATEGORIES.map((category) => (
        <Button
          key={category}
          variant={selected === category ? "default" : "outline"}
          onClick={() => onSelect(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}