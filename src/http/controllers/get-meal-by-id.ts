import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "@/lib/prisma.js";

const paramsSchema = z.object({ id: z.string() });

export async function GetMealById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = paramsSchema.parse(request.params);

    const meal = await prisma.meal.findUnique({
        where: {
            id,
            userId: request.user.id,
        },
    });

    if (!meal) {
        return reply.status(404).send({ message: "Meal not found" });
    }

    return reply.send(meal);
}
