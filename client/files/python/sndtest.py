# Import the AudioSegment class for processing audio and the 
# split_on_silence function for separating out silent chunks.
from pydub import AudioSegment
import glob, os

for file in sorted(glob.glob("*.mp3")):
    # Load your audio.
    song = AudioSegment.from_mp3(file)

    # Print audio info
    print(file)

    # Average decibel level (to know approximately when to cut off)
    print(song.dBFS)

    # Number of channels (mono or stereo)
    print(song.channels)

    # Print song duration
    print(len(song))