import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig, Chain } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ChakraProvider } from "@chakra-ui/react";
import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
  braveWallet,
  metaMaskWallet,
  coinbaseWallet,
  ledgerWallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets";

const { chains, provider, webSocketProvider } = configureChains(
  [goerli],
  [
    alchemyProvider({
      apiKey: "EypKcb615zspS9zr3YpMF1zNodFvArmW",
    }),
    publicProvider(),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      metaMaskWallet({ chains }),
      injectedWallet({ chains }),
      walletConnectWallet({ chains }),
      trustWallet({ chains }),
      ledgerWallet({ chains }),
    ],
  },
  {
    groupName: "Others",
    wallets: [
      coinbaseWallet({ chains, appName: "My RainbowKit App" }),
      rainbowWallet({ chains }),
      braveWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <ChakraProvider>
        <RainbowKitProvider chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </ChakraProvider>
    </WagmiConfig>
  );
}

export default MyApp;
