import { useForm } from 'react-hook-form'

export type SelectTargetFormData = {
  target: string
}

interface SelectTargetFormProps {
  isLoading: boolean
  onSubmit: (data: SelectTargetFormData) => Promise<void>
}

export const SelectTargetForm = ({ onSubmit, isLoading }: SelectTargetFormProps) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<SelectTargetFormData>({
    mode: 'onChange',
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
        <div className="flex space-x-2">
          <input
            type="text"
            className="w-full input input-primary"
            placeholder="did:ion:abcdef123456"
            disabled={isLoading}
            {...register('target', {
              required: true,
              pattern: { value: DID_FORM_PATTERN, message: 'invalid did format' },
            })}
          />
          {isLoading ? (
            <button className="btn btn-primary loading">Loading...</button>
          ) : (
            <button type="submit" className="btn btn-primary" disabled={!isValid}>
              Select
            </button>
          )}
        </div>
        {errors.target && (
          <label className="label">
            <span className="label-text-alt text-error">{errors.target.message || 'did is required'}</span>
          </label>
        )}
      </div>
    </form>
  )
}

export const DID_FORM_PATTERN = /^(did:){1}(\w)+:.+$/i
