import { useEffect, useState } from "react"

export default function useWindowDimensions():{height: number, width: number} {
  const isClient = typeof window === "object"
  const [size, setSize] = useState(getSize)

  function getSize() {
    return {
      width: isClient ? window.innerWidth : 0,
      height: isClient ? window.innerHeight : 0,
    }
  }
  function handleResize() {
    setSize(getSize())
  }
  useEffect(() => {
    if (!isClient) return
    window.addEventListener("resize", handleResize)
    return function() {
      window.removeEventListener("resize", handleResize)
    }
  }, [])
  // remove if no bugs occurred
  // useEffect(() => {
  //   if (!isClient) return
  //   window.addEventListener("resize", handleResize)
  //   return function() {
  //     window.removeEventListener("resize", handleResize)
  //   }
  // }, [size]) // clean only size has changed

  return size || getSize()
}
