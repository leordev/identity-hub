import { BiCheckCircle, BiCircle } from 'react-icons/bi'

import { InterfacesStatus } from '../lib/IdentityHubClient'

interface InterfacesMenuProps {
  interfaces: InterfacesStatus
  selectedInterface: string
  onSelect: (newInterface: string) => Promise<void>
}

export const InterfacesMenu = ({ interfaces, onSelect, selectedInterface }: InterfacesMenuProps) => {
  return (
    <>
      <ul className="menu py-3 shadow-lg bg-base-100 rounded-box">
        <li className="menu-title">
          <span>Interfaces List</span>
        </li>
        {Object.keys(interfaces).map((key, index) => (
          <InterfaceMenuItem
            key={`interface-item-${index}`}
            interfaceName={key}
            selected={key === selectedInterface}
            onClick={() => onSelect(key)}
            enabled={interfaces[key]}
          />
        ))}
      </ul>
    </>
  )
}

interface InterfaceMenuItemProps {
  interfaceName: string
  enabled?: boolean
  selected?: boolean
  onClick: () => void
}
const InterfaceMenuItem = ({ enabled, selected, interfaceName, onClick }: InterfaceMenuItemProps) => {
  const icon = enabled ? <BiCheckCircle className={ICON_CLASS} /> : <BiCircle className={ICON_CLASS} />
  return (
    <li className={`${!enabled ? 'disabled' : ''} ${selected ? 'bordered font-bold' : ''}`}>
      <a onClick={onClick}>
        {icon} {interfaceName}
      </a>
    </li>
  )
}

const ICON_CLASS = 'inline-block w-5 h-5 mr-2 stroke-current'
