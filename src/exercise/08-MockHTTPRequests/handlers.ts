import { rest } from "msw";

export const handlers = [
  rest.post("https://auth-provider.example.com/api/login", (req, res, ctx) => {
    const { username, password } = req.body as { username?: string; password?: string };

    if (!username || !password) {
      return res(ctx.status(400), ctx.json({ message: "Missing credentials" }));
    }

    if (username === "admin" && password === "admin123") {
      return res(ctx.json({ username }));
    }

    return res(ctx.status(401), ctx.json({ message: "Invalid credentials" }));
  })
];
