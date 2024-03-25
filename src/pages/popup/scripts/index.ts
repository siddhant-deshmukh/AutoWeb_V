document?.getElementById('outline-btn')?.addEventListener('click', async () => {
  const fixColor = (document?.getElementById('fix-color-checkbox') as HTMLInputElement)?.checked;
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab.id) {
    chrome.tabs.sendMessage(tab.id, { action: 'outlineElements', fixColor }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error outlining elements:', chrome.runtime.lastError.message);
      } else {
        console.log(response)
      }
    });
  }
});

