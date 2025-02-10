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
  downloadUrl: text("download_url").notNull(),
  category: text("category").notNull(),
  downloadCount: integer("download_count").default(0).notNull(),
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