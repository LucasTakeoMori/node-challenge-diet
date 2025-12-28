import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "@/lib/prisma.js";

const paramsSchema = z.object({ id: z.string() });

const updateMealBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    isOnDiet: z.boolean(),
});

export async function UpdateMeal(request: FastifyRequest, reply: FastifyReply) {
    const { id } = paramsSchema.parse(request.params);
    const { name, description, isOnDiet } = updateMealBodySchema.parse(
        request.body,
    );

    const meal = await prisma.meal.update({
        where: {
            id,
            userId: request.user.id,
        },
        data: {
            name,
            description,
            isOnDiet,
        },
    });

    return reply.status(200).send(meal);
}
