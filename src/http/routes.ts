import type { FastifyInstance } from "fastify";
import { verifyJwt } from "../middlewares/auth.js";
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

    app.post("/meals", { preHandler: [verifyJwt] }, RegisterMeal);
    app.get("/meals", { preHandler: [verifyJwt] }, GetMeals);
    app.get("/meals/metrics", { preHandler: [verifyJwt] }, GetMealsMetrics);
    app.get("/meals/:id", { preHandler: [verifyJwt] }, GetMealById);
    app.put("/meals/:id", { preHandler: [verifyJwt] }, UpdateMeal);
    app.delete("/meals/:id", { preHandler: [verifyJwt] }, DeleteMeal);
}
