import { useContext, useRef } from 'react'

import { AppContext } from '../AppContext'
import { storeKey } from '../scripts/storage'

export default function EnterKeysForm() {

  const { setApiKey, apiKey, setCurrPage } = useContext(AppContext)
  const openAIKeyInputRef = useRef<HTMLInputElement | null>(null)

  return (
    <div className="input-container">
      <label className="input-label" htmlFor="open-ai-key">OpenAI key:</label>
      <div>
        <input ref={openAIKeyInputRef} type="password" id="open-ai-key" defaultValue={apiKey.openai} className="password-input" />
        <button
          onClick={() => {
            console.log("Meow!")
            if (openAIKeyInputRef.current && openAIKeyInputRef.current.value.length > 0) {
              console.log("Here!")
              storeKey("openai", openAIKeyInputRef.current.value).then((v)=>{
                if(v){
                  setApiKey(prev => {
                    return { ...prev, openai: openAIKeyInputRef.current.value }
                  })
                  setCurrPage("main")
                }
              })
            }
          }}>Save</button>
      </div>
    </div>
  )
}
