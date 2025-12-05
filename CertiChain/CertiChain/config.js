// CertiChain Configuration
const config = {
    // Blockchain Networks
    networks: {
        ethereum: {
            name: 'Ethereum Goerli Testnet',
            chainId: '0x5',
            rpcUrl: 'https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID',
            explorer: 'https://goerli.etherscan.io',
            currency: 'ETH',
            blockTime: 12
        },
        polygon: {
            name: 'Polygon Mumbai Testnet',
            chainId: '0x13881',
            rpcUrl: 'https://polygon-mumbai.infura.io/v3/YOUR_INFURA_PROJECT_ID',
            explorer: 'https://mumbai.polygonscan.com',
            currency: 'MATIC',
            blockTime: 2
        },
        local: {
            name: 'Local Blockchain',
            chainId: '0x539',
            rpcUrl: 'http://127.0.0.1:8545',
            explorer: 'http://127.0.0.1:8545',
            currency: 'ETH',
            blockTime: 0
        }
    },

    // Smart Contract Configuration
    contract: {
        name: 'CertiChain',
        version: '1.0.0',
        abi: [], // Will be populated with contract ABI
        addresses: {
            ethereum: '0x0000000000000000000000000000000000000000', // Deploy and update
            polygon: '0x0000000000000000000000000000000000000000', // Deploy and update
            local: '0x0000000000000000000000000000000000000000'   // Deploy and update
        }
    },

    // IPFS Configuration
    ipfs: {
        gateway: 'https://ipfs.io/ipfs/',
        pinata: {
            apiKey: 'YOUR_PINATA_API_KEY',
            secretKey: 'YOUR_PINATA_SECRET_KEY',
            gateway: 'https://gateway.pinata.cloud/ipfs/'
        },
        infura: {
            projectId: 'YOUR_INFURA_IPFS_PROJECT_ID',
            projectSecret: 'YOUR_INFURA_IPFS_PROJECT_SECRET',
            gateway: 'https://YOUR_INFURA_IPFS_PROJECT_ID.infura-ipfs.io/ipfs/'
        }
    },

    // Application Settings
    app: {
        name: 'CertiChain',
        version: '1.0.0',
        description: 'Blockchain-based Certificate Management System',
        maxFileSize: 10 * 1024 * 1024, // 10MB
        supportedFileTypes: ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx'],
        defaultNetwork: 'ethereum',
        autoConnect: true,
        gasLimit: 500000,
        gasPrice: '20000000000' // 20 Gwei
    },

    // UI Configuration
    ui: {
        theme: 'light',
        language: 'en',
        currency: 'USD',
        dateFormat: 'YYYY-MM-DD',
        timeFormat: '24h',
        pagination: {
            itemsPerPage: 10,
            maxPages: 5
        }
    },

    // Security Settings
    security: {
        sessionTimeout: 30 * 60 * 1000, // 30 minutes
        maxLoginAttempts: 5,
        lockoutDuration: 15 * 60 * 1000, // 15 minutes
        requireMFA: false,
        encryptionAlgorithm: 'AES-256-GCM'
    },

    // API Endpoints
    api: {
        baseUrl: 'https://api.certichain.com',
        version: 'v1',
        endpoints: {
            certificates: '/certificates',
            issuers: '/issuers',
            verification: '/verification',
            blockchain: '/blockchain',
            ipfs: '/ipfs'
        }
    },

    // Default Certificate Templates
    templates: {
        degree: {
            name: 'Degree Certificate',
            fields: ['recipientName', 'degree', 'field', 'institution', 'graduationDate', 'gpa'],
            required: ['recipientName', 'degree', 'field', 'institution', 'graduationDate']
        },
        diploma: {
            name: 'Diploma Certificate',
            fields: ['recipientName', 'program', 'institution', 'completionDate', 'grade'],
            required: ['recipientName', 'program', 'institution', 'completionDate']
        },
        course: {
            name: 'Course Completion',
            fields: ['recipientName', 'courseName', 'institution', 'completionDate', 'score'],
            required: ['recipientName', 'courseName', 'institution', 'completionDate']
        },
        achievement: {
            name: 'Achievement Certificate',
            fields: ['recipientName', 'achievement', 'organization', 'date', 'description'],
            required: ['recipientName', 'achievement', 'organization', 'date']
        }
    },

    // Error Messages
    errors: {
        network: {
            connection: 'Unable to connect to blockchain network',
            transaction: 'Transaction failed. Please try again.',
            contract: 'Smart contract interaction failed',
            wallet: 'Wallet connection failed'
        },
        certificate: {
            notFound: 'Certificate not found',
            invalid: 'Invalid certificate data',
            expired: 'Certificate has expired',
            revoked: 'Certificate has been revoked'
        },
        ipfs: {
            upload: 'File upload to IPFS failed',
            download: 'File download from IPFS failed',
            invalid: 'Invalid IPFS hash'
        }
    },

    // Success Messages
    success: {
        certificate: {
            issued: 'Certificate issued successfully',
            verified: 'Certificate verified successfully',
            revoked: 'Certificate revoked successfully'
        },
        blockchain: {
            connected: 'Wallet connected successfully',
            transaction: 'Transaction completed successfully'
        },
        ipfs: {
            upload: 'File uploaded to IPFS successfully',
            download: 'File downloaded successfully'
        }
    }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
} else {
    window.CertiChainConfig = config;
}
