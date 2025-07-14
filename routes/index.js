import express from 'express'
const router = express.Router()

// Home page route
router.get("/", (req, res) => {
    res.render("home", { title: 'Home' });
});

router.get("/about", (req, res) => {
    res.render("about", { title: 'About' });
});

router.get("/contact", (req, res) => {
    res.render("contact", { title: 'Contact' });
});

router.get('/characters', (req, res) => {
    res.render("characters", { title: 'Jedi Section' })  // corrected
});

router.get('/clones', (req, res) => {
    res.render("clones", {title: 'Clone Section'})
});

router.get('/mandalorians', (req, res) => {
    res.render("mandalorians", {title: 'Mandalorian Section'})
});

export default router;