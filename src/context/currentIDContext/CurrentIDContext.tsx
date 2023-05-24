import React, {useState, createContext} from 'react'
import { Decode } from '@root/shared/services/decode/jwt-decode';
// interface RoomUpdatedContextProps {
//   children: any,
// }
type CurrentIDContextProps = {
  children: React.ReactNode
}
export type ReloadType = {
  id: string 
}
export type CurrentIDContextType = {
  currentID: ReloadType | null
  setCurrentID: React.Dispatch<React.SetStateAction<ReloadType | null>>
  
}
const CurrentIDContext = createContext<CurrentIDContextType | null>(null)

const CurrentIDProvider = ({children} : CurrentIDContextProps) => {
  const [currentID, setCurrentID] = useState<ReloadType | null>({id: ""})
  return <CurrentIDContext.Provider value={{currentID, setCurrentID}}>{children}</CurrentIDContext.Provider>
}
export {CurrentIDContext, CurrentIDProvider}