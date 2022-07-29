// React-Basis-Modul
import React from "react";

// Der Komponent
export default function Home(data) {
  const items = data.data;

  return (
    <div>
      {Object.values(items).map((value, index) => {
        return (
          <div key={index}>
            <div className="struktur">
              <div>
                <h3 className="titel">{value[0]}</h3>
              </div>
              <img src={value[3]} alt="" />
              <div className="subtitel">Zutaten</div>
              <div className="zutaten">{value[1]}</div>
              <div className="subtitel">Beschreibung</div>
              <div>
                <div className="beschreibung">{value[2]}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
