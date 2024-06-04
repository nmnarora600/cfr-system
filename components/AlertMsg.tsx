import { AlertCircle } from 'lucide-react'
import React from 'react'

function AlertMsg({msg}:{msg:string}) {
  return (
    <div className=' text-red-500 mt-5  rounded-md flex gap-2 items-center justify-center'>
        <AlertCircle/>{msg}
    </div>
  )
}

export default AlertMsg