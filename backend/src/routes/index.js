import { Router } from "express";

import personalInfoRoutes from "./personalInfo.routes.js";
import authRoutes from "./auth.routes.js";
import projectRoutes from "./project.routes.js";

import adminRoutes from "./adminRoutes.js";
import adminMessageRoutes from "./adminMessageRoutes.js";

import messageRoutes from "./message.routes.js";
import contactRoutes from "./contact.routes.js";

const router = Router();



router.get("/health", (req,res)=>{

    res.json({
        success:true,
        message:"Backend is running successfully 🚀"
    });

});



router.use("/personal-info", personalInfoRoutes);

router.use("/auth", authRoutes);

router.use("/projects", projectRoutes);


// Public Contact Message
router.use("/messages", messageRoutes);
router.use("/contact", contactRoutes);


// Admin
router.use("/admin", adminRoutes);


// Admin Messages
router.use("/admin/messages", adminMessageRoutes);


export default router;