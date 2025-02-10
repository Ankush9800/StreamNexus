import { Button } from "@/components/ui/button";
import { MOVIE_CATEGORIES } from "@shared/schema";

interface CategoryFilterProps {
  selected: string | null;
  onSelect: (category: string | null) => void;
}

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
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
