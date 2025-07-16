import express from 'express';
import { jedi } from '../models/jedi.js';
import { jediList } from '../models/characterList.js';
import { clones } from '../models/clone.js';
import { mandalorians } from '../models/mandalorian.js';
import { eras } from '../models/era.js';
import db from '../models/db.js';

const router = express.Router();

router.use(express.urlencoded({extended: true }));
router.use(express.json());
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
    jedi: jediList
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

router.get('/jedi/add', async (req, res) => {
    res.render("addJedi", { title: "Add New Jedi",  eras });

});

router.post("/jedi/add", (req, res) => {
    const { name, birth, birthplace, death, deathplace, species, ranks, lightsabers, master, padawan, father, mother, siblings, spouse, children, era } = req.body;
    
    const newJedi = {
        name, birth, birthplace, death, deathplace, species, ranks, lightsabers, master, padawan, father, mother, siblings, spouse, children, era
    };

    console.log("Jedi submitted:");
    console.log("Name:", name);
    console.log("Birth:", birth);
    console.log("Birthplace:", birthplace);
    console.log("Death:", death),
    console.log("Deathplace:", deathplace);
    console.log("Species:", species);
    console.log("Rank:", ranks);
    console.log("Lightsaber:", lightsabers);
    console.log("Master:", master);
    console.log("Padawan:", padawan);
    console.log("Father:", father);
    console.log("Mother:", mother);
    console.log("Siblings:", siblings);
    console.log("Spouse:", spouse);
    console.log("Children:", children);
    console.log("Era:", era);
    
    jediList.push(newJedi);
    
    res.redirect("/");
});

router.get('/clones', (req, res) => {
    res.render("clones", {title: 'Clone Section',  cloneList: clones,
    });
});

router.get('/mandalorians', (req, res) => {
    res.render("mandalorians", {title: 'Mandalorian Section', mandalorianList: mandalorians,})
});

export default router;