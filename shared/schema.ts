import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
});

export const movies = pgTable("movies", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  screenshots: text("screenshots").array(),
  downloadUrl: text("download_url").notNull(),
  downloadUrl480p: text("download_url_480p"),
  downloadUrl720p: text("download_url_720p"),
  downloadUrl1080p: text("download_url_1080p"),
  downloadUrl2160p: text("download_url_2160p"),
  fileSize480p: text("file_size_480p"),
  fileSize720p: text("file_size_720p"),
  fileSize1080p: text("file_size_1080p"),
  fileSize2160p: text("file_size_2160p"),
  category: text("category").notNull(),
  downloadCount: integer("download_count").default(0).notNull(),
  language: text("language").default("English").notNull(),
  releaseYear: text("release_year"),
  rating: text("rating"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertMovieSchema = createInsertSchema(movies).omit({
  id: true,
  downloadCount: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertMovie = z.infer<typeof insertMovieSchema>;
export type User = typeof users.$inferSelect;
export type Movie = typeof movies.$inferSelect;

export const MOVIE_CATEGORIES = [
  "Action",
  "Comedy",
  "Drama",
  "Mystery",
  "Adventure",
  "Romance",
  "Thriller",
  "Bollywood",
  "South",
  "Web Series"
] as const;