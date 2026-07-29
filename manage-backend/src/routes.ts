// routes.ts
import { Application } from "express";
import homeController from "./controllers/home-controller";
import userController from "./controllers/user-controller";
export default function (app: Application) {
  homeController.registerRoutes(app);
  userController.registerRoutes(app);
}
