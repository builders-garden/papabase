import { useEffect, useRef, useState } from "react";
import { initOnRamp } from "@coinbase/cbpay-js";

type InitOnRampOptions = Parameters<typeof initOnRamp>[0];

type CoinbaseButtonProps = {
  destinationWalletAddress: string;
};

export default function CoinbaseButton({
  destinationWalletAddress,
}: CoinbaseButtonProps) {
  const [isReady, setIsReady] = useState(false);
  const onrampInstance = useRef<any>();

  useEffect(() => {
    //initOnRamp parameters
    const options: InitOnRampOptions = {
      appId: "AppIdProvidedByCoinbase",
      target: "#cbpay-button-container",
      widgetParameters: {
        destinationWallets: [
          {
            address: destinationWalletAddress,
            blockchains: ["base"],
          },
        ],
      },
      onSuccess: () => {
        // handle navigation when user successfully completes the flow
      },
      onExit: () => {
        // handle navigation from dismiss / exit events due to errors
      },
      onEvent: (event) => {
        // event stream
      },
      experienceLoggedIn: "embedded",
      experienceLoggedOut: "popup",
    };

    // instance.destroy() should be called before initOnramp if there is already an instance.
    if (onrampInstance.current) {
      onrampInstance.current.destroy();
    }

    initOnRamp(options, (error, instance) => {
      if (instance) {
        onrampInstance.current = instance;
        setIsReady(true);
      }
    });
  }, [destinationWalletAddress]);

  const handleOnPress = () => {
    onrampInstance.current.open();
  };

  // render with button from previous example
  return (
    <a id="cbpay-button-container" onClick={handleOnPress}>
      <img src="/buy-with-coinbase.png" />
    </a>
  );
}
