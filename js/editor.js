const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const exportBtn = document.getElementById('exportBtn');
const notesDiv = document.getElementById('notes');

let notes = [];
let startTime = 0;
let playing = false;

const keyToLane = { d: 0, f: 1, j: 2, k: 3 };

playBtn.onclick = () => {
  if (playing) {
    audio.pause();
    playing = false;
  } else {
    audio.currentTime = 0;
    audio.play();
    startTime = performance.now();
    notes = [];
    notesDiv.textContent = '';
    playing = true;
  }
};

document.addEventListener('keydown', (e) => {
  if (!playing) return;
  const key = e.key.toLowerCase();
  if (keyToLane.hasOwnProperty(key)) {
    const time = performance.now() - startTime;
    notes.push({ time: Math.floor(time), lane: keyToLane[key] });
    notesDiv.textContent = JSON.stringify(notes, null, 2);
  }
});

exportBtn.onclick = () => {
  const blob = new Blob([JSON.stringify(notes, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = '譜面.json';
  a.click();
  URL.revokeObjectURL(url);
};