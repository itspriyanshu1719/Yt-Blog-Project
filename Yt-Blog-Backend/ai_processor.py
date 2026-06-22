import os
import json
from google import genai
from dotenv import load_dotenv

# Step 2a: Load the secret key from our .env file!
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("Uh oh! No API key found. Did you name your file exactly .env?")

# Step 2b: Initialize the new Gemini Client
client = genai.Client(api_key=api_key)

def clean_json_response(text):
    """
    Sometimes Gemini tries to be helpful and wraps the JSON in formatting 
    like ```json ... ```. We need to strip that out so Python can read it cleanly.
    """
    text = text.strip()
    if text.startswith("```json"):
        text = text[7:] # Chop off the first 7 characters
    elif text.startswith("```"):
        text = text[3:] # Chop off the first 3 characters
        
    if text.endswith("```"):
        text = text[:-3] # Chop off the last 3 characters
        
    return text.strip()

def generate_blog_post(transcript, tone="professional"):
    """
    Sends the transcript to Gemini using the new SDK, asks it to write a blog post,
    and format the answer as a JSON dictionary.
    """
    prompt = f"""
    You are an expert blog writer and SEO specialist. 
    I am going to give you a YouTube video transcript. 
    Your job is to turn it into a highly engaging, well-formatted blog post.
    
    The tone of the blog post should be: {tone}.
    
    You MUST return ONLY a valid JSON object (no other text). 
    The JSON object must have exactly these keys:
    - "title": A catchy title for the blog post.
    - "seo_title": An SEO optimized title (around 60 characters).
    - "meta_description": An SEO meta description (around 150 characters).
    - "slug": A URL-friendly slug (e.g., "how-to-bake-cake").
    - "seo_score": An integer between 1 and 100 representing the SEO strength of the post.
    - "blog_post": The actual blog post content written in Markdown format (use ## for headings, bullet points, bold text, etc.).
    
    Here is the transcript:
    {transcript}
    """
    
    try:
        # Send the prompt to Gemini using the new 'google-genai' syntax and newest model
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt
        )
        raw_text = response.text
        
        # Clean it up (remove the Markdown fences if Gemini added them)
        clean_text = clean_json_response(raw_text)
        
        # Convert the text string into a real Python dictionary
        blog_data = json.loads(clean_text)
        
        return blog_data
        
    except json.JSONDecodeError:
        raise ValueError("Gemini didn't return proper JSON. It returned this instead:\n" + raw_text)
    except Exception as e:
        raise ValueError(f"Failed to generate blog post with AI. Error: {e}")

# --- TESTING AREA ---
if __name__ == "__main__":
    print("--- Starting AI Test ---")
    
    # A tiny fake transcript for testing so we don't wait too long
    fake_transcript = "In this video, I'll show you how to make a peanut butter and jelly sandwich. First, take two slices of bread. Then, spread peanut butter on one side and jelly on the other. Finally, smash them together and eat it. It's that easy!"
    
    try:
        print("Sending request to Gemini... (This might take 5-10 seconds)")
        
        # Let's ask it to write the blog post in a "humorous" tone!
        result = generate_blog_post(fake_transcript, tone="humorous")
        
        print("\n🎉 Success! Here is the data Gemini sent back:")
        print("--------------------------------------------------")
        print(f"Title: {result.get('title')}")
        print(f"SEO Title: {result.get('seo_title')}")
        print(f"Slug: {result.get('slug')}")
        print(f"SEO Score: {result.get('seo_score')} / 100")
        print("\nSnippet of the Blog Post:")
        
        # We only print the first 250 characters of the blog post to keep the terminal clean
        print(result.get('blog_post')[:250] + "...\n") 
        print("--------------------------------------------------")
        
    except Exception as e:
        print(f"\nUh oh, something went wrong: {e}")