import express from 'express';
import { jedi } from '../models/jedi.js';
import { clones } from '../models/clone.js';
import { mandalorians } from '../models/mandalorian.js';
import { eras } from '../models/era.js';
const router = express.Router();

// Home page route
router.get("/", (req, res) => {
    res.render("home", { title: 'Home', });
});

router.get("/about", (req, res) => {
    res.render("about", { title: 'About' });
});

router.get("/contact", (req, res) => {
    res.render("contact", { title: 'Contact' });
});

router.get('/index', (req, res) => {
    res.render("index", { title: 'Jedi Section',
    jediList: jedi,  
    }); 
});

router.get('/index/:id', (req, res) => {
    const jediId = req.params.id;
    const character = jedi.find(j => j.id === jediId || j.name.toLowerCase().replace(/\s+/g, '-') === jediId);

    if (character) {
        res.render("jediDetail", {
            title: character.name,
            character,
        });
    } else {
        res.status(404).render("404", { title: "Character Not Found" });
    }
});

router.get('/jedi/add', (req, res) => {
    res.render("addJedi", { title: "Add New Jedi",  eras });
});

router.get('/clones', (req, res) => {
    res.render("clones", {title: 'Clone Section',  cloneList: clones,
    });
});

router.get('/mandalorians', (req, res) => {
    res.render("mandalorians", {title: 'Mandalorian Section', mandalorianList: mandalorians,})
});

export default router;