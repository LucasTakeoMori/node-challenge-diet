import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "@/lib/prisma.js";
import { app } from "@/app.js";

const loginBodySchema = z.object({
    email: z.string().trim().pipe(z.email()),
});

export async function Login(request: FastifyRequest, reply: FastifyReply) {
    const { email } = loginBodySchema.parse(request.body);

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        return reply.status(401).send({ message: "Usuário não encontrado" });
    }

    const token = app.jwt.sign(
        {
            id: user.id,
            email: user.email,
        },
        {
            expiresIn: "1h",
        },
    );

    return reply.send({ token });
}
