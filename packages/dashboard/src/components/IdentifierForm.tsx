import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { BiLogInCircle } from 'react-icons/bi'

export type IdentifierFormData = {
  did: string
}

interface Props {
  isLoading: boolean
  onSubmit: (data: IdentifierFormData) => Promise<void>
}

export const IdentifierForm = ({ onSubmit, isLoading }: Props) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<IdentifierFormData>({
    mode: 'onSubmit',
  })

  useEffect(() => {
    if (isSubmitting && errors?.did?.type === 'pattern') {
      alert(errors.did.message)
    }
  }, [errors, isSubmitting])

  const preSubmitForm = (data: IdentifierFormData) => {
    if (isLoading) return
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(preSubmitForm)} className="flex">
      <div className="form-control">
        <input
          type="text"
          placeholder="Enter identifier, eg: did:ion:abcdef123456"
          className={`input text-white input-ghost min-w-100 ${errors?.did ? 'input-error' : ''}`}
          {...register('did', {
            required: true,
            pattern: { value: DID_FORM_PATTERN, message: 'invalid did format' },
          })}
        />
      </div>
      {isLoading ? (
        <button className="btn btn-square btn-ghost loading"></button>
      ) : (
        <button type="submit" className={`"btn btn-square`}>
          <BiLogInCircle className="inline-block w-6 h-6 stroke-current" />
        </button>
      )}
    </form>
  )
}

export const DID_FORM_PATTERN = /^(did:){1}(\w)+:.+$/i
