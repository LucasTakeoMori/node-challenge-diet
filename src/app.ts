import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { env } from "@/env/index.js";
import { appRoutes } from "./http/routes.js";

declare module "fastify" {
    interface FastifyInstance {
        authenticate: (
            request: FastifyRequest,
            reply: FastifyReply,
        ) => Promise<void>;
    }
}

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

app.decorate("authenticate", async (request, reply) => {
    try {
        await request.jwtVerify();
    } catch (err) {
        console.error(err);
        reply.status(401).send({ message: "Não autorizado" });
    }
});

app.register(appRoutes);
