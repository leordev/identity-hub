import { BiCheckCircle, BiErrorCircle, BiInfoCircle } from 'react-icons/bi'

interface AlertProps {
  message: string
  type?: 'error' | 'success'
}

export const Alert = ({ message, type }: AlertProps) => {
  const alert =
    type === 'success'
      ? { icon: <BiCheckCircle className={ICON_CLASS} />, class: 'alert-success' }
      : type === 'error'
      ? { icon: <BiErrorCircle className={ICON_CLASS} />, class: 'alert-error' }
      : { icon: <BiInfoCircle className={ICON_CLASS} />, class: 'alert-info' }

  return (
    <div className={`alert ${alert.class}`}>
      <div className="flex-1">
        {alert.icon}
        <label>{message}</label>
      </div>
    </div>
  )
}

const ICON_CLASS = 'w-6 h-6 mx-2 stroke-current'
