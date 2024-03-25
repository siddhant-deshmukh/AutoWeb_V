import React from 'react'
import { useContext } from 'react'
import { AppContext } from './AppContext'
import { useEffect } from 'react'
import { getKey } from './scripts/storage'
import EnterKeysForm from './components/EnterKeysForm'
import Home from './components/Home'
import Settings from './components/Settings'

export default function App() {
  const { loding, setLoding, setApiKey, apiKey, currPage } = useContext(AppContext)

  useEffect(() => {
    setLoding(true)
    Promise.all([
      getKey("claudeKey"),
      getKey("openai")
    ]).then(([claude, openai]) => {
      setApiKey((prev) => {
        const latest = { ...prev }
        if (claude) latest.claude = claude;
        if (openai) latest.openai = openai;
        return latest
      })
    }).finally(() => {
      setLoding(false)
    })
  }, [])

  if (loding) {
    return (
      <main className='items-center'>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </main>
    )
  } else if (!apiKey.openai) {
    return (
      <main className=''>
        <EnterKeysForm />
      </main>
    )
  } else if (currPage === "setting") {
    return(
      <Settings />
    )
  } else {
    return (
      <Home />
    )
  };
}
