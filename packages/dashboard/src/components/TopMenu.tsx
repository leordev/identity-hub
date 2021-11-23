import { IdentifierForm, IdentifierFormData } from './IdentifierForm'
import { IdentityMenu } from './IdentityMenu'

interface Props {
  isLoading: boolean
  onDidEnter: (did: string) => Promise<void>
  clearSelectedDid: () => Promise<void>
  selectedDid?: string
  profile?: any
}

export const TopMenu = ({ isLoading, onDidEnter, clearSelectedDid, selectedDid }: Props) => {
  return (
    <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
      <div className="flex-1 px-2 mx-2">
        <span className="text-lg font-bold">IdentityHub</span>
      </div>
      {selectedDid ? (
        <div>
          <IdentityMenu did={selectedDid} clearSelectedDid={clearSelectedDid} />
        </div>
      ) : (
        <div className="flex-1 lg:flex-none">
          <IdentifierForm onSubmit={({ did }) => onDidEnter(did)} isLoading={isLoading} />
        </div>
      )}
    </div>
  )
}
