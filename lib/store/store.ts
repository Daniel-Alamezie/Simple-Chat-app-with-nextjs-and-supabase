import { User } from '@supabase/supabase-js'
import { create } from 'zustand'

interface userState {
  user: User|undefined
}

const useUser = create<userState>()((set) => ({
  user: undefined,

}))

export default useUser;