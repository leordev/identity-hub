import { useState } from 'react'

import { identityHubClient, InterfacesStatus } from './lib/IdentityHubClient'
import { TopMenu } from './components/TopMenu'
import { Alert } from './components/Alert'
import { InstructionsCard } from './components/InstructionsCard'
import { DashboardPanels } from './components/DashboardPanels'

const App = () => {
  const [selectedDid, setSelectedDid] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [interfaces, setInterfaces] = useState<InterfacesStatus | undefined>()
  const [error, setError] = useState('')

  const onDidEnter = async (did: string) => {
    console.info('selecting did', did)
    setIsLoading(true)
    setError('')
    try {
      const interfaces = await identityHubClient.callFeatureDetectionRead(did)
      setSelectedDid(did)
      setInterfaces(interfaces)
    } catch (error) {
      const errorMessage = `Fail to load did: ${error}`
      console.error(errorMessage, error)
      setError(errorMessage)
    }
    setTimeout(() => setIsLoading(false), 2000)
  }

  const clearSelectedDid = async () => {
    setSelectedDid('')
    setInterfaces(undefined)
  }

  return (
    <div className="p-4 lg:p-10 space-y-3">
      <TopMenu
        isLoading={isLoading}
        onDidEnter={onDidEnter}
        clearSelectedDid={clearSelectedDid}
        selectedDid={selectedDid}
      />
      {!selectedDid && <InstructionsCard />}
      {error && <Alert type="error" message={error} />}
      {interfaces && <DashboardPanels did={selectedDid} interfaces={interfaces} />}
    </div>
  )
}

export default App
