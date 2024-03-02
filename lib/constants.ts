import { base } from "viem/chains";

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://papabase.builders.garden"
    : "https://54d0-63-149-110-127.ngrok-free.app";
export const SMART_ACCOUNT_FACTORY_ADDRESS =
  "0x9406Cc6185a346906296840746125a0E44976454";
export const BASE_ENTRYPOINT_ADDRESS =
  "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
export const ACROSS_ADDRESS_POLYGON =
  "0x9295ee1d8C5b022Be115A2AD3c30C72E34e7F096";

export const PAPABASE_ADDRESS = "0xa64f7ca0d62f78d18b44ac653e79c45a169eafa2";
// export const BASE_SCAN_URL = "https://sepolia.basescan.org";
// export const chain = baseSepolia;
export const BASE_SCAN_URL = "https://basescan.org";
export const chain = base;
