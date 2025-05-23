import { ethers } from "ethers";

const { ethereum } = window;
// Network config
const networks = {
  sepolia: {
    chainId: `0x${Number(11155111).toString(16)}`,
    chainName: "Ethereum Sepolia Testnet",
    nativeCurrency: {
      name: "SepoliaETH",
      symbol: "SepoliaETH",
      decimals: 18,
    },
    rpcUrls: [],
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
  },
};

export async function connectWallet() {
  if (!ethereum) {
    return {
      status: false,
      message: "MetaMask is not installed. Please install it to continue.",
    };
  }

  try {
    const provider = new ethers.BrowserProvider(ethereum);

    // Request account access
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const address = accounts[0];

    // Check the current chain ID
    const network = await provider.getNetwork();
    if (network.chainId !== 11155111n) {
      try {
        // Try switching to Sepolia
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: networks.sepolia.chainId }],
        });
      } catch (switchError) {
        // If Sepolia isn't added to MetaMask, add it
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [networks.sepolia],
            });
          } catch (addError) {
            return {
              status: false,
              message: "Failed to add the Sepolia network to MetaMask.",
            };
          }
        } else {
          return {
            status: false,
            message: "Failed to switch to the Sepolia network.",
          };
        }
      }
    }

    // Re-check balance after switching networks
    const updatedProvider = new ethers.BrowserProvider(ethereum);
    const balanceInWei = await updatedProvider.getBalance(address);
    const balance = ethers.formatEther(balanceInWei);

    return {
      status: true,
      address,
      balance: parseFloat(balance).toFixed(4),
      message: "Wallet connected and Sepolia network active!",
    };
  } catch (error) {
    let message = "Something went wrong during connection.";
    if (error.code === 4001) {
      message = "Connection request was rejected by the user.";
    }
    return {
      status: false,
      message,
    };
  }
}
