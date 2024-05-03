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

router.get("/:userid", (req, res) => {
    getUser(req.params.userid).then((user) => {
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

router.patch("/:userid", (req, res) => {
    patchUser(req.params.userid, req.body).then((user) => {
        res.send(user);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

router.delete("/:userid", (req, res) => {
    deleteUser(req.params.userid).then((user) => {
        res.send(user);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

export default router;