import React, { useState, useEffect } from "react";
import "./styles.css";
import { NavLink, Routes, Route } from "react-router-dom";
import * as contentful from "contentful";
import Home from "./Home.js";
import RezeptAbdulaziz from "./RezeptAbdulaziz.js";
import RezeptKarim from "./RezeptKarim.js";
import RezeptRene from "./RezeptRene.js";

// API Zugriffdaten
const client = contentful.createClient({
  space: "3xvydxe8lw18",
  accessToken: "1yzd6iC6x4KXR7vjqLOg2iMc0JVEoOP8WIZMvtZmQd0"
});

export default function App() {
  // useState
  const [dataMap, setDataMap] = useState([]);

  // Abruf der Daten und Erzeugung einer Arraysstruktur
  function catchData(data) {
    const give = function (d) {
      let ret = [];
      for (let e = 0; e < d.items.length; e++) {
        ret.push([
          d.items[e].fields.name,
          d.items[e].fields.zutaten,
          d.items[e].fields.zubereitung.content[0].content[0].value,
          d.items[e].fields.hero.fields.file.url
        ]);
      }
      return ret;
    };
    setDataMap(give(data));
  }

  // Datenabruf aus der API
  async function fetchData() {
    await client
      .getEntries()
      .then(async (response) => await catchData(response))
      .catch(console.error);
  }

  // Abruf der Daten beim Laden oder Ändern der Seite
  useEffect(() => {
    fetchData();
  }, []);

  // JSX
  return (
    <div className="App">
      <nav>
        <NavLink to="/">
          <div id="m1" className="MenuItem">
            Home
          </div>
        </NavLink>
        <NavLink to="/RezeptAbdulaziz">
          <div id="m2" className="MenuItem">
            Abdülaziz
          </div>
        </NavLink>
        <NavLink to="/RezeptKarim">
          <div id="m3" className="MenuItem">
            Karim
          </div>
        </NavLink>
        <NavLink to="/RezeptRene">
          <div id="m4" className="MenuItem">
            Rene
          </div>
        </NavLink>
      </nav>
      <main>
        <div className="infobox">
          <h1>
            Willkommen auf Cookbook <span>Round 2</span>
          </h1>
          <h4>
            Hier gibt es leckere Spezialitäten aus aller Welt für den Gaumen.
            Also schnell reinschauen, inspirieren lassen und kochen!
          </h4>
          <h5>Es lohnt sich, versprochen :-)</h5>
        </div>
        <Routes>
          <Route path="/" element={<Home data={dataMap} />} />
          <Route
            path="/RezeptAbdulaziz"
            element={<RezeptAbdulaziz data={dataMap} />}
          />
          <Route path="/RezeptKarim" element={<RezeptKarim data={dataMap} />} />
          <Route path="/RezeptRene" element={<RezeptRene data={dataMap} />} />
        </Routes>
      </main>
      <footer>Made by us &copy; 2022</footer>
    </div>
  );
}
