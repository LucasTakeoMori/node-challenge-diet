import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "@/lib/prisma.js";

const paramsSchema = z.object({ id: z.string() });

export async function DeleteMeal(request: FastifyRequest, reply: FastifyReply) {
    const { id } = paramsSchema.parse(request.params);

    await prisma.meal.delete({
        where: {
            id,
            userId: request.user.id,
        },
    });

    return reply.status(204).send();
}
