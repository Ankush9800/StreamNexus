import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMovieSchema, type InsertMovie, MOVIE_CATEGORIES } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MovieFormProps {
  initialData?: InsertMovie;
  onSubmit: (data: InsertMovie) => void;
}

export default function MovieForm({ initialData, onSubmit }: MovieFormProps) {
  const form = useForm<InsertMovie>({
    resolver: zodResolver(insertMovieSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      imageUrl: "",
      screenshots: [],
      downloadUrl: "",
      downloadUrl480p: "",
      downloadUrl720p: "",
      downloadUrl1080p: "",
      downloadUrl2160p: "",
      fileSize480p: "",
      fileSize720p: "",
      fileSize1080p: "",
      fileSize2160p: "",
      category: MOVIE_CATEGORIES[0],
      language: "English",
      releaseYear: new Date().getFullYear().toString(),
      rating: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Screenshots Section */}
        <div className="space-y-4">
          <h3 className="font-medium">Screenshots</h3>
          <FormField
            control={form.control}
            name="screenshots"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Screenshot URLs (one per line)</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    value={field.value?.join('\n') ?? ''} 
                    onChange={(e) => {
                      const urls = e.target.value
                        .split('\n')
                        .map(url => url.trim())
                        .filter(url => url.length > 0);
                      field.onChange(urls);
                    }}
                    placeholder="https://example.com/screenshot1.jpg&#10;https://example.com/screenshot2.jpg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Download Links Section */}
        <div className="space-y-4">
          <h3 className="font-medium">Download Links</h3>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="downloadUrl480p"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>480p Download URL</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} placeholder="Google Drive link for 480p" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fileSize480p"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>480p File Size</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} placeholder="e.g. 700MB" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="downloadUrl720p"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>720p Download URL</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} placeholder="Google Drive link for 720p" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fileSize720p"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>720p File Size</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} placeholder="e.g. 1.2GB" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="downloadUrl1080p"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>1080p Download URL</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} placeholder="Google Drive link for 1080p" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fileSize1080p"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>1080p File Size</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} placeholder="e.g. 2.5GB" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="downloadUrl2160p"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>4K (2160p) Download URL</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} placeholder="Google Drive link for 4K" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fileSize2160p"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>4K File Size</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} placeholder="e.g. 8GB" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {MOVIE_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="releaseYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Release Year</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} placeholder="e.g. 8.5/10" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {initialData ? "Update Movie" : "Add Movie"}
        </Button>
      </form>
    </Form>
  );
}