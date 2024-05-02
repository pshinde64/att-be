import { Router } from "express";
import { login } from "../../services/auth";

const router = Router();

router.post("/login", (req, res) => {
    login(req.body).then((token) => {
        res.send(token);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

export default router;