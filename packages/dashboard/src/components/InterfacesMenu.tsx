import { BiCheckCircle, BiCircle, BiErrorCircle } from 'react-icons/bi'

import { InterfaceStatus } from '../lib/IdentityHubClient'

interface InterfacesMenuProps {
  interfaces: InterfaceStatus
}

export const InterfacesMenu = ({ interfaces }: InterfacesMenuProps) => {
  return (
    <>
      <ul className="menu py-3 shadow-lg bg-base-100 rounded-box">
        <li className="menu-title">
          <span>Interfaces List</span>
        </li>
        {Object.keys(interfaces).map((key, index) => (
          <InterfaceMenuItem key={`interface-item-${index}`} interfaceName={key} enabled={interfaces[key]} />
        ))}
        <InterfaceMenuItem interfaceName="SudoEverythingWrite" />
      </ul>
    </>
  )
}

interface InterfaceMenuItemProps {
  interfaceName: string
  enabled?: boolean
}
const InterfaceMenuItem = ({ enabled, interfaceName }: InterfaceMenuItemProps) => {
  const icon = enabled ? <BiCheckCircle className={ICON_CLASS} /> : <BiCircle className={ICON_CLASS} />
  return (
    <li className={!enabled ? 'disabled' : ''}>
      <a>
        {icon} {interfaceName}
      </a>
    </li>
  )
}

const ICON_CLASS = 'inline-block w-5 h-5 mr-2 stroke-current'
