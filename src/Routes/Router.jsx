import { lazy } from 'react'


// public Routes Files
const LogConsole = lazy(() => import('../Pages/LogConsole'))



const RoutesDetails = [
  { path: '/log_Console', Component: LogConsole, exact: true },
]

export default RoutesDetails
