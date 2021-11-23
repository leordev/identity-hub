import { identityHubClient, InterfacesStatus } from '../lib/IdentityHubClient'
import { InterfacesMenu } from './InterfacesMenu'
import ReactJson, { InteractionProps } from 'react-json-view'
import { useEffect, useState } from 'react'

interface Props {
  did: string
  interfaces: InterfacesStatus
}

export const DashboardPanels = ({ did, interfaces }: Props) => {
  const [selectedInterface, setSelectedInterface] = useState('')
  const [data, setData] = useState<any>({})
  const [changedData, setChangedData] = useState<any>({})
  const [enableEdit, setEnableEdit] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!selectedInterface && interfaces['ProfileRead']) {
      // Selects ProfileRead by default, to load IdentityHub owner profile data
      handleInterfaceSelection('ProfileRead')
    }
  }, [interfaces, selectedInterface])

  const handleInterfaceSelection = async (newInterface: string) => {
    switch (newInterface) {
      case 'FeatureDetectionRead':
        await loadInterfacesData()
        setEnableEdit(false)
        break
      case 'ProfileRead':
        await loadProfileData()
        setEnableEdit(false)
        break
      case 'ProfileWrite':
        await loadProfileData()
        setChangedData(() => data)
        setEnableEdit(true)
        break
      default:
        return alert('Interface not supported yet. Todo: Implement it!')
    }
    setSelectedInterface(newInterface)
  }

  const loadInterfacesData = async () => {
    const interfacesData = await identityHubClient.callFeatureDetectionRead(did)
    console.info('loaded interfaces data', interfacesData)
    setData(interfacesData)
  }

  const loadProfileData = async () => {
    try {
      const profileReadData = await identityHubClient.callProfileRead(did)
      setData(profileReadData)
    } catch (error) {
      const errorMessage = `Fail to load profile data: ${error}`
      console.error(errorMessage, error)
      alert(errorMessage)
      setData(undefined)
    }
  }

  const onChange = (interaction: InteractionProps) => {
    setChangedData(interaction.updated_src)
  }

  const handleEditSubmission = async () => {
    setIsLoading(true)
    try {
      switch (selectedInterface) {
        case 'ProfileWrite':
          await handleProfileWrite()
          break
        default:
          throw new Error('Interface write is not implemented yet.')
      }
    } catch (error) {
      const errorMessage = `Fail to edit: ${error}`
      console.error(errorMessage, error)
      alert(errorMessage)
    }
    setIsLoading(false)
  }

  const handleProfileWrite = async () => {
    const profileData = changedData
    await identityHubClient.callProfileWrite(did, profileData)
    setData(profileData)
    alert('Profile written successfully!')
  }

  const hasChanges = JSON.stringify(changedData) !== JSON.stringify(data)

  return (
    <div className="grid grid-cols-4 gap-4">
      <InterfacesMenu
        interfaces={interfaces}
        selectedInterface={selectedInterface}
        onSelect={handleInterfaceSelection}
      />
      <div className="col-span-3">
        <div className="card shadow">
          <div className="card-body">
            <h2 className="card-title">{selectedInterface}</h2>
            <ReactJson
              name={false}
              displayDataTypes={false}
              src={data}
              onEdit={enableEdit && onChange}
              onDelete={enableEdit && onChange}
              onAdd={enableEdit && onChange}
            />
            {enableEdit && (
              <div className="m-4 text-right">
                <button
                  className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                  disabled={!hasChanges}
                  onClick={handleEditSubmission}
                >
                  {isLoading ? 'Sending...' : 'Send'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-4">
        <div className="divider"></div>
        <p>
          <strong>Selected DID</strong>
        </p>
        <p className="break-words font-mono">{did}</p>
      </div>
    </div>
  )
}

const profileSample = {
  '@context': 'http://schema.org',
  '@type': 'Person',
  name: 'Jeffrey Lebowski',
  givenName: 'Jeffery',
  middleName: 'The Big',
  familyName: 'Lebowski',
  description: "That's just, like, your opinion, man.",
  website: 'https://ilovebowling.com',
  email: 'jeff@ilovebowling.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '5227 Santa Monica Boulevard',
    addressLocality: 'Los Angeles',
    addressRegion: 'CA',
  },
}
