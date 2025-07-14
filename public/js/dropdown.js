import { groups } from "./groups.js";
import { events } from "./events.js";

function convertGroupHTML(item, index) {
  return `
    <div>
      <label>
        <input type="checkbox" name="group" value="${item.id}">
        <strong>${item.name}</strong> ${item.start ? `(${item.start}`:"("}${item.end ? `- ${item.end})`: ")"}<br>
        <small>${item.description}</small>
      </label>
      <hr>
    </div>
  `;
}

function convertEventHTML(item, index) {
  return `
    <div>
      <label>
        <input type="checkbox" name="event" value="${item.id}">
        <strong>${item.name}</strong> ${item.start ? `(${item.start}`:"("}${item.end ? `- ${item.end})`: ")"}<br>
        <small>${item.description}</small>
      </label>
      <hr>
    </div>
  `;
}

const selectBox = document.getElementById('era-tags');
const groupList = document.getElementById('groups-container');
const eventsList = document.getElementById('events-container');

selectBox.addEventListener("change", () => {
  const selectedEras = Array.from(selectBox.selectedOptions).map(option => option.value)
  groupList.innerHTML = "";
  eventsList.innerHTML = "";

  // GROUPS
    const matchingGroups = groups.filter(groups => groups.tags.some(tag => selectedEras.includes(tag))
  );

  if (matchingGroups.length > 0) {
    const groupHTML = matchingGroups.map(group => `
      <label>
        <input type="checbox" name="group" value="${group.id}">
        <strong>${group.name}</strong><br>
        <small>${group.description}</small>
      </label><br><br>
    `).join("");
    
    groupList.innerHTML = `<h3>Groups</h3>${groupHTML}`;
  } else {
    groupList.innerHTML = "<p>No matching groups found. </p>";
  }

  // EVENTS
  const matchingEvents = events.filter(event => 
    event.tags.some(tag => selectedEras.includes(tag))
  );

  if (matchingEvents.length > 0) {
    const eventHTML = matchingEvents.map(event => `
      <label>
        <input type="checkbox" name="event" value="${event.id}">
        <strong>${event.name}</strong> (${event.start}-${event.end})<br>
        <small>${event.description}</small>
      </label><br><br>
    `).join("");

    eventsList.innerHTML = `<h3>Events</h3>${eventHTML}`;
  } else {
    eventsList.innerHTML = "<p>No matching events found.</p>"
  }

});

function renderGroupList(filteredGroups) {
  const container = document.querySelector("#groups-container");
  if (container) {
    container.innerHTML = [
      ...filteredGroups.map((group, index) => convertGroupHTML(group, index, "group")),
    ].join('');
  }
}

function renderEventList(filteredEvents) {
  const container = document.querySelector("#events-container");
  if (container) {
    container.innerHTML = filteredEvents.map((event, index) => convertEventHTML(event, index, "event")).join('');
  }
}

function getValue(selector) {
  const el = document.querySelector(selector);
  return el ? el.value : "All";
}

function filter() {
  const selectedEra = getValue("#era-tags");
  const selectedSpecies = getValue("#species-tags");
  const selectedRank = getValue("#ranks-tags");

  const groupsFiltered = groups.filter(g => {
    return (
      (selectedEra === "" || g.tags?.includes(selectedEra))
    );
  });

  const eventsFiltered = events.filter(e => {
    return (
      (selectedEra === "" || e.tags?.includes(selectedEra))
    );
  });

  renderGroupList(groupsFiltered);
  renderEventList(eventsFiltered);
}

document.addEventListener("DOMContentLoaded", () => {
  renderGroupList(groups);
  renderEventList(events);

  document.querySelectorAll("select").forEach(select => 
  {
    select.addEventListener("change", filter);
  });
});