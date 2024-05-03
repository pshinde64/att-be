import { Router } from "express";
import { addAttendance, addUsersToDivision, createDivision, deleteDivision, getAttendance, getDivision, getDivisionUsers, getDivisions, patchDivision } from "../../services/division";
import { checkAuthorizationMiddleware } from "../../services/auth";

const router = Router();

router.get("/", checkAuthorizationMiddleware({ allowedRoles: ["superadmin", "admin"]}), (req, res) => {
    const { page, limit, instituteid } = req.query;
    getDivisions(parseInt(page as string), parseInt(limit as string), instituteid as string).then((divisions) => {
        res.send(divisions);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

router.get("/:id", checkAuthorizationMiddleware({ allowedRoles: ["superadmin", "admin"]}),(req, res) => {
    const { instituteid } = req.query;
    getDivision(req.params.id, instituteid as string).then((division) => {
        res.send(division);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

router.get("/:id/user", checkAuthorizationMiddleware({ allowedRoles: ["superadmin", "admin"]}), (req, res) => {
    const { page, limit } = req.query;
    getDivisionUsers(req.params.id, parseInt(page as string), parseInt(limit as string)).then((division) => {
        res.send(division);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

router.post("/", checkAuthorizationMiddleware({ allowedRoles:["superadmin", "admin"] }), (req, res) => {
    createDivision(req.body).then((division) => {
        res.send(division);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

router.post("/:id/user", checkAuthorizationMiddleware({ allowedRoles:["superadmin", "admin"] }), (req, res) => {
    const { users }: { users: string[] } = req.body;
    addUsersToDivision(req.params.id, users).then((division) => {
        res.send(division);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

router.post("/:id/user/:userid/attendance", checkAuthorizationMiddleware({ allowedRoles:["superadmin", "admin"] }), (req, res) => {
    const { date, status }: { date: string, status: string } = req.body;
    addAttendance(req.params.id, req.params.userid, date, status).then((division) => {
        res.send(division);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

router.get("/:id/user/:userid/attendance", checkAuthorizationMiddleware({ allowedRoles:["superadmin", "admin"] }), (req, res) => {
    getAttendance(req.params.id, req.params.userid).then((division) => {
        res.send(division);
    }).catch((error) => {

    })
})

router.patch("/:id", checkAuthorizationMiddleware({ allowedRoles:["superadmin", "admin"] }), (req, res) => {
    patchDivision(req.params.id, req.body).then((division) => {
        res.send(division);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

router.delete("/:id", checkAuthorizationMiddleware({ allowedRoles:["superadmin", "admin"] }), (req, res) => {
    deleteDivision(req.params.id).then((division) => {
        res.send(division);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

export default router;