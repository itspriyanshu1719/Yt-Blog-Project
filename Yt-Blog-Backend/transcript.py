import re
import urllib.request
import json
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.formatters import TextFormatter

def extract_video_id(url):
    pattern = r'(?:v=|\/)([0-9A-Za-z_-]{11}).*'
    match = re.search(pattern, url)
    if match:
        return match.group(1) 
    else:
        raise ValueError("Invalid YouTube URL. Could not find a video ID.")

def get_transcript(video_id):
    # PLAN A: Try to get the actual closed captions
    try:
        language_codes = [
            'en', 'hi', 'es', 'fr', 'de', 'ru', 'pt', 'it', 'nl', 
            'ja', 'ko', 'zh', 'zh-Hans', 'zh-Hant', 'ar', 'bn', 'ur', 
            'vi', 'tr', 'pl', 'th', 'id', 'sw', 'ta', 'te', 'mr', 'gu', 'kn', 'ml', 'pa'
        ]
        raw_transcript = YouTubeTranscriptApi.get_transcript(video_id, languages=language_codes)
        formatter = TextFormatter()
        text = formatter.format_transcript(raw_transcript)
        return text.replace('\n', ' ')
        
    except Exception:
        # PLAN B (THE MAGIC FALLBACK): 
        # If captions don't exist or the tool breaks, we NEVER throw an error.
        # Instead, we grab the video's actual title from YouTube and tell Gemini to write a post based on that!
        try:
            oembed_url = f"https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={video_id}&format=json"
            with urllib.request.urlopen(oembed_url) as response:
                data = json.loads(response.read().decode())
                video_title = data.get('title', 'this topic')
                
            # We feed this custom prompt to Gemini instead of the transcript!
            return f"[SYSTEM NOTE: The transcript was unavailable. Please write a highly engaging, comprehensive blog post about the topic: '{video_title}'. Acknowledge that the reader should watch the embedded video to see the full visual details.]"
            
        except Exception:
            # PLAN C: Absolute last resort so it literally never crashes.
            return "[SYSTEM NOTE: The transcript was unavailable. Please write a highly engaging, general blog post about how some content is best experienced visually, and encourage the reader to click the video link above to watch the original video.]"

# --- TESTING AREA ---
if __name__ == "__main__":
    print("--- Starting NEVER-FAIL Transcript Test ---")
    # Try any URL, even ones with no captions!
    test_url = "https://www.youtube.com/watch?v=eHTXQW58WhA" 
    try:
        vid_id = extract_video_id(test_url)
        print(f"Success! Video ID is: {vid_id}")
        
        print("\nDownloading Transcript or Fallback...")
        transcript_text = get_transcript(vid_id)
        
        print("\nSuccess! Here is the text that will be sent to Gemini:")
        print("--------------------------------------------------")
        print(transcript_text[:250] + "...") 
        print("--------------------------------------------------")
    except Exception as error:
        print(f"\nUh oh, something went wrong: {error}")