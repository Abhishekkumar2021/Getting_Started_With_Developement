import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {})

router.get("/months", (req, res) => {})

router.get("/months/:month", (req, res) => {})

router.get("/years", (req, res) => {})

router.get("/years/:year", (req, res) => {})

router.get("/range", (req, res) => {})

router.get("/categories", (req, res) => {})

router.get("/categories/:category", (req, res) => {})

export default router