import React, {useState, createContext} from 'react'

// interface RoomUpdatedContextProps {
//   children: any,
// }
type ExpenseUpdatedContextProps = {
  children: React.ReactNode
}
export type ReloadType = {
  isExpenseListUpdated: boolean 
}
export type ExpenseUpdatedContextType = {
  reload: ReloadType | null
  setReload: React.Dispatch<React.SetStateAction<ReloadType | null>>
  
}
const ExpenseUpdatedContext = createContext<ExpenseUpdatedContextType | null>(null)

const ExpenseUpdatedProvider = ({children} : ExpenseUpdatedContextProps) => {
  const [reload, setReload] = useState<ReloadType | null>({isExpenseListUpdated: false})
  return <ExpenseUpdatedContext.Provider value={{reload, setReload}}>{children}</ExpenseUpdatedContext.Provider>
}
export {ExpenseUpdatedContext, ExpenseUpdatedProvider}