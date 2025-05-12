'use client';
import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { SessionProvider } from 'next-auth/react';
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('@solana/wallet-adapter-react-ui/styles.css');
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

import { clusterApiUrl } from '@solana/web3.js';
import { OnBoardingProvider } from '@/context/onBoarding';
import { getSessionForOnBoarding } from '@/actions/getSession';

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await getSessionForOnBoarding();
        if (res.success) {
          setIsOnboarded(res.user?.isOnboarded!)
        } else {
          setIsOnboarded(false)
        }
      } catch (err) {
        console.error('Error fetching session:', err);
        setIsOnboarded(false)
      } 
    };

    fetchSession();
  }, []);

  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange={false}
    >
      <SessionProvider>
        <OnBoardingProvider value={{isOnboarded}}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>{children}</WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
        </OnBoardingProvider>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default WalletContextProvider;