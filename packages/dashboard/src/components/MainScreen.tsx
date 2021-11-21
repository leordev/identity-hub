import { useState } from 'react'
import { BiErrorCircle } from 'react-icons/bi'

import { IdentityHubClient, InterfaceStatus } from '../lib/IdentityHubClient'
import { Alert } from './Alert'
import { InterfacesMenu } from './InterfacesMenu'
import { SelectTargetForm, SelectTargetFormData } from './SelectTargetForm'

const identityHubClient = new IdentityHubClient()

export const MainScreen = () => {
  const [selectedTarget, setSelectedTarget] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [interfaces, setInterfaces] = useState<InterfaceStatus | undefined>()
  const [error, setError] = useState('')

  const onDidTargetSelect = async (formData: SelectTargetFormData) => {
    console.info('selecting did', formData.target)
    setIsLoading(true)
    setError('')
    try {
      const interfaces = await identityHubClient.callFeatureDetectionRead(formData.target)
      setSelectedTarget(formData.target)
      setInterfaces(interfaces)
    } catch (error) {
      const errorMessage = `Fail to load target: ${error}`
      console.error(errorMessage, error)
      setError(errorMessage)
    }
    setIsLoading(false)
  }

  const clearTargetSelection = () => {
    setSelectedTarget('')
    setInterfaces(undefined)
  }

  return (
    <div className="space-y-3">
      <div className="card shadow">
        <div className="card-body">
          {selectedTarget ? (
            <>
              <h2 className="card-title">Selected {selectedTarget}</h2>
              <a className="link link-primary" onClick={clearTargetSelection}>
                Change selected DID
              </a>
            </>
          ) : (
            <SelectTargetForm onSubmit={onDidTargetSelect} isLoading={isLoading} />
          )}
        </div>
      </div>
      {error && <Alert type="error" message={error} />}
      {interfaces && <InterfacesMenu interfaces={interfaces} />}
    </div>
  )
}
