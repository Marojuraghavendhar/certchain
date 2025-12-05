const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying CertiChain smart contract...");

  // Get the contract factory
  const CertiChain = await ethers.getContractFactory("CertiChain");
  
  console.log("📝 Deploying contract...");
  
  // Deploy the contract
  const certiChain = await CertiChain.deploy();
  
  // Wait for deployment to finish
  await certiChain.deployed();
  
  console.log("✅ CertiChain deployed to:", certiChain.address);
  
  // Get network information
  const network = await ethers.provider.getNetwork();
  const networkName = network.name === "unknown" ? "localhost" : network.name;
  
  console.log("🌐 Network:", networkName);
  console.log("🔗 Contract Address:", certiChain.address);
  
  // Verify deployment
  try {
    const totalCertificates = await certiChain.getTotalCertificates();
    console.log("📊 Total Certificates:", totalCertificates.toString());
    
    const deployer = await ethers.getSigner();
    const deployerAddress = deployer.address;
    console.log("👤 Deployer Address:", deployerAddress);
    
    // Check if deployer is authorized issuer
    const isAuthorized = await certiChain.isAuthorizedIssuer(deployerAddress);
    console.log("🔐 Deployer Authorized:", isAuthorized);
    
    if (isAuthorized) {
      const issuerInfo = await certiChain.getIssuer(deployerAddress);
      console.log("🏢 Issuer Name:", issuerInfo.name);
      console.log("🏛️ Organization:", issuerInfo.organization);
      console.log("📜 Total Certificates:", issuerInfo.totalCertificates.toString());
    }
    
  } catch (error) {
    console.log("⚠️ Verification failed:", error.message);
  }
  
  // Save deployment info
  const deploymentInfo = {
    network: networkName,
    contractAddress: certiChain.address,
    deployer: (await ethers.getSigner()).address,
    timestamp: new Date().toISOString(),
    blockNumber: await ethers.provider.getBlockNumber(),
    gasUsed: certiChain.deployTransaction?.gasLimit?.toString() || "Unknown"
  };
  
  console.log("\n📋 Deployment Information:");
  console.log(JSON.stringify(deploymentInfo, null, 2));
  
  // Instructions for next steps
  console.log("\n🎯 Next Steps:");
  console.log("1. Update config.js with the contract address:", certiChain.address);
  console.log("2. Verify the contract on the blockchain explorer");
  console.log("3. Test the contract functions");
  console.log("4. Update the frontend with the new contract address");
  
  return certiChain;
}

// Handle errors
main()
  .then(() => {
    console.log("\n🎉 Deployment completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Deployment failed:", error);
    process.exit(1);
  });

