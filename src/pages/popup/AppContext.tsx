import { useRef } from "react";
import React, { useEffect, useState } from "react";

export const AppContext = React.createContext<{
  loding: boolean
  setLoding: React.Dispatch<React.SetStateAction<boolean>>
  apiKey: IApiKeys
  setApiKey: React.Dispatch<React.SetStateAction<IApiKeys>>
  currPage: "main" | "setting"
  setCurrPage: React.Dispatch<React.SetStateAction<"main" | "setting">>
  tabId: number
}>({
  loding: true,
  apiKey: null,
  currPage: "main",
  tabId: -1,
  setLoding: () => { },
  setApiKey: () => { },
  setCurrPage: () => { }
})

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [loding, setLoding] = useState<boolean>(true)
  const [usage, setUsage] = useState<IUsage>({ claude: {}, openai: {} })
  const [apiKey, setApiKey] = useState<IApiKeys>({ claude: null, openai: null })

  // const [queryPrompt, setQueryPrompt] = useState<string | "">("")
  const [currPage, setCurrPage] = useState<'main' | 'setting'>('main')
  const [tabId, setTabId] = useState<number>(-1)
  const tabIdRef = useRef<number>(-1)
  // <command>id=430 tagType={"button"}</command>

  // const sendToDOm = useCallback(async (data: string) => {
  //   console.log(apiKey)
  //   const task = await sendDomGetTask(apiKey, data)
  //   if (task && Array.isArray(task)) {

  //   }
  // }, [apiKey])

  function OnMsgListner(message, sender, sendResponse) {
    if (message.msg === "captured_dom") {
      // Handle the message containing rects, items, and dataUrl
      console.log('Received message:', message);
      // You can update the popup UI or perform any other necessary actions here
      if (message.dataUrl) {
        const anchor = document.createElement('a');
        anchor.href = message.dataUrl;
        anchor.download = 'screenshot.png'; // Set the desired file name

        // Append the anchor to the document
        document.body.appendChild(anchor);

        // Trigger the download
        anchor.click();

        // Clean up the anchor element
        document.body.removeChild(anchor);
      }
    } else if (message.rects && message.items && message.err) {
      // Handle the error message
      console.error('Error:', message.err);
    }
  }

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      const tabId = tabs[0].id;
      tabIdRef.current = tabId
      setTabId(tabId)
      // attachDebugger(tabId)
    });


    chrome.runtime.onMessage.addListener(OnMsgListner);
    return ()=>{
      chrome.runtime.onMessage.removeListener(OnMsgListner);
    }
  }, [])

  return (
    <AppContext.Provider value={{
      tabId,
      loding, setLoding,
      apiKey, setApiKey,
      currPage, setCurrPage,
    }}>
      {children}
    </AppContext.Provider>
  )
}


export interface IApiKeys {
  openai: string | null
  claude: string | null
}

export interface IUsage {
  openai: {
    [key: string]: {
      input_tokens: number,
      output_tokens: number
    }
  }
  claude: {
    [key: string]: {
      input_tokens: number,
      output_tokens: number
    }
  }
}


export enum LLMModels {
  haiku = "claude-3-haiku-20240307",
  sonnet = "claude-3-sonnet-20240229",
  gpt4 = "gpt-4-1106-preview",
  vision = "gpt-4-1106-vision-preview"
} 