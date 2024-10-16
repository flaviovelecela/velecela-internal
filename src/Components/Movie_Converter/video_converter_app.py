import os
import subprocess
import tkinter as tk
from tkinter import filedialog, messagebox

def extract_subtitles(file_path, output_file):
    """ Extracts subtitles as a single WebVTT (.vtt) file using ffmpeg. """
    command = [
        "ffmpeg",
        "-i", file_path,
        "-map", "0:s:0",           # Select first subtitle stream
        "-c:s", "webvtt",          # Convert to WebVTT format
        output_file
    ]
    
    try:
        subprocess.run(command, check=True)
        print(f"Subtitles extracted successfully to {output_file}")
    except subprocess.CalledProcessError as e:
        print(f"Error occurred during subtitle extraction: {e}")

def convert_video(file_path, resolutions):
    base_path = r"C:\Users\flavi\OneDrive\Escritorio\VS Code Repos\velecela-internal\public\Movies"
    file_name = os.path.basename(file_path)
    video_name = os.path.splitext(file_name)[0]
    video_path = os.path.join(base_path, video_name)

    resolution_settings = {
        "1080p": {"size": "1920x1080", "bandwidth": "6000000", "crf": "23", "output": "output"},
        "720p": {"size": "1280x720", "bandwidth": "3500000", "crf": "23", "output": "output"},
        "480p": {"size": "854x480", "bandwidth": "1500000", "crf": "23", "output": "output"}
    }

    if not os.path.exists(video_path):
        os.makedirs(video_path)

    if resolutions:  # If resolutions are selected, process video
        for res in resolutions:
            res_path = os.path.join(video_path, res)
            if not os.path.exists(res_path):
                os.makedirs(res_path)

            settings = resolution_settings[res]
            output_file = os.path.join(video_path, res, f"{settings['output']}.m3u8")

            # Explicitly map only video and audio streams and ignore subtitle streams
            command = [
                "ffmpeg",
                "-i", file_path,
                "-map", "0:v:0",  # Map video stream
                "-map", "0:a:0",  # Map audio stream
                "-vf", "format=yuv420p",  # Convert to 8-bit color depth
                "-preset", "slow",                # Slower preset for better compression
                "-c:v", "libx264",                # Use H.264 codec
                "-crf", settings["crf"],          # Use CRF to control quality
                "-maxrate", settings["bandwidth"],  # Max bitrate
                "-bufsize", str(int(settings["bandwidth"]) * 2),  # Buffer size for bitrate control
                "-profile:v", "high",             # Use 'high' profile for H.264
                "-level", "4.0",                  # H.264 level for compatibility
                "-g", "48",                       # Keyframe interval
                "-sc_threshold", "0",             # Disable scene change detection for keyframes
                "-c:a", "aac",                    # Use AAC for audio codec
                "-b:a", "128k",                   # Audio bitrate
                "-ac", "2",                       # Set audio to stereo
                "-s", settings["size"],           # Set resolution
                "-start_number", "0",
                "-hls_time", "6",                 # Segment duration
                "-hls_list_size", "0",            # Don't limit segment list size
                "-hls_segment_filename", os.path.join(video_path, res, f"{settings['output']}%03d.ts"),
                "-f", "hls",
                output_file,
                "-sn"  # Disable subtitle processing
            ]

            try:
                subprocess.run(command, check=True)
                print(f"Finished converting to {res}")
            except subprocess.CalledProcessError as e:
                print(f"Error occurred during conversion to {res}: {e}")

        # Create master playlist if multiple resolutions
        if len(resolutions) > 1:
            master_playlist_path = os.path.join(video_path, "output.m3u8")
            with open(master_playlist_path, 'w') as master_playlist:
                master_playlist.write("#EXTM3U\n")
                for res in resolutions:
                    settings = resolution_settings[res]
                    master_playlist.write(f"#EXT-X-STREAM-INF:BANDWIDTH={settings['bandwidth']},RESOLUTION={settings['size']}\n")
                    master_playlist.write(f"{res}/{settings['output']}.m3u8\n")
            print("Master playlist created.")

def select_file_and_convert():
    file_path = filedialog.askopenfilename(
        filetypes=[("Video files", "*.mp4 *.mov *.mkv"), ("MP4 files", "*.mp4"), ("MOV files", "*.mov"), ("MKV files", "*.mkv")]
    )
    if not file_path:
        return

    # Get the selected resolutions
    selected_resolutions = []
    if var_1080p.get():
        selected_resolutions.append("1080p")
    if var_720p.get():
        selected_resolutions.append("720p")
    if var_480p.get():
        selected_resolutions.append("480p")

    # Get the subtitle extraction option
    extract_subtitles_option = var_subtitles.get()

    # Only process subtitles if the "Extract Subtitles" checkbox is selected
    if extract_subtitles_option:
        subtitle_output_file = os.path.join(r"C:\Users\flavi\OneDrive\Escritorio\VS Code Repos\velecela-internal\public\Movies", f"{os.path.splitext(os.path.basename(file_path))[0]} Subtitles.vtt")
        extract_subtitles(file_path, subtitle_output_file)
        messagebox.showinfo("Success", "Subtitles extracted successfully!")

    # If resolutions are selected, process video segmentation
    if selected_resolutions:
        try:
            convert_video(file_path, selected_resolutions)
            messagebox.showinfo("Success", "Video conversion completed successfully!")
        except Exception as e:
            messagebox.showerror("Error", f"An error occurred: {e}")
    elif not extract_subtitles_option:
        # If neither subtitles nor resolutions are selected, show a warning
        messagebox.showwarning("No Action Selected", "Please select at least one resolution or the subtitles option.")

# Create the main application window
app = tk.Tk()
app.title("Video Converter")
app.geometry("350x250")

# Resolution checkboxes
var_1080p = tk.BooleanVar()
var_720p = tk.BooleanVar()
var_480p = tk.BooleanVar()
var_subtitles = tk.BooleanVar()  # Checkbox for extracting subtitles

checkbox_1080p = tk.Checkbutton(app, text="1080p", variable=var_1080p)
checkbox_720p = tk.Checkbutton(app, text="720p", variable=var_720p)
checkbox_480p = tk.Checkbutton(app, text="480p", variable=var_480p)
checkbox_subtitles = tk.Checkbutton(app, text="Extract Subtitles", variable=var_subtitles)

checkbox_1080p.pack(anchor='w')
checkbox_720p.pack(anchor='w')
checkbox_480p.pack(anchor='w')
checkbox_subtitles.pack(anchor='w')  # Add the subtitle extraction checkbox

# Create a button to select the file and convert
convert_button = tk.Button(app, text="Select File and Convert", command=select_file_and_convert)
convert_button.pack(pady=20)

# Run the application
app.mainloop()
