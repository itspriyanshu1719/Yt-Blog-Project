# YouTube-to-Blog Converter

A full-stack application that transforms any YouTube video into a polished, SEO-ready blog post using the Gemini AI API. Users simply paste a URL, select a tone, and receive a formatted blog post with metadata.

## Features

* **Transcript Extraction**: Automatically fetches captions from YouTube videos.
* **AI Processing**: Uses Google Gemini to generate structured, SEO-friendly content.
* **Tone Selection**: Customize output with professional, casual, humorous, or educational tones.
* **History Tracking**: Automatically saves generated posts in a local SQLite database.
* **SEO Panel**: Instant access to titles, meta descriptions, and URL slugs for every post.
* **Responsive UI**: Built with Next.js and Tailwind CSS for a seamless experience.

## Tech Stack

* **Frontend**: Next.js (App Router), React, Tailwind CSS, `react-markdown`.
* **Backend**: Python, FastAPI, SQLModel (SQLite).
* **AI/API**: Google Gemini API, YouTube Transcript API.
* **Deployment**: Vercel (Frontend), Render (Backend).

## 📦 Installation & Setup

### Prerequisites

* Python 3.10+
* Node.js 18+
* A [Gemini API Key](https://aistudio.google.com/)

### Backend Setup

1. Clone the repository and navigate to the backend folder.
2. Create and activate a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

```
```
3. Install dependencies:
   ```bash
   pip install fastapi uvicorn youtube-transcript-api google-generativeai python-dotenv sqlmodel

```
4. Create a `.env` file with your key:
```env
GEMINI_API_KEY=your_api_key_here

```
```
5. Run the server:
   ```bash
   uvicorn main:app --reload --port 8000

```

### Frontend Setup

1. Navigate to the frontend directory.
2. Install dependencies:
```
bash
npm install

```
3. Create a `.env.local` file:
   ```
   env
   NEXT_PUBLIC_API_URL=http://localhost:8000

4. Start the development server:

```
bash
npm run dev

```

## Usage
1. Open `http://localhost:3000` in your browser.
2. Click "New Form" to open the generator.
3. Paste a YouTube URL, select your desired tone, and hit "Generate."
4. View the result, copy the article text, or review SEO metadata.
5. Visit the `/history` page to revisit previously generated posts.

## 🤝 Contributing
Contributions are welcome! Please feel free to open an issue or suggest ideas for improvements.
