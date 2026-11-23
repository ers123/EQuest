"""Generate local English narration with macOS Speech; no API keys required.
Run on macOS with say and ffmpeg installed. Existing audio is not overwritten.
"""
import json
import subprocess
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
episodes = json.loads((ROOT / 'src/data/listening/episodes.json').read_text())
rates = {'world-tour': 145, 'parrot-hello': 135, 'pikachu-berry': 125}
metadata = {}
for episode in episodes:
    target = ROOT / 'public/audio' / (episode['id'] + '.mp3')
    if not target.exists():
        with tempfile.TemporaryDirectory(prefix='equest-speech-') as folder:
            text = Path(folder) / 'story.txt'
            raw = Path(folder) / 'story.aiff'
            text.write_text(episode['text'])
            subprocess.run(['say', '-v', 'Samantha', '-r', str(rates[episode['id']]), '-f', str(text), '-o', str(raw)], check=True)
            subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-i', str(raw), '-codec:a', 'libmp3lame', '-b:a', '96k', '-ar', '44100', '-ac', '1', '-metadata', 'title='+episode['title'], str(target)], check=True)
    info = subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'json', str(target)])
    metadata[episode['id']] = {'duration': round(float(json.loads(info)['format']['duration'])), 'voice': 'macOS Samantha', 'wordsPerMinute': rates[episode['id']]}
(ROOT / 'src/data/listening/audio-metadata.json').write_text(json.dumps(metadata, indent=2) + '\n')
print(json.dumps(metadata, indent=2))
