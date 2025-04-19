"use client"
import { Button } from "@bugpilot/ui/components/button"
import { useAuth } from "@clerk/nextjs"
import { useEffect } from "react"
export default function Page() {
  const { getToken } = useAuth()

  useEffect(() => {
    getToken({
      template: 'logpilot_jwt'
    }).then((token) => {
      console.log(token)
    })
  }, [])

  return (
    <Button>
      Click me
    </Button>
  )
}


