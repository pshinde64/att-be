import { Router } from "express";
import { createInstitute, deleteInstitute, getInstitute, getInstituteUsers, getInstitutes, patchInstitute } from "../../services/institute";

const router = Router();

router.get("/", (req, res) => {
    const { page, limit } = req.query;
    getInstitutes(parseInt(page as string), parseInt(limit as string)).then((institutes) => {
        res.send(institutes);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

router.get("/:id", (req, res) => {
    getInstitute(req.params.id).then((institute) => {
        res.send(institute);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

router.get("/:id/user", (req, res) => {
    const { page, limit } = req.query;
    getInstituteUsers(req.params.id, parseInt(page as string), parseInt(limit as string)).then((institute) => {
        res.send(institute);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

router.post("/", (req, res) => {
    createInstitute(req.body).then((institute) => {
        res.send(institute);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

router.patch("/:id", (req, res) => {
    patchInstitute(req.params.id, req.body).then((institute) => {
        res.send(institute);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

router.delete("/:id", (req, res) => {
    deleteInstitute(req.params.id).then((institute) => {
        res.send(institute);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

export default router;