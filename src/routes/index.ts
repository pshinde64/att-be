import { Router, RequestHandler } from "express";
import UserRouter from "./user";
import InstituteRouter from "./institute";
import DivisionRouter from "./division";
import AuthRouter from "./auth";
import { verifyToken } from "../services/auth";

const router = Router();

const authMiddleware : RequestHandler = (req, res, next) => {
    const token = req.headers.authorization?.split(" ");
    if (token && token[0] === "Bearer") {
        verifyToken(token[1]).then((user) => {
            req.body.payload = user;
            next();
        }).catch((error) => {
            res.status(401).send("Unauthorized");
        });
    }
    else {
        res.status(401).send("Unauthorized");
    }
};

router.use("/institute", authMiddleware, InstituteRouter);
router.use("/user", authMiddleware, UserRouter);
router.use("/division", authMiddleware, DivisionRouter);
router.use("/auth", AuthRouter);

export default router;