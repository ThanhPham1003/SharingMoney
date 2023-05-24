import React, {useState, createContext} from 'react'

// interface RoomUpdatedContextProps {
//   children: any,
// }
type FriendUpdatedContextProps = {
  children: React.ReactNode
}
export type ReloadType = {
  isFriendListUpdated: boolean 
}
export type FriendUpdatedContextType = {
  reload: ReloadType | null
  setReload: React.Dispatch<React.SetStateAction<ReloadType | null>>
  
}
const FriendUpdatedContext = createContext<FriendUpdatedContextType | null>(null)

const FriendUpdatedProvider = ({children} : FriendUpdatedContextProps) => {
  const [reload, setReload] = useState<ReloadType | null>({isFriendListUpdated: false})
  return <FriendUpdatedContext.Provider value={{reload, setReload}}>{children}</FriendUpdatedContext.Provider>
}
export {FriendUpdatedContext, FriendUpdatedProvider}