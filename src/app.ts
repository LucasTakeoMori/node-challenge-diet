import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { env } from "@/env/index.js";
import { appRoutes } from "./http/routes.js";

declare module "@fastify/jwt" {
    interface FastifyJWT {
        payload: { id: string; email: string };
        user: { id: string; email: string };
    }
}

export const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
});

app.register(appRoutes);
