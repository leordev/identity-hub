import { DEFAULT_IDENTITY_HUB_URL } from '../lib/IdentityHubClient'

export const InstructionsCard = () => {
  return (
    <div className="card shadow">
      <div className="card-body">
        <h2 className="card-title">Welcome to IdentityHub Dashboard!</h2>
        <p>
          Please select a did in the above menu to connect to the IdentityHub running at{' '}
          <code className="py-1 px-2 bg-gray-200 text-red-500 rounded">{DEFAULT_IDENTITY_HUB_URL}</code>
        </p>
      </div>
    </div>
  )
}
