import { Router } from "express";
import UserRouter from "./user";
import InstituteRouter from "./institute";
import DivisionRouter from "./division";
import AuthRouter from "./auth";

const router = Router();

router.use("/institute", InstituteRouter);
router.use("/user", UserRouter);
router.use("/division", DivisionRouter);
router.get("/auth", AuthRouter);

export default router;