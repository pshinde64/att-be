import { Router } from "express";
import { createUser, deleteUser, getUser, getUsers, patchUser } from "../../services/user";
import bcrypt from "bcrypt";
import { checkAuthorizationMiddleware } from "../../services/auth";

const router = Router();

router.get("/", checkAuthorizationMiddleware({ allowedRoles:["superadmin", "admin"] }), (req, res) => {
    const { page, limit } = req.query;
    getUsers(parseInt(page as string), parseInt(limit as string)).then((users) => {
        res.send(users);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

router.get("/:userid", checkAuthorizationMiddleware({ allowedRoles:["superadmin", "admin", "user"] }), (req, res) => {
    getUser(req.params.userid).then((user) => {
        res.send(user);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

router.post("/", checkAuthorizationMiddleware({ allowedRoles:["superadmin", "admin"] }), (req, res) => {
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

router.patch("/:userid", checkAuthorizationMiddleware({ allowedRoles:["superadmin", "admin", "user"] }), (req, res) => {
    patchUser(req.params.userid, req.body).then((user) => {
        res.send(user);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

router.delete("/:userid", checkAuthorizationMiddleware({ allowedRoles:["superadmin", "admin"] }), (req, res) => {
    deleteUser(req.params.userid).then((user) => {
        res.send(user);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

export default router;