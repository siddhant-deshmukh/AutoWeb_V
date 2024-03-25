// content_script.js

import { Action, ActionPayloads, ActionTypes, CaptureSSCurrTabData } from "../../types";
import get_web_react_element, { markPage } from "./markPage";

console.log("Here in content script")



chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === 'outlineElements') {
    try {
      sendResponse(true);
      const [rects, items] = get_web_react_element(request.fixColor);
      await sleep(100)
      const dataUrl = await captureScreenshot()
      console.log("in content script captured_dom",  dataUrl)
      // imgDataUrl: dataUrl 
      chrome.runtime.sendMessage({ msg: "captured_dom", rects, items, dataUrl });
    } catch (err) {
      sendResponse({ err: "Some error occured while captuing screen shot" });
    }
  }
});


async function captureScreenshot() {
  try {
    const response = await sendMessageToBackground({ type: ActionTypes.CaptureSSCurrTab }) as CaptureSSCurrTabData;
    if (response.success) {
      return response.dataUrl
    } else {
      console.error('Failed to capture the screenshot:', response.error);
      return null
    }
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    return undefined
  }
}


function sendMessageToBackground(action: Action<ActionPayloads>) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ ...action }, (response) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError.message);
      } else {
        resolve(response);
      }
    });
  });
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}