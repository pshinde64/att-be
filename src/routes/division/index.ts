import { Router } from "express";
import { addAttendance, addUsersToDivision, createDivision, deleteDivision, getDivision, getDivisionUsers, getDivisions, patchDivision } from "../../services/division";

const router = Router();

router.get("/", (req, res) => {
    const { page, limit } = req.query;
    getDivisions(parseInt(page as string), parseInt(limit as string)).then((divisions) => {
        res.send(divisions);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

router.get("/:id", (req, res) => {
    getDivision(req.params.id).then((division) => {
        res.send(division);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

router.get("/:id/user", (req, res) => {
    const { page, limit } = req.query;
    getDivisionUsers(req.params.id, parseInt(page as string), parseInt(limit as string)).then((division) => {
        res.send(division);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

router.post("/", (req, res) => {
    createDivision(req.body).then((division) => {
        res.send(division);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

router.post("/:id/user", (req, res) => {
    const { users }: { users: string[] } = req.body;
    addUsersToDivision(req.params.id, users).then((division) => {
        res.send(division);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

router.post("/:id/user/:userid/attendance", (req, res) => {
    const { date, status }: { date: string, status: string } = req.body;
    addAttendance(req.params.id, req.params.userid, date, status).then((division) => {
        res.send(division);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

router.patch("/:id", (req, res) => {
    patchDivision(req.params.id, req.body).then((division) => {
        res.send(division);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

router.delete("/:id", (req, res) => {
    deleteDivision(req.params.id).then((division) => {
        res.send(division);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

export default router;