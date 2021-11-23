import { BiLogOutCircle } from 'react-icons/bi'

interface Props {
  did: string
  clearSelectedDid: () => Promise<void>
}

export const IdentityMenu = ({ did, clearSelectedDid }: Props) => {
  return (
    <div className="flex items-center">
      <span className="overflow-ellipsis truncate max-w-120">{did}</span>
      <button className="btn btn-square btn-ghost" onClick={clearSelectedDid}>
        <BiLogOutCircle className="inline-block w-6 h-6 stroke-current" />
      </button>
    </div>
  )
}
