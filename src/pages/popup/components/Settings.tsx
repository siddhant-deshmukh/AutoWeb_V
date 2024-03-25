import React from 'react'
import EnterKeysForm from './EnterKeysForm'
import { useContext } from 'react'
import { AppContext } from '../AppContext'

function Settings() {
  const { setCurrPage } = useContext(AppContext)

  return (
    <main>
      <header className='settings-header title-heading'>
        <div>
          <button
            onClick={() => { setCurrPage("main") }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </button>
        </div>
        <h1>Settings</h1>
      </header>
      < EnterKeysForm />
    </main>
  )
}

export default Settings