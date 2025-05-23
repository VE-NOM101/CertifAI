import { ethers } from "ethers";
import CertifAI_ABI from "../contracts/ABI/CertifAI_ABI.json";
import Institute_ABI from "../contracts/ABI/Institute_ABI.json";

const { ethereum } = window;
export class CertifAI {
  testnetProvider = null;
  ContractData = null;
  contractAddress = "";
  constructor(rpcURL, contractAddress) {
    this.testnetProvider = new ethers.JsonRpcProvider(rpcURL);
    this.contractAddress = contractAddress;
    //getting data from the contract,
    this.ContractData = new ethers.Contract(
      this.contractAddress,
      CertifAI_ABI,
      this.testnetProvider
    );
  }

  async getSuperAdmin() {
    try {
      const superAdminAddress = await this.ContractData.superAdmin();
      return { address: superAdminAddress, status: true };
    } catch (error) {
      console.log(error);
      return { status: false };
    }
  }
}
