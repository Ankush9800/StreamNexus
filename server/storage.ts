import { users, type User, type InsertUser } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import { scrypt } from "crypto";
import { promisify } from "util";

const MemoryStore = createMemoryStore(session);
const scryptAsync = promisify(scrypt);

// Helper function to hash password
async function hashPassword(password: string) {
  const buf = (await scryptAsync(password, 'salt', 64)) as Buffer;
  return buf.toString('hex');
}

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  currentId: number;
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });

    // Create initial admin user
    this.initializeAdminUser();
  }

  private async initializeAdminUser() {
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    // Create admin user if it doesn't exist
    const existingAdmin = await this.getUserByUsername(adminUsername);
    if (!existingAdmin) {
      const hashedPassword = await hashPassword(adminPassword);
      const adminUser: User = {
        id: this.currentId++,
        username: adminUsername,
        password: hashedPassword,
        isAdmin: true
      };
      this.users.set(adminUser.id, adminUser);
      console.log(`Admin user created with username: ${adminUsername}`);
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      ...insertUser, 
      id,
      isAdmin: false // Regular users can't be admins
    };
    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();