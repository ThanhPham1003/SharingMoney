import React, {useState, createContext} from 'react'

// interface RoomUpdatedContextProps {
//   children: any,
// }
type RoomUpdatedContextProps = {
  children: React.ReactNode
}
export type ReloadType = {
  isRoomListUpdated: boolean 
}
export type RoomUpdatedContextType = {
  reload: ReloadType | null
  setReload: React.Dispatch<React.SetStateAction<ReloadType | null>>
  
}
const RoomUpdatedContext = createContext<RoomUpdatedContextType | null>(null)

const RoomUpdatedProvider = ({children} : RoomUpdatedContextProps) => {
  const [reload, setReload] = useState<ReloadType | null>({isRoomListUpdated: false})
  return <RoomUpdatedContext.Provider value={{reload, setReload}}>{children}</RoomUpdatedContext.Provider>
}
export {RoomUpdatedContext, RoomUpdatedProvider}