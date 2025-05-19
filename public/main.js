document.getElementById('shortenBtn').addEventListener('click', async () => {
    const urlInput = document.getElementById('urlInput');
    const aliasInput = document.getElementById('aliasInput');
    const result = document.getElementById('result');
    const url = urlInput.value.trim();
    const alias = aliasInput.value.trim();
    
    if (url) {
      try {
        const response = await fetch('/shorten', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, alias })
        });
  
        if (response.ok) {
          const data = await response.json();
          result.textContent = 'Short URL: ' + data.shortUrl;
        } else {
          const errorData = await response.json();
          result.textContent = `Error: ${errorData.error}`;
        }
  
      } catch (err) {
        result.textContent = 'Error shortening URL';
      }
    }
  });
  