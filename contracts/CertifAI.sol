// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title CertifAI
 * @dev Manages issuers and institute contracts for NFT-based certificate issuing
 */
contract CertifAI {
    address public superAdmin; // Deployer of CertifAI
    address[] private issuers; // Issuer's have some special power to create and invalidate institute
    uint256 public validationFee;

    mapping(address => bool) public instituteContracts; // Institute => Validity

    //Events
    event IssuerAdded(address issuer, uint256 timestamp); //this event should be removed
    event IssuerRemoved(address issuer, uint256 timestamp);//this event should be removed

    event InstituteCreated(
        address indexed issuer,
        address indexed instituteOwner,
        address indexed instituteAddress,
        uint256 timestamp
    );
    event InstituteInvalidated(
        address indexed issuer,
        address indexed instituteAddress,
        uint256 timestamp
    );
    event InstituteMarkedValid(address instituteAddress, uint256 timestamp);

    constructor() {
        superAdmin = msg.sender;
        validationFee = 10000000000000000; // Amount in wei, 0.01ETH
    }

    modifier onlySuperAdmin() {
        require(msg.sender == superAdmin, "Only superAdmin");
        _;
    }

    modifier onlySuperAdminOrIssuer() {
        require(
            msg.sender == superAdmin || isIssuer(msg.sender),
            "Only superAdmin or issuer"
        );
        _;
    }

    function updateValidationFee(uint256 newVal) external onlySuperAdmin {
        // Amount must be in wei
        //make a update on next contract deployment-> validation fee must be greater than 0.001eth
        validationFee = newVal;
    }

    function isIssuer(address _addr) public view returns (bool) {
        for (uint256 i = 0; i < issuers.length; i++) {
            if (issuers[i] == _addr) return true;
        }
        return false;
    }

    function addIssuer(address _issuer) external onlySuperAdmin {
        require(_issuer != address(0), "Invalid issuer address");
        require(!isIssuer(_issuer), "Already an issuer");
        issuers.push(_issuer);
        emit IssuerAdded(_issuer, block.timestamp);
    }

    function removeIssuer(address _issuer) external onlySuperAdmin {
        require(isIssuer(_issuer), "Not an existing issuer");
        for (uint256 i = 0; i < issuers.length; i++) {
            if (issuers[i] == _issuer) {
                issuers[i] = issuers[issuers.length - 1];
                issuers.pop();
                emit IssuerRemoved(_issuer, block.timestamp);
                break;
            }
        }
    }

    function getAllIssuers() external view returns (address[] memory) {
        return issuers;
    }

    function createInstitute(
        address _instituteOwner,
        string memory _instituteInfo_IPFS_Hash
    ) external onlySuperAdminOrIssuer returns (address) {
        require(_instituteOwner != address(0), "Invalid institute owner");

        Institute newInstitute = new Institute(
            _instituteOwner,
            address(this),
            _instituteInfo_IPFS_Hash,
            validationFee
        );

        address newInstituteAddr = address(newInstitute);
        require(!instituteContracts[newInstituteAddr], "Already created");

        instituteContracts[newInstituteAddr] = false;

        emit InstituteCreated(
            msg.sender, //Issuer
            _instituteOwner, //Institute Owner
            newInstituteAddr, //Institute contract address
            block.timestamp //Timestamp
        );
        return newInstituteAddr;
    }

    // Called only from the Institute contract
    function markInstituteValid(address _instituteAddress) external {
        require(!instituteContracts[_instituteAddress], "Already validated");

        // Only the institute itself can call this
        require(msg.sender == _instituteAddress, "Unauthorized-call");

        instituteContracts[_instituteAddress] = true;
        emit InstituteMarkedValid(_instituteAddress, block.timestamp);
    }

    function invalidateInstitute(address _instituteAddress)
        external
        onlySuperAdminOrIssuer
    {
        require(
            instituteContracts[_instituteAddress],
            "No such valid institute"
        );
        instituteContracts[_instituteAddress] = false;
        emit InstituteInvalidated(
            msg.sender,
            _instituteAddress,
            block.timestamp
        );
    }

    function isValidInstitute(address _institute) external view returns (bool) {
        return instituteContracts[_institute];
    }

    receive() external payable {}
}

interface ICertifAI {
    function markInstituteValid(address _instituteAddress) external; //Interact with CertifAI and Institute

    function isValidInstitute(address _instituteAddress)
        external
        view
        returns (bool);
}

/**
 * @title Institute
 * @dev Issues certificates as NFTs after validation and payment
 */
contract Institute is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address public owner; //Owner of the institute=> Has the power to generate Non fungiable certificates
    address public certifAI_Contract; //The certifAI contract that create this institue contract
    string public instituteInfo_IPFS_Hash; //All information about the institute
    uint256 public validationFee; //Required Validation fee to validate this institute

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    modifier isValidated() {
        require(
            ICertifAI(certifAI_Contract).isValidInstitute(address(this)),
            "Institute not validated"
        );
        _;
    }

    //Events
    event CertificateIssued(
        address indexed studentAddress,
        uint256 tokenId,
        string ipfsHash,
        uint256 timestamp
    );

    constructor(
        address _owner,
        address _certifAI,
        string memory _instituteInfo_IPFS_Hash,
        uint256 _validationFee
    ) ERC721("Institute Certificate", "ICT") {
        require(_owner != address(0), "Invalid owner");
        require(_certifAI != address(0), "Invalid certifAI Contract");

        owner = _owner;
        certifAI_Contract = _certifAI;
        instituteInfo_IPFS_Hash = _instituteInfo_IPFS_Hash;
        validationFee = _validationFee;
    }

    function validateInstitute() external payable onlyOwner returns (bool) {
        require(
            !ICertifAI(certifAI_Contract).isValidInstitute(address(this)),
            "Already validated"
        );
        require(msg.value >= validationFee, "Insufficient payment");

        // Send ETH to the CertifAI.superAdmin
        (bool sent, ) = payable(certifAI_Contract).call{value: msg.value}("");
        require(sent, "Payment failed");

        // Mark this contract as validated via CertifAI
        ICertifAI(certifAI_Contract).markInstituteValid(address(this));
        return true;
    }

    function genCertificate(address student, string memory std_details_ipfsHash)
        external
        onlyOwner
        isValidated
        returns (uint256)
    {
        require(student != address(0), "Invalid student address");

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(student, newTokenId);
        _setTokenURI(newTokenId, std_details_ipfsHash);

        emit CertificateIssued(
            student,
            newTokenId,
            std_details_ipfsHash,
            block.timestamp
        );
        return newTokenId;
    }
}
