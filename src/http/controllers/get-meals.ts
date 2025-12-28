import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "@/lib/prisma.js";

export async function GetMeals(request: FastifyRequest, reply: FastifyReply) {
    const meals = await prisma.meal.findMany({
        where: {
            userId: request.user.id,
        },
    });

    return reply.send(meals);
}
