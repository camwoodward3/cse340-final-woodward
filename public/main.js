import { jedi } from "./models/jedi.js";
import { hrJedi } from "./models/hrjedi.js";
import { orJedi } from "./models/orjedi.js";
import { clones } from "./models/clone.js";
import { mandalorians } from "./models/mandalorian.js";


    const colorClass = item.lightsaber ? item.lightsaber.toLowerCase() : "none";

    const modalId = `${item.type || type}-modal-${index}`;
    return `
    <div>
        <div id="${modalId}" class="modal" role="dialog" aria-hidden="true" aria-modal="true">
            <div class="modal-body">
                    <div class="modal-content ${colorClass}">
                        <span class="close-button" aria-label="Close modal">&times;</span>
                        <div class="saber-color ${colorClass}"></div>
                ${item.imgSrc2 ? `<img src="${item.imgSrc2}" alt="${item.name}">`: ""}
                <h2>${item.name}</h2>
                ${item.name2 ? `<h2>${item.name2}</h2>`:""}
                <div class="panel">
                    <div class="saber-color ${colorClass}"></div>
                    <div class="biographic">
                        <h3>Biographical Information</h3>
                        ${item.homeworld ? `<p><strong>Homeworld:</strong> ${item.homeworld}</p>`: ""}
                        ${item.birth ? `<p><strong>Birth:</strong> ${item.birth}</p>` : ""}
                        ${item.death ? `<p><strong>Death:</strong> ${item.death}</p>` : ""}
                    </div>
                    <div class="saber-color ${colorClass}"></div>
                    <div class="descriptive">
                        <h3>Descriptive Information</h3>
                        ${item.CID ? `<p><strong>ID:</strong> ${item.CID}</p>` : ""}
                        <p><strong>Species:</strong> ${item.species}</p>
                        <p><strong>Gender:</strong> ${item.gender}</p>
                        ${item.masters ? `<p><strong>Master(s):</strong> ${item.masters}</p>` : ""}
                        ${item.padawans ? `<p><strong>Padawan(s):</strong> ${item.padawans}</p>` : ""}
                        <p>Rank: Jedi ${item.rank}</p>
                        ${item.lightsaber ? `<p><strong>Lightsaber:</strong> ${item.lightsaber}</p>` : ""}
                        ${item.legions ? `<p><strong>Legion(s):</strong> ${item.legions}</p>`: ""}
                        ${item.weapons ? `<p><strong>Weapon(s):</strong> ${item.weapons}</p>`: ""}
                        ${item.midochlorians ? `<p>Midochlorians: ${item.midochlorians}</p>`: ""}
                    </div>
                    <div class="family">
                        <h3>Family information</h3>
                        ${item.father ? `<p><strong>Father:</strong> ${item.father}</p>` : ""}
                        ${item.mother ? `<p><strong>Mother:</strong> ${item.mother}</p>` : ""}
                        ${item.siblings ? `<p><strong>Siblings:</strong> ${item.siblings}</p>` : ""}
                        ${item.spouse ? `<p><strong>Spouse:</strong> ${item.spouse}</p>` : ""}
                        ${item.children ? `<p><strong>Children:</strong> ${item.children}</p>` : ""}
                    </div>
                    <div class="chronological">
                        <h3>Chronological and Political Information</h3>
                        ${item.council ? `<p> Jedi High Council Member - ${item.council}</p>` : ""}
                        ${item.clan ?  `<p>${item.clan}</p>` : ""}
                        ${item.pathfinder ? `<p>${item.pathfinder}</p>` : ""}
                        ${item.convocation ? `<p>Convocation of the Force - ${item.convocation}</p>` : ""}
                        ${item.nine ?  `<p>${item.nine}` : ""}
                        ${item.red ? `<p>${item.red}</p>` : ""}
                        ${item.secondary ? `<p>A ${item.secondary}` : ""}
                        ${item.keeve ? `<p>${item.keeve}` : ""}
                        ${item.kashyyyk ? `<p>Kashyyyk Team (${item.kashyyyk})` : ""}
                        ${item.crimson ? `<p>Team Crimson Bolt (${item.crimson})` : ""}
                        ${item.stormwall ? `<p>${item.stormwall}` : ""} 
                        ${item.skull ? `<p>Scarlet Skulls (${item.skull})` : ""}
                        
                        ${item.brendok ? `<p>Brendok Four (${item.brendok})` : ""}
                        ${item.twenty ? `<p>${item.twenty}</p>` : ""}
                        ${item.assault ? `<p>Jedi Assault Team (${item.assault})` : ""}
                        ${item.alliance ?  `<p>Rebel Alliance (${item.alliance})` : ""}
                        ${item.luke ? `<p>New Jedi Order (${item.luke})` : ""}
                        ${item.resistance ? `<p>The Resistance (${item.resistance})` : ""}

                    </div>
                    <div class="events">
                        <h3>Events Information</h3>
                        ${item.eriam ? `<p>Eiram and E'ronoh War (${item.eiram})` : ""}
                        ${item.sorrow ? `<p>Night of Sorrow (${item.sorrow})` : ""}
                        ${item.conclave ? `<p>Starlight Beacon Conclave (${item.conclave})` : ""}
                        ${item.emergences ? `<p>Emergences (${item.emergences})` : ""}
                        ${item.nihil ? `<p>Nihil Conflict (${item.nihil})` : ""}
                        ${item.drengir ? `<p>Drengir Crisis (${item.drengir})` : ""}
                        ${item.stark ? `<p>${item.stark} (44 BBY)` : ""}
                        ${item.clone ? `<p>Clone Wars - ${item.clone} </p>` : ""}
                        ${item.order66 ? `<p>Order 66 (19 BBY) - ${item.order66}` : ""}
                        ${item.galactic ? `<p>Galatic Civil War - ${item.galactic}` : ""}
                        ${item.newWar ? `<p>First Order-Resistance War - ${item.newWar}` : ""}
                    </div>
                </div>
            </div>
        </div>
        <div class="character ${item.rank}">
        <img src="${item.imgSrc}" alt="${item.name}">
            <button class="open-modal button ${item.lightsaber} ${item.legion}" data-target="${modalId}">${item.name}</button>
        </div>
    </div>
    `;


function renderJediList(filteredJedi) {
    const container = document.querySelector("#character-container");
    if (container) {
        container.innerHTML = [
            ...filteredJedi.map((jedi, index) => convertHTML(jedi, index, "jedi")),
        ].join('');
        setUpEventListeners();
    }
}

function renderCloneList(filteredClones) {
    const container = document.querySelector("#clone-container")
    if (container) {
        container.innerHTML = filteredClones.map((clone, index) => convertHTML(clone, index, "clone")).join('');
        setUpEventListeners();
    }
}

function renderMandalorianList(filteredMandalorians) {
    const container = document.querySelector("#mandalorian-container");
    if (container) {
        container.innerHTML = filteredMandalorians.map((mandalorian, index) => convertHTML(mandalorian, index, "mandalorian")).join('');
        setUpEventListeners();
    }

}

function showSection(section) {
    const jediContainer = document.getElementById("character-container");
    const  cloneContainer = document.getElementById("clone-container");
    const mandalorianContainer = document.getElementById("mandalorian-container");

    if (section === "jedi") {
        jediContainer.classList.remove("hidden");
        cloneContainer.classList.add("hidden");
        mandalorianContainer.classList.add("hidden");
        renderJediList([...jedi, ...hrJedi, ...orJedi]);
    }
    else if (section === "clones") {
        jediContainer.classList.add("hidden");
        cloneContainer.classList.remove("hidden");
        mandalorianContainer.classList.add("hidden");
        renderCloneList(clones);
    }
    else if (section === "mandalorians") {
        jediContainer.classList.add("hidden");
        cloneContainer.classList.add("hidden");
        mandalorianContainer.classList.remove("hidden");
        renderMandalorianList(mandalorians);
    }
}

function setUpEventListeners() {
        // Modal functionality
        const openModalButtons = document.querySelectorAll(".open-modal");
        const closeModalButtons = document.querySelectorAll(".close-button");
        
        openModalButtons.forEach(button => {
            button.addEventListener("click", () => {
                const targetId = button.getAttribute("data-target");
                const modal = document.getElementById(targetId);
                if (modal) {
                    modal.classList.add("open");
                    modal.setAttribute("aria-hidden", false);
                    modal.focus();
                }
            });

        });
        
        closeModalButtons.forEach(button => {
            button.addEventListener("click", () => {
                const modal = button.closest(".modal");
                if (modal) {
                    modal.classList.remove("open");
                    modal.setAttribute("aria-hidden", true);
                }
            });
            
        });
    }

    document.querySelectorAll(".modal").forEach(modal => {
        modal.addEventListener("click", e => {
            if (e.target === modal) {
                modal.classList.remove("open");
                modal.setAttribute("aria-hidden", "true");
            }
        })
    })

function getValue(selector) {
    const el = document.querySelector(selector);
    return el ? el.value : "All";
}
function filter() {
    const selectedEra = getValue("#era-tags");
    const selectedEvent = getValue("#event-tags");
    const selectedGroup = getValue("#group-tags");
    const selectedSpecies = getValue("#species-tags");
    const selectedRank = getValue("#rank-tags");
    const selectedColor = getValue("#color-tags");
    const selectedLegion = getValue("#legion-tags");
    const selectedRanks = getValue("#ranks-tags");
    const selectedClan = getValue("#clan-tags");
    const selectedGroups = getValue("#groups-tags");

    const combinedJedi = [
        ...jedi.map(j => ({ ...j, type: "jedi" })), 
        ...hrJedi.map(j => ({ ...j, type: "hrJedi "})),
        ...orJedi.map(j => ({ ...j, type: "orJedi"}))
    ];
    const filtered = combinedJedi.filter(j => {
    return (
      (selectedEra === "All" || j.tags?.includes(selectedEra)) &&
      (selectedEvent === "All" || j.tags?.includes(selectedEvent)) &&
      (selectedGroup === "All" || j.tags?.includes (selectedGroup)) &&
      (selectedSpecies === "All" || j.species?.toLowerCase() === selectedSpecies.toLowerCase()) &&
      (selectedRank === "All" || j.rank?.includes(selectedRank)) &&
      (selectedColor === "All" || j.lightsaber?.toLowerCase() === selectedColor.toLowerCase())
    );
  });
  
    const cloneFiltered = clones.filter(c => {
        return (
              (selectedLegion === "All" || c.tags?.includes(selectedLegion)) &&
              (selectedRanks === "All" || c.tags?.includes(selectedRanks))
          );
      });

    const mandalorianFiltered = mandalorians.filter(m => {
        return (
            (selectedClan === "All" || m.tags?.includes(selectedClan)) &&
            (selectedGroups === "All" || m.tags?.includes(selectedGroups))
        );
    });
    
    

  renderJediList(filtered);
  renderCloneList(cloneFiltered);
  renderMandalorianList(mandalorianFiltered);

}


document.addEventListener("DOMContentLoaded", () => {
    renderJediList([...jedi, ...hrJedi, ...orJedi]);
    renderCloneList(clones);
    renderMandalorianList(mandalorians);
    setUpEventListeners();
    
    document.querySelectorAll("select").forEach(select => {
        select.addEventListener("change", filter);
    });
});

