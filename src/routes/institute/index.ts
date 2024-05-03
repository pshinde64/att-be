import { Router } from "express";
import { createInstitute, deleteInstitute, getInstitute, getInstituteUsers, getInstitutes, patchInstitute } from "../../services/institute";
import { checkAuthorizationMiddleware } from "../../services/auth";

const router = Router();

router.get("/", checkAuthorizationMiddleware({ allowedRoles:["superadmin"] }), (req, res) => {
    const { page, limit } = req.query;
    getInstitutes(parseInt(page as string), parseInt(limit as string)).then((institutes) => {
        res.send(institutes);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

router.get("/:instituteid", checkAuthorizationMiddleware({ allowedRoles:["superadmin", "admin"] }), (req, res) => {
    getInstitute(req.params.instituteid).then((institute) => {
        res.send(institute);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

router.get("/:instituteid/user", checkAuthorizationMiddleware({ allowedRoles:["superadmin", "admin"] }), (req, res) => {
    const { page, limit } = req.query;
    getInstituteUsers(req.params.instituteid, parseInt(page as string), parseInt(limit as string)).then((institute) => {
        res.send(institute);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

router.post("/", checkAuthorizationMiddleware({ allowedRoles:["superadmin"] }),(req, res) => {
    createInstitute(req.body).then((institute) => {
        res.send(institute);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

router.patch("/:instituteid", checkAuthorizationMiddleware({ allowedRoles:["superadmin", "admin"] }), (req, res) => {
    patchInstitute(req.params.instituteid, req.body).then((institute) => {
        res.send(institute);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

router.delete("/:instituteid", checkAuthorizationMiddleware({ allowedRoles:["superadmin"] }), (req, res) => {
    deleteInstitute(req.params.instituteid).then((institute) => {
        res.send(institute);
    }).catch((error) => {
        res
            .status(400)
            .send(error.message);
    });
});

export default router;