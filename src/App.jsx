import { useEffect, useState } from "react";
import "./App.css";

const drumPads = [
  { key: "Q", sound: "Heater-1", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
  { key: "W", sound: "Heater-2", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },
  { key: "E", sound: "Heater-3", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },
  { key: "A", sound: "Heater-4", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },
  { key: "S", sound: "Clap", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },
  { key: "D", sound: "Open-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },
  { key: "Z", sound: "Kick-n'-Hat", url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },
  { key: "X", sound: "Kick", url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },
  { key: "C", sound: "Closed-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" },
];

function App() {
  const [display, setDisplay] = useState("");
  const [volume, setVolume] = useState(0.5);
  const [power, setPower] = useState(true);

  const playSound = (key) => {
    if (!power) return;
    const audio = document.getElementById(key);
    if (audio) {
      audio.volume = volume;
      audio.currentTime = 0;
      audio.play();
      const pad = drumPads.find((p) => p.key === key);
      setDisplay(pad?.sound || "");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      if (drumPads.find((pad) => pad.key === key)) {
        playSound(key);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [volume, power]);

  return (
    <div className="background">
      <div className="App" id="drum-machine">
        <h1 className="title">🥁 Faizytech Drum Machine</h1>
        <div id="display">{power ? display : "Power Off"}</div>

        <div className="controls">
          <button onClick={() => setPower(!power)} className="power-btn">
            {power ? "Power: ON" : "Power: OFF"}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          />
        </div>

        <div className="pad-grid">
          {drumPads.map((pad) => (
            <div
              key={pad.key}
              className="drum-pad"
              id={pad.sound}
              onClick={() => playSound(pad.key)}
            >
              {pad.key}
              <audio className="clip" id={pad.key} src={pad.url}></audio>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
