from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from pydantic import BaseModel

# --- Importing the tools YOU built! ---
from db import create_db_and_tables, get_session
from models import BlogPost
from transcript import extract_video_id, get_transcript
from ai_processor import generate_blog_post

# Create the FastAPI app
app = FastAPI(title="YouTube to Blog API")

# Configure CORS (Cross-Origin Resource Sharing)
# This is CRITICAL. It allows your partner's frontend (running on a different port/website) 
# to talk to your backend without the browser blocking it for security reasons.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, you'd put the exact frontend URL here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# This runs once when the server starts to make sure the database is ready
@app.on_event("startup")
def on_startup():
    create_db_and_tables()

# This defines the exact shape of the data the frontend must send us
class GenerateRequest(BaseModel):
    url: str
    tone: str = "professional"

# --- ENDPOINT 1: Generate the Blog ---
@app.post("/generate")
def generate_post(request: GenerateRequest, session: Session = Depends(get_session)):
    try:
        # 1. Get the Transcript
        video_id = extract_video_id(request.url)
        raw_transcript = get_transcript(video_id)
        
        # 2. Send to Gemini AI
        blog_data = generate_blog_post(raw_transcript, request.tone)
        
        # 3. Save to Database
        new_post = BlogPost(
            url=request.url,
            title=blog_data["title"],
            seo_title=blog_data["seo_title"],
            meta_description=blog_data["meta_description"],
            slug=blog_data["slug"],
            seo_score=blog_data.get("seo_score", 0), # Getting the SEO score we added
            blog_post=blog_data["blog_post"],
            tone=request.tone
        )
        session.add(new_post)
        session.commit()
        session.refresh(new_post) # Refresh to get the generated ID
        
        # 4. Return the finished post to the frontend
        return new_post
        
    except ValueError as e:
        # If any of our scripts raised a ValueError, send it clearly to the frontend
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        # 🔥 THE UPGRADE: This prints the EXACT error to your terminal so we can fix it!
        print(f"\n🔥 THE REAL ERROR IS: {e}\n")
        raise HTTPException(status_code=500, detail=f"Server Error: {str(e)}")

# --- ENDPOINT 2: Get History List ---
@app.get("/history")
def get_history(session: Session = Depends(get_session)):
    # Grab all posts from the database, ordered by newest first
    posts = session.exec(select(BlogPost).order_by(BlogPost.id.desc())).all()
    return posts

# --- ENDPOINT 3: Get Single Post ---
@app.get("/history/{post_id}")
def get_single_post(post_id: int, session: Session = Depends(get_session)):
    post = session.get(BlogPost, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

# --- ENDPOINT 4: Delete Single Post ---
@app.delete("/history/{post_id}")
def delete_post(post_id: int, session: Session = Depends(get_session)):
    post = session.get(BlogPost, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    session.delete(post)
    session.commit()
    return {"message": "Post deleted successfully"}