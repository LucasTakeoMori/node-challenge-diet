import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "@/lib/prisma.js";

export async function GetMealsMetrics(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const meals = await prisma.meal.findMany({
        where: {
            userId: request.user.id,
        },
        orderBy: {
            dateTime: "asc",
        },
    });

    let currentStreak = 0;
    let bestStreak = 0;

    const totalMeals = meals.length;
    const mealsOnDiet = meals.filter((item) => item.isOnDiet === true).length;
    const mealsOffDiet = meals.filter((item) => item.isOnDiet === false).length;

    for (const meal of meals) {
        if (meal.isOnDiet) {
            currentStreak++;
            bestStreak = Math.max(bestStreak, currentStreak);
        } else {
            currentStreak = 0;
        }
    }

    return reply.send({
        totalMeals,
        mealsOnDiet,
        mealsOffDiet,
        currentStreak,
        bestStreak
    })
}
