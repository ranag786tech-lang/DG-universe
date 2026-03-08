import time
import asyncio
from playwright.async_api import async_playwright
import os
import subprocess

async def run_benchmark():
    # Start a local server
    server = subprocess.Popen(["python3", "-m", "http.server", "8000"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(2)  # Wait for server to start

    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page()
            await page.goto("http://localhost:8000/DigiD-Dev-Editor/Index.html")

            # Create a large text (~1MB)
            large_text = "Hello World! " * 80000

            # Set editor content
            # Using JSON.stringify to safely pass large string
            await page.evaluate("text => editor.setValue(text)", large_text)

            # Measure saveToStorage
            start_time = time.time()
            for _ in range(5):
                await page.evaluate("saveToStorage()")
            save_duration = (time.time() - start_time) / 5
            print(f"Average saveToStorage duration: {save_duration:.4f}s")

            # Measure replaceAll
            # We want to replace "World" with "Earth"
            start_time = time.time()
            await page.evaluate("""
                document.getElementById('findReplaceButton').click();
                document.getElementById('findInput').value = 'World';
                document.getElementById('replaceInput').value = 'Earth';
                replaceAll();
            """)
            replace_duration = time.time() - start_time
            print(f"replaceAll duration: {replace_duration:.4f}s")

            await browser.close()
    finally:
        server.terminate()

if __name__ == "__main__":
    import json as json_mod
    os.json = json_mod
    asyncio.run(run_benchmark())
