import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "@/lib/prisma.js";

const userSchema = z.object({
    name: z.string(),
    email: z.string().trim().pipe(z.email()),
});

export async function RegisterUser(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const { name, email } = userSchema.parse(request.body);

    const user = await prisma.user.create({
        data: {
            name,
            email,
        },
    });

    return reply.status(201).send(user);
}
