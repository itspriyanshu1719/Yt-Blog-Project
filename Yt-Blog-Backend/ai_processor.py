import os
import time
from dotenv import load_dotenv
from google import genai
from google.genai import types
from pydantic import BaseModel, Field

# Load the secret key
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("No API key found in .env file.")

# Initialize the Gemini Client
client = genai.Client(api_key=api_key)

# 1. Define the exact structure we want using Pydantic
class BlogPost(BaseModel):
    title: str = Field(description="A catchy title for the blog post.")
    seo_title: str = Field(description="An SEO optimized title (approx 60 chars).")
    meta_description: str = Field(description="An SEO meta description (approx 150 chars).")
    slug: str = Field(description="A URL-friendly slug.")
    seo_score: int = Field(description="An integer between 1 and 100.")
    blog_post: str = Field(description="Markdown formatted blog post content.")

def generate_blog_post(transcript, tone="professional"):
    """
    Sends the transcript to Gemini and requests structured output 
    guaranteed to match our BlogPost schema. Includes 503 retry logic.
    """
    prompt = f"Convert this YouTube transcript into an engaging blog post with a {tone} tone:\n\n{transcript}"
    
    max_retries = 3
    current_model = 'gemini-2.5-flash' # We will stick to the model you want!
    
    for attempt in range(max_retries):
        try:
            # Use response_schema to force Gemini to return JSON that matches our Pydantic model
            response = client.models.generate_content(
                model=current_model,
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_schema=BlogPost,
                ),
            )
            
            # The SDK automatically handles the JSON parsing into our model.
            # We use .model_dump() to convert it back to a standard dictionary 
            # so that main.py can safely use bracket notation like blog_data["title"]
            return response.parsed.model_dump()
            
        except Exception as e:
            error_msg = str(e)
            
            # Check if it is a Server Overloaded (503) or Rate Limit (429) error
            if "503" in error_msg or "UNAVAILABLE" in error_msg or "429" in error_msg:
                if attempt < max_retries - 1:
                    wait_time = 4 * (attempt + 1) # Wait 4 seconds, then 8 seconds
                    print(f"⚠️ Model busy. Retrying in {wait_time}s using {current_model}...")
                    time.sleep(wait_time)
                    continue # Try the loop again
            
            # If it fails for another reason, or we run out of retries, throw the error
            raise ValueError(f"Failed to generate structured blog post: {error_msg}")

# --- TESTING AREA ---
if __name__ == "__main__":
    fake_transcript = "How to make a PB&J: Get bread, peanut butter, and jelly. Spread. Combine. Eat."
    
    print("Testing AI Generation (handling server loads if necessary)...")
    result = generate_blog_post(fake_transcript, tone="humorous")
    
    print(f"\n✅ Success!")
    # Now that it returns a dictionary, we test it using dictionary bracket notation
    print(f"Title: {result['title']}")
    print(f"SEO Score: {result['seo_score']}")
    print(f"Content snippet: {result['blog_post'][:100]}...")