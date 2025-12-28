import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { prisma } from "@/lib/prisma.js";

const mealSchema = z.object({
    name: z.string(),
    description: z.string(),
    isOnDiet: z.boolean(),
    dateTime: z.string().datetime(),
});

export async function RegisterMeal(request: FastifyRequest, reply: FastifyReply) {
    const { name, description, isOnDiet, dateTime } = mealSchema.parse(
        request.body,
    );

    const meal = await prisma.meal.create({
        data: {
            name,
            description,
            isOnDiet,
            dateTime,
            userId: request.user.id,
        },
    });

    return reply.status(201).send(meal);
}
