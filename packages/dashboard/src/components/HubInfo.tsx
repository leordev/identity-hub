const FeatureDetection = () => {
  return (
    <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
      <div className="flex-none px-2 mx-2">
        <span className="text-lg font-bold">IdentityHub</span>
      </div>
      <div className="flex-1 px-2 mx-2">
        <div className="items-stretch hidden sm:flex">
          <MenuItem label="Hoame" />
          <MenuItem label="About" />
        </div>
      </div>
    </div>
  )
}

interface MenuItemProps {
  label: string
}
const MenuItem = ({ label }: MenuItemProps) => <a className="btn btn-ghost btn-sm rounded-btn">{label}</a>

export default FeatureDetection
