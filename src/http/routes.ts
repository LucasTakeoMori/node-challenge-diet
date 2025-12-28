import type { FastifyInstance } from "fastify";
import { DeleteMeal } from "./controllers/delete-meal.js";
import { GetMealById } from "./controllers/get-meal-by-id.js";
import { GetMeals } from "./controllers/get-meals.js";
import { GetMealsMetrics } from "./controllers/get-meals-metrics.js";
import { GetUsers } from "./controllers/get-users.js";
import { Login } from "./controllers/login.js";
import { RegisterMeal } from "./controllers/register-meal.js";
import { RegisterUser } from "./controllers/register-user.js";
import { UpdateMeal } from "./controllers/update-meal.js";

export async function appRoutes(app: FastifyInstance) {
    app.post("/login", Login);

    app.post("/users", RegisterUser);
    app.get("/users", GetUsers);

    app.post("/meals", { preHandler: [app.authenticate] }, RegisterMeal);
    app.get("/meals", { preHandler: [app.authenticate] }, GetMeals);
    app.get("/meals/metrics", { preHandler: [app.authenticate] }, GetMealsMetrics);
    app.get("/meals/:id", { preHandler: [app.authenticate] }, GetMealById);
    app.put("/meals/:id", { preHandler: [app.authenticate] }, UpdateMeal);
    app.delete("/meals/:id", { preHandler: [app.authenticate] }, DeleteMeal);
}
