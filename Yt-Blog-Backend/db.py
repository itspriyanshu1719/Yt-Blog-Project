from sqlmodel import SQLModel, create_engine, Session
from models import BlogPost  # We import our blueprint from Step 1 so the engine knows about it!

# This is the name of the file that will be created on your computer to hold the data
sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

# The engine is the thing that actually does the heavy lifting of talking to SQLite
# check_same_thread=False is a specific requirement when using SQLite with FastAPI
engine = create_engine(sqlite_url, echo=True, connect_args={"check_same_thread": False})

def create_db_and_tables():
    """
    This tells SQLModel to look at all our models (like BlogPost) 
    and create the actual tables inside the database file.
    """
    SQLModel.metadata.create_all(engine)

def get_session():
    """
    Whenever we want to read or write to the database, we need a 'Session'.
    Think of it like opening a connection, doing our work, and closing it.
    """
    with Session(engine) as session:
        yield session

# --- TESTING AREA ---
if __name__ == "__main__":
    print("--- Testing Database Setup ---")
    create_db_and_tables()
    print("🎉 Success! Database and tables created!")
