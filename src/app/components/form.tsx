import * as React from 'react'
import {useState, useEffect} from 'react'
////
const useForm = ({onSubmit}: {onSubmit: () => void}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit()
  }
  const render = ({children, className}: {children: React.ReactNode; className: string}) => {
    return (
      <form className={className} onSubmit={handleSubmit}>
        {children}
      </form>
    )
  }
  return {render}
}

export default useForm
