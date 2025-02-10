import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";

export function registerRoutes(app: Express): Server {
  // Set up authentication routes
  setupAuth(app);

  // Protected routes that require admin access
  app.use("/api/admin/*", (req, res, next) => {
    if (!req.isAuthenticated() || !req.user?.isAdmin) {
      return res.status(403).send("Admin access required");
    }
    next();
  });

  const httpServer = createServer(app);

  return httpServer;
}
