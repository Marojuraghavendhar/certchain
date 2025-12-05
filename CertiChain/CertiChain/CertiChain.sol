// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertiChain {
    struct Certificate {
        string recipientName;
        string recipientEmail;
        string certificateType;
        string description;
        uint256 issuingDate;
        string ipfsHash;
        bool isValid;
        address issuer;
        uint256 timestamp;
    }
    
    struct Issuer {
        string name;
        string organization;
        bool isAuthorized;
        uint256 totalCertificates;
    }
    
    // Mapping from certificate hash to certificate data
    mapping(bytes32 => Certificate) public certificates;
    
    // Mapping from address to issuer information
    mapping(address => Issuer) public issuers;
    
    // Array to store all certificate hashes
    bytes32[] public certificateHashes;
    
    // Events
    event CertificateIssued(
        bytes32 indexed certificateHash,
        string recipientName,
        string recipientEmail,
        address indexed issuer,
        uint256 timestamp
    );
    
    event CertificateRevoked(
        bytes32 indexed certificateHash,
        address indexed issuer,
        uint256 timestamp
    );
    
    event IssuerRegistered(
        address indexed issuerAddress,
        string name,
        string organization
    );
    
    // Modifiers
    modifier onlyAuthorizedIssuer() {
        require(issuers[msg.sender].isAuthorized, "Only authorized issuers can perform this action");
        _;
    }
    
    modifier certificateExists(bytes32 certificateHash) {
        require(certificates[certificateHash].timestamp != 0, "Certificate does not exist");
        _;
    }
    
    // Constructor
    constructor() {
        // Register the contract deployer as the first authorized issuer
        issuers[msg.sender] = Issuer({
            name: "CertiChain Admin",
            organization: "CertiChain",
            isAuthorized: true,
            totalCertificates: 0
        });
    }
    
    /**
     * @dev Register a new issuer
     * @param name Name of the issuer
     * @param organization Organization name
     */
    function registerIssuer(string memory name, string memory organization) external {
        require(!issuers[msg.sender].isAuthorized, "Issuer already registered");
        
        issuers[msg.sender] = Issuer({
            name: name,
            organization: organization,
            isAuthorized: true,
            totalCertificates: 0
        });
        
        emit IssuerRegistered(msg.sender, name, organization);
    }
    
    /**
     * @dev Issue a new certificate
     * @param recipientName Name of the certificate recipient
     * @param recipientEmail Email of the certificate recipient
     * @param certificateType Type of certificate
     * @param description Description of the certificate
     * @param ipfsHash IPFS hash of the certificate file
     */
    function issueCertificate(
        string memory recipientName,
        string memory recipientEmail,
        string memory certificateType,
        string memory description,
        string memory ipfsHash
    ) external onlyAuthorizedIssuer {
        // Create unique hash for the certificate
        bytes32 certificateHash = keccak256(
            abi.encodePacked(
                recipientName,
                recipientEmail,
                certificateType,
                description,
                ipfsHash,
                block.timestamp,
                msg.sender
            )
        );
        
        // Ensure certificate hash is unique
        require(certificates[certificateHash].timestamp == 0, "Certificate hash already exists");
        
        // Create certificate
        certificates[certificateHash] = Certificate({
            recipientName: recipientName,
            recipientEmail: recipientEmail,
            certificateType: certificateType,
            description: description,
            issuingDate: block.timestamp,
            ipfsHash: ipfsHash,
            isValid: true,
            issuer: msg.sender,
            timestamp: block.timestamp
        });
        
        // Add to certificate hashes array
        certificateHashes.push(certificateHash);
        
        // Update issuer statistics
        issuers[msg.sender].totalCertificates++;
        
        emit CertificateIssued(
            certificateHash,
            recipientName,
            recipientEmail,
            msg.sender,
            block.timestamp
        );
    }
    
    /**
     * @dev Verify a certificate
     * @param certificateHash Hash of the certificate to verify
     * @return isValid Whether the certificate is valid
     * @return recipientName Name of the recipient
     * @return issuer Address of the issuer
     * @return issuingDate Date when the certificate was issued
     */
    function verifyCertificate(bytes32 certificateHash) 
        external 
        view 
        certificateExists(certificateHash)
        returns (
            bool isValid,
            string memory recipientName,
            address issuer,
            uint256 issuingDate
        ) {
        Certificate memory cert = certificates[certificateHash];
        return (
            cert.isValid,
            cert.recipientName,
            cert.issuer,
            cert.issuingDate
        );
    }
    
    /**
     * @dev Get full certificate details
     * @param certificateHash Hash of the certificate
     * @return Certificate struct with all details
     */
    function getCertificate(bytes32 certificateHash) 
        external 
        view 
        certificateExists(certificateHash)
        returns (Certificate memory) {
        return certificates[certificateHash];
    }
    
    /**
     * @dev Revoke a certificate (only by the issuer)
     * @param certificateHash Hash of the certificate to revoke
     */
    function revokeCertificate(bytes32 certificateHash) 
        external 
        onlyAuthorizedIssuer 
        certificateExists(certificateHash) {
        Certificate storage cert = certificates[certificateHash];
        require(cert.issuer == msg.sender, "Only the issuer can revoke this certificate");
        require(cert.isValid, "Certificate is already revoked");
        
        cert.isValid = false;
        
        emit CertificateRevoked(certificateHash, msg.sender, block.timestamp);
    }
    
    /**
     * @dev Get total number of certificates
     * @return Total count of certificates
     */
    function getTotalCertificates() external view returns (uint256) {
        return certificateHashes.length;
    }
    
    /**
     * @dev Get certificate hash by index
     * @param index Index in the certificate hashes array
     * @return Certificate hash
     */
    function getCertificateHashByIndex(uint256 index) external view returns (bytes32) {
        require(index < certificateHashes.length, "Index out of bounds");
        return certificateHashes[index];
    }
    
    /**
     * @dev Get issuer information
     * @param issuerAddress Address of the issuer
     * @return Issuer struct with all details
     */
    function getIssuer(address issuerAddress) external view returns (Issuer memory) {
        return issuers[issuerAddress];
    }
    
    /**
     * @dev Check if an address is an authorized issuer
     * @param issuerAddress Address to check
     * @return Whether the address is an authorized issuer
     */
    function isAuthorizedIssuer(address issuerAddress) external view returns (bool) {
        return issuers[issuerAddress].isAuthorized;
    }
    
    /**
     * @dev Get all certificates for a specific issuer
     * @param issuerAddress Address of the issuer
     * @return Array of certificate hashes issued by the issuer
     */
    function getCertificatesByIssuer(address issuerAddress) external view returns (bytes32[] memory) {
        uint256 count = 0;
        bytes32[] memory tempHashes = new bytes32[](certificateHashes.length);
        
        for (uint256 i = 0; i < certificateHashes.length; i++) {
            if (certificates[certificateHashes[i]].issuer == issuerAddress) {
                tempHashes[count] = certificateHashes[i];
                count++;
            }
        }
        
        bytes32[] memory result = new bytes32[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = tempHashes[i];
        }
        
        return result;
    }
}
