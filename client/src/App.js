import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { logEntry } from "./API";
import LogEntryForm from "./LogEntryForm";
import LogEntry from "./LogEntry";

const App = () => {
  const [LogEntries, setLogEntries] = useState([]);
  const [addEntries, setAddEntries] = useState(null);
  const [showPopup, setShowPopup] = useState({});
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 20,
    longitude: 0,
    zoom: 2,
    overflow: "hidden"
  });

  const showLogEntries = async () => {
    const logEntries = await logEntry();
    setLogEntries(logEntries);
    console.log(logEntries);
  };

  useEffect(() => {
    showLogEntries();
  }, []);
  const addTravelMarker = event => {
    console.log(event.lngLat);
    const [longitude, latitude] = event.lngLat;
    setAddEntries({
      longitude,
      latitude
    });
    console.log(addEntries);
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mirsamali/ck7ioeyee0ch11io7kn7oebju"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
      doubleClickZoom={false}
      onDblClick={addTravelMarker}
    >
      {LogEntries.map(entry => {
        return (
          <React.Fragment key={entry._id}>
            <Marker latitude={entry.latitude} longitude={entry.longitude}>
              <div
                onClick={() => {
                  setShowPopup({ [entry._id]: true });
                }}
              >
                <svg
                  className="marker yellow"
                  style={{
                    height: `${8 * viewport.zoom}px`,
                    width: `${8 * viewport.zoom}px`
                  }}
                  version="1.1"
                  id="Layer_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <g>
                      <path
                        d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                        c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                        c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"
                      />
                    </g>
                  </g>
                </svg>
              </div>
            </Marker>
            {showPopup[entry._id] ? (
              <Popup
                latitude={entry.latitude}
                className="popup"
                longitude={entry.longitude}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setShowPopup({})}
                anchor="top"
              >
                <div>
                  <LogEntry entry={entry}></LogEntry>
                </div>
              </Popup>
            ) : null}
          </React.Fragment>
        );
      })}
      {addEntries ? (
        <>
          <Marker
            latitude={addEntries.latitude}
            longitude={addEntries.longitude}
          >
            <div>
              <svg
                className="marker red"
                style={{
                  height: `${8 * viewport.zoom}px`,
                  width: `${8 * viewport.zoom}px`
                }}
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
              >
                <g>
                  <g>
                    <path
                      d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                        c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                        c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </Marker>
          <Popup
            latitude={addEntries.latitude}
            className="popup "
            longitude={addEntries.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setAddEntries(false)}
            anchor="top"
            style={{
              backgroundColor: "black"
            }}
          >
            <div>
              <h3
                style={{
                  textAlign: "center"
                }}
              >
                Add Entry
              </h3>
              <LogEntryForm
                onClose={() => {
                  showLogEntries();
                  setAddEntries(false);
                }}
                coordinates={addEntries}
                className="entryForm"
              />
            </div>
          </Popup>
        </>
      ) : null}
    </ReactMapGL>
  );
};

export default App;
