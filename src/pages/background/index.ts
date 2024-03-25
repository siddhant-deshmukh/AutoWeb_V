import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';

reloadOnUpdate('pages/background');


console.log('background loaded');




import { Action, ActionTypes, CaptureSSCurrTabData } from "../../types";

chrome.runtime.onMessage.addListener((action: Action<ActionTypes>, sender, sendResponse) => {
  console.log("action", action)
  if (action.type === 'CaptureSSCurrTab') {
    chrome.tabs.captureVisibleTab({ format: 'png' }, (dataUrl) => {
      if (dataUrl) {
        console.log("In background", dataUrl)
        sendResponse({ success: true, dataUrl } as CaptureSSCurrTabData);
      } else {
        sendResponse({ success: false, error: 'Failed to capture the screenshot' } as CaptureSSCurrTabData);
      }
    });
    return true; // Keep the message channel open for asynchronous response
  }

});