'use client'

import Link from "next/link"
import { Button, buttonVariants } from "./ui/button"
import { supabaseBrowser } from "@/lib/supabase/browser"
import { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

export default function ChatHeader({user}:{user:User | undefined}) {
  const supabase = supabaseBrowser();
  const router  = useRouter()

  const handleLoginWithGit=()=>{
    supabase.auth.signInWithOAuth({
      provider:"github",
      options:{
        redirectTo:location.origin+"/auth/callback",
      }
    })

  }
  const handleLogout= async ()=>{
    await supabase.auth.signOut();
    router.refresh();
  }
  return (
    <div>
      <div className="h-20">
        <div className="p-5 border-b flex items-center justify-between h-full">
          <div>
            <h1 className="text-xl font-bold">ChatR</h1>
            <div className="flex items-center gap-1">
              <div className="h-4 w-4 bg-blue-500 rounded-full animate-pulse"></div>
              <h2 className="text-sm text-gray-400">2 Online</h2>
            </div>
          </div>
          {user ? (
          <Button  onClick={handleLogout} variant={'secondary'}> Logout </Button>
          ):(<Button  onClick={handleLoginWithGit}> Login </Button>)}
        </div>
      </div>
    </div>
  )
}
