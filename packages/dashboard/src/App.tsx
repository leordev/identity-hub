import { MainScreen } from './components/MainScreen'
import { NavBarMenu } from './components/NavbarMenu'

const App = () => {
  return (
    <div className="p-4 lg:p-10">
      <NavBarMenu />
      <MainScreen />
    </div>
  )
}

export default App
