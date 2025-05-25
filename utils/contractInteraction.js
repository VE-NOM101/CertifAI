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

  async getValidationFee() {
    try {
      const response = await this.ContractData.validationFee();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateValidationFee(newVal) {
    try {
      const browserProvider = new ethers.BrowserProvider(ethereum);
      const signer = await browserProvider.getSigner();
      const contractInstance = new ethers.Contract(
        this.contractAddress,
        CertifAI_ABI,
        signer
      );
      const tx = await contractInstance.updateValidationFee(
        ethers.parseEther(newVal.toString())
      );
      console.log("⏳ Transaction sent:", tx.hash);
      return { status: true };
    } catch (error) {
      console.log(error);
      return { status: false };
    }
  }

  async addIssuer(address) {
    try {
      const browserProvider = new ethers.BrowserProvider(ethereum);
      const signer = await browserProvider.getSigner();
      const contractInstance = new ethers.Contract(
        this.contractAddress,
        CertifAI_ABI,
        signer
      );
      const tx = await contractInstance.addIssuer(address);
      console.log("⏳ Transaction sent:", tx.hash);
      return { status: true };
    } catch (error) {
      console.log(error);
      return { status: false, message: error.message };
    }
  }

  async getAllIssuers() {
    try {
      const response = await this.ContractData.getAllIssuers();
      return response;
    } catch (error) {
      console.error("Error fetching issuers:", error);
      return [];
    }
  }

  async removeIssuer(address) {
    try {
      const browserProvider = new ethers.BrowserProvider(ethereum);
      const signer = await browserProvider.getSigner();
      const contractInstance = new ethers.Contract(
        this.contractAddress,
        CertifAI_ABI,
        signer
      );
      const tx = await contractInstance.removeIssuer(address);
      console.log("⏳ Transaction sent:", tx.hash);
      return { status: true };
    } catch (error) {
      console.log(error);
      return { status: false, message: error.message };
    }
  }
}
