import { ethers } from 'ethers'
import CertifAI_ABI from "contracts/ABI/CertifAI_ABI.json";
import Institute_ABI from "contracts/ABI/Institute_ABI.json";

const { ethereum } = window;
export class CertifAI {
  browserProvider = null;
  testnetProvider = null;
  ContractData = null;
  contractAddress = "";
  constructor() {
    this.browserProvider = new ethers.BrowserProvider(ethereum);

    this.testnetProvider = new ethers.JsonRpcProvider(
      import.meta.env.NUXT_ALCHEMY_RPC_URL
    );
    this.contractAddress = import.meta.env.NUXT_CERTIFAI_CONTRACT;
    //getting data from the contract,
    this.ContractData = new ethers.Contract(
      this.contractAddress,
      CertifAI_ABI,
      this.testnetProvider
    );
  }

  async getSuperAdmin() {
    const superAdminAddress = await this.ContractData.superAdmin();
    return superAdminAddress;
  }
}
