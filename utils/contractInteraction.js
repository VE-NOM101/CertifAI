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
      const response = await this.ContractData.superAdmin();
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async isIssuer(address) {
    try {
      const response = await this.ContractData.isIssuer(address);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
