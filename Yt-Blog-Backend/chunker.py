def chunk_text(text, max_chars=5000):
    """
    Splits a long transcript into smaller chunks without cutting sentences in half.
    We default to 5000 characters per chunk, which is a safe, readable size for AI.
    """
    # If the text is already short enough, just give it back as a single chunk!
    if len(text) <= max_chars:
        return [text]

    # Split the giant text by periods to separate it into sentences.
    # We add the period back at the end because the .split() command removes it.
    raw_sentences = text.split(".")
    sentences = []
    for sentence in raw_sentences:
        if sentence.strip(): # Make sure it's not an empty blank space
            sentences.append(sentence.strip() + ".")

    chunks = []
    current_chunk = ""

    # Loop through every single sentence
    for sentence in sentences:
        # Check: If we add this sentence to our current chunk, will it be too big?
        if len(current_chunk) + len(sentence) > max_chars:
            # It's too big! Save the current chunk to our list...
            chunks.append(current_chunk.strip())
            # ...and start a brand new chunk with this sentence.
            current_chunk = sentence + " "
        else:
            # It fits! Add it to the current chunk.
            current_chunk += sentence + " "

    # After the loop finishes, we might have a little bit of text left over.
    # Don't forget to save the very last piece!
    if current_chunk.strip():
        chunks.append(current_chunk.strip())

    return chunks


# --- TESTING AREA ---
if __name__ == "__main__":
    print("--- Starting Test ---")
    
    # Let's create a fake transcript that is just the same sentence repeated 100 times.
    # Total length will be roughly 4,400 characters.
    fake_sentence = "This is a test sentence to see if our chunking works."
    fake_transcript = (fake_sentence + " ") * 100 
    
    print(f"Total length of our fake transcript: {len(fake_transcript)} characters.")
    
    # We will test it by forcing it to make chunks of only 500 characters max
    print("\nChopping it up into 500-character chunks...")
    result_chunks = chunk_text(fake_transcript, max_chars=500)
    
    print(f"\nSuccess! We chopped it into {len(result_chunks)} pieces.")
    
    # Let's look at the first two chunks to verify
    print("\n--- Chunk 1 ---")
    print(result_chunks[0])
    print(f"(Length: {len(result_chunks[0])})")
    
    print("\n--- Chunk 2 ---")
    print(result_chunks[1])
    print(f"(Length: {len(result_chunks[1])})")
