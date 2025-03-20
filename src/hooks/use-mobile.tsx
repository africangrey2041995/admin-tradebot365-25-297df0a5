
import * as React from "react"

const MOBILE_BREAKPOINT = 640 // Changed from 768 to 640 for better mobile detection

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const onChange = () => {
      const isMobileView = window.innerWidth < MOBILE_BREAKPOINT
      setIsMobile(isMobileView)
      
      // Handle html class for global styles
      if (isMobileView) {
        document.documentElement.classList.add('is-mobile')
      } else {
        document.documentElement.classList.remove('is-mobile')
      }
    }
    
    mql.addEventListener("change", onChange)
    onChange() // Call initially to set the state
    
    return () => {
      mql.removeEventListener("change", onChange)
    }
  }, [])

  return !!isMobile
}
