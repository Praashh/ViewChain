"use client"

import React, { useEffect, useState } from 'react'

const useCheckUserBoarded = () => {
    const [status, setStatus] = useState<boolean>(false);


    useEffect(() => {
      if (typeof window !== 'undefined') {
        const savedStatus = localStorage.getItem('reclaimVerificationStatus');
        const savedProofs = localStorage.getItem('reclaimProofs-viewchain');
        
        if (savedStatus === 'verified' && savedProofs) {  
          setStatus(true);
        }
      }
    }, []);
    
    const callbackUrl = status ? '/marketplace' : '/onboarding'

    return {
        callbackUrl,
        isUserOnBoarded: status
    }
}

export default useCheckUserBoarded