# Import the AudioSegment class for processing audio and the 
# split_on_silence function for separating out silent chunks.
from pydub import AudioSegment
from pydub.silence import split_on_silence
import glob, os

for file in sorted(glob.glob("*.mp3")):
    # Announce current file
    print("Now splitting {0}".format(file))
    fileName = file[0:len(file)-4]

    # Create directory for current file
    os.mkdir(fileName)

    # Load your audio.
    song = AudioSegment.from_mp3(file)

    # Split track where the silence is 2 seconds or more and get chunks using 
    # the imported function.
    chunks = split_on_silence(
        # Use the loaded audio.
        song, 
        # Specify that a silent chunk must be at least 2 seconds or 2000 ms long.
        min_silence_len = 300,
        # Consider a chunk silent if it's quieter than -16 dBFS.
        # (You may want to adjust this parameter.)
        silence_thresh = -30
    )

    # Process each chunk with your parameters
    for i, chunk in enumerate(chunks):
        # Create a silence chunk that's 0.5 seconds (or 500 ms) long for padding.
        silence_chunk = AudioSegment.silent(duration=100)

        # Add the padding chunk to beginning and end of the entire chunk.
        audio_chunk = silence_chunk + chunk + silence_chunk

        # Export the audio chunk with new bitrate.
        print("Exporting {0}-{1}.mp3".format(fileName,i))
        audio_chunk.export(
            "{0}/{0}-{1}.mp3".format(fileName,i),
            bitrate = "192k",
            format = "mp3"
        )