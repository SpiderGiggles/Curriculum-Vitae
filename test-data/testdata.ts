export interface UserCredentials {
  email: string;
  password: string;
}

export const getUserCredentials = (): UserCredentials => ({
  email: process.env.USER_EMAIL ?? "demo@example.com",
  password: process.env.USER_PASSWORD ?? "Password123!",
});
