import { Imessage } from '@/lib/store/messages'
import React from 'react'

export default function Message({message}:{message:Imessage}) {
  return (
    <div className="flex gap-2">
    <div className="h-10 w-10 bg-blue-300 rounded-full ring-2">
      <div>
      </div>
    </div>
    <div className="flex-1">

      <div className=" flex items-center gap-1">
        <h1 className="font-bold">{message.users?.email}</h1>
        <h1 className='text-sm text-muted-foreground'> {new Date(message.created_at).toDateString()}</h1>
      </div>
      <p className="text-gray-300"> {message.messages}</p>
    </div>
  </div>
  )
}
