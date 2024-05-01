import { Router } from "express";
import { createUser, deleteUser, getUser, getUsers, patchUser } from "../../services/user";
import bcrypt from "bcrypt";

const router = Router();

router.get("/", (req, res) => {
    const { page, limit } = req.query;
    getUsers(parseInt(page as string), parseInt(limit as string)).then((users) => {
        res.send(users);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

router.get("/:id", (req, res) => {
    getUser(req.params.id).then((user) => {
        res.send(user);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

router.post("/", (req, res) => {
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = {
        ...req.body,
        password: hashedPassword
    }
    createUser(user).then((user) => {
        res.send(user);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

router.patch("/:id", (req, res) => {
    patchUser(req.params.id, req.body).then((user) => {
        res.send(user);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

router.delete("/:id", (req, res) => {
    deleteUser(req.params.id).then((user) => {
        res.send(user);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

export default router;