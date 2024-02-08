import React, { Suspense } from 'react'
import MessageList from './message-list'
import { supabaseServer } from '@/lib/supabase/server'
import InitMessages from '@/lib/store/init-messages'

export default async function ChatMessages() {

  const supabase = supabaseServer()
  const {data} = await supabase.from("messages").select("*,users(*)")
  return (
    <Suspense fallback = {"loading..."}>
      <MessageList/>
      <InitMessages messages={data||[]}/>
    </Suspense> 
  )
}
