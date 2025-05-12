'use client';

import { createContext } from 'react'

interface ContextType {
  isOnboarded?: boolean;
}
export const OnBoardingContext = createContext<ContextType>({
  isOnboarded: false,
})

export const OnBoardingProvider = OnBoardingContext.Provider;

export default OnBoardingContext;

