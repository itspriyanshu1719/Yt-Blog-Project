from typing import Optional
from datetime import datetime, timezone, timedelta
from sqlmodel import SQLModel, Field

# Define IST timezone (UTC + 5 hours and 30 minutes)
IST = timezone(timedelta(hours=5, minutes=30))

# By putting 'table=True', we are telling SQLModel to turn this Python class into a real database table!
class BlogPost(SQLModel, table=True):
    # 'id' is our Primary Key. It automatically counts up (1, 2, 3...) for every new post.
    id: Optional[int] = Field(default=None, primary_key=True)
    
    url: str
    title: str
    seo_title: str
    meta_description: str
    slug: str
    seo_score: int
    blog_post: str
    tone: str
    
    # This automatically saves the exact date and time the post was created in IST
    created_at: datetime = Field(default_factory=lambda: datetime.now(IST))