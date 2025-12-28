import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "@/lib/prisma.js";

export async function GetUsers(request: FastifyRequest, reply: FastifyReply) {
    const users = await prisma.user.findMany({
        orderBy: {
            email: "asc",
        },
    });

    return reply.send(users);
}
