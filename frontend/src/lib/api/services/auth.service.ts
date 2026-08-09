import { api, auth } from "@/lib/api/client";
import type { User } from "@/lib/api/types/auth.types";

export const authService = {
  login(username: string, password: string): { user: User } {
    auth.setCredentials(username, password);
    const user: User = { name: username, email: "" };
    return { user };
  },

  logout() {
    auth.clearCredentials();
  },

  isAuthenticated(): boolean {
    return auth.hasCredentials();
  },

  async getProfile(): Promise<User> {
    return { name: "admin", email: "" };
  },

  async updateProfile(data: { name?: string; email?: string }): Promise<User> {
    return { name: data.name || "admin", email: data.email || "" };
  },

  async changePassword(data: { currentPassword: string; newPassword: string }): Promise<void> {
    auth.setCredentials("admin", data.newPassword);
  },
};