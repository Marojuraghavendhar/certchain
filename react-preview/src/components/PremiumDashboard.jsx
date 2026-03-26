import React from 'react';
import { motion } from 'framer-motion';
import {
  Boxes,
  Activity,
  CheckCircle,
  FileText,
  Clock,
  ArrowRight
} from 'lucide-react';

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 200, damping: 20 }
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  }
};

const PremiumDashboard = () => {
  return (
    <div className="min-h-screen bg-[#0b1220] text-slate-200 p-6 md:p-12 relative overflow-hidden font-sans flex flex-col items-center">
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <Boxes size={900} strokeWidth={0.5} className="text-white transform -rotate-12" />
      </div>
      
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1600px] w-full z-10 relative mt-4">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight mb-3">
            CertiChain Framework
          </h1>
          <p className="text-slate-400 text-lg font-medium tracking-wide uppercase letter-spacing-2">
            Secure • Immutable • Verifiable
          </p>
        </motion.header>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          
          {/* Card 1: Issue Certificate */}
          <motion.div variants={cardVariants} whileHover="hover" className="bg-white/[0.02] backdrop-blur-[10px] rounded-2xl p-8 border border-[rgba(212,175,55,0.3)] shadow-[0_0_15px_rgba(245,158,11,0.1)] hover:border-amber-400/50 transition-colors duration-500 flex flex-col items-center text-center group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative mb-8 mt-4 h-24 flex items-center justify-center">
              <img src="/icons/issue_cert.png" alt="Issue Certificate Icon" className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-3">Issue Certificate</h2>
            <p className="text-base text-slate-400 mb-8 flex-grow leading-relaxed">Cryptographically sign and seamlessly issue immutable academic credentials to the blockchain.</p>
            <motion.button whileTap={{ scale: 0.95 }} className="w-full bg-gradient-to-r from-[#004d60] to-[#00D2FF] hover:from-[#00607a] hover:to-[#33dbff] text-white py-3 px-4 rounded-xl font-medium shadow-[inset_0_0_12px_rgba(255,255,255,0.3)] transition-all group-hover:shadow-[0_0_15px_rgba(0,139,139,0.4),inset_0_0_12px_rgba(255,255,255,0.3)]">
              Issue Certificate
            </motion.button>
          </motion.div>

          {/* Card 2: Verify Certificate */}
          <motion.div variants={cardVariants} whileHover="hover" className="bg-white/[0.02] backdrop-blur-[10px] rounded-2xl p-8 border border-[rgba(212,175,55,0.3)] shadow-[0_0_15px_rgba(245,158,11,0.1)] hover:border-amber-400/50 transition-colors duration-500 flex flex-col items-center text-center group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative mb-8 mt-4 h-24 flex items-center justify-center">
              <img src="/icons/verify_cert.png" alt="Verify Certificate Icon" className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_12px_rgba(0,210,255,0.4)]" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-3">Verify Certificate</h2>
            <p className="text-base text-slate-400 mb-8 flex-grow leading-relaxed">Instantly validate the authenticity, origin, and integrity of decentralized digital records.</p>
            <motion.button whileTap={{ scale: 0.95 }} className="w-full bg-gradient-to-r from-[#004d60] to-[#00D2FF] hover:from-[#00607a] hover:to-[#33dbff] text-white py-3 px-4 rounded-xl font-medium shadow-[inset_0_0_12px_rgba(255,255,255,0.3)] transition-all group-hover:shadow-[0_0_15px_rgba(0,139,139,0.4),inset_0_0_12px_rgba(255,255,255,0.3)]">
              Verify Certificate
            </motion.button>
          </motion.div>

          {/* Card 3: Blockchain Status */}
          <motion.div variants={cardVariants} whileHover="hover" className="bg-white/[0.02] backdrop-blur-[10px] rounded-2xl p-8 border border-[rgba(212,175,55,0.3)] shadow-[0_0_15px_rgba(245,158,11,0.1)] hover:border-amber-400/50 transition-colors duration-500 flex flex-col items-center text-center group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative mb-8 mt-4 h-24 flex items-center justify-center">
              <img src="/icons/blockchain_status.png" alt="Blockchain Status Icon" className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-3">Blockchain Status</h2>
            <p className="text-base text-slate-400 mb-8 flex-grow leading-relaxed">Monitor real-time network health, connected nodes, and smart contract activities securely.</p>
            <motion.button whileTap={{ scale: 0.95 }} className="w-full bg-gradient-to-r from-[#004d60] to-[#00D2FF] hover:from-[#00607a] hover:to-[#33dbff] text-white py-3 px-4 rounded-xl font-medium shadow-[inset_0_0_12px_rgba(255,255,255,0.3)] transition-all group-hover:shadow-[0_0_15px_rgba(0,139,139,0.4),inset_0_0_12px_rgba(255,255,255,0.3)]">
              View Blockchain
            </motion.button>
          </motion.div>

          {/* Card 4: Download Certificates */}
          <motion.div variants={cardVariants} whileHover="hover" className="bg-white/[0.02] backdrop-blur-[10px] rounded-2xl p-8 border border-[rgba(212,175,55,0.3)] shadow-[0_0_15px_rgba(245,158,11,0.1)] hover:border-amber-400/50 transition-colors duration-500 flex flex-col items-center text-center group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative mb-8 mt-4 h-24 flex items-center justify-center">
              <img src="/icons/download_cert.png" alt="Download Certificates Icon" className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_12px_rgba(203,213,225,0.2)]" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-3">Download Certificates</h2>
            <p className="text-base text-slate-400 mb-8 flex-grow leading-relaxed">Access and export verified credentials securely in a universally accepted PDF format.</p>
            <motion.button whileTap={{ scale: 0.95 }} className="w-full bg-gradient-to-r from-[#004d60] to-[#00D2FF] hover:from-[#00607a] hover:to-[#33dbff] text-white py-3 px-4 rounded-xl font-medium shadow-[inset_0_0_12px_rgba(255,255,255,0.3)] transition-all group-hover:shadow-[0_0_15px_rgba(0,139,139,0.4),inset_0_0_12px_rgba(255,255,255,0.3)]">
              Download Certificates
            </motion.button>
          </motion.div>

          {/* Card 5: Statistics */}
          <motion.div variants={cardVariants} whileHover="hover" className="bg-white/[0.02] backdrop-blur-[10px] rounded-2xl p-8 border border-[rgba(212,175,55,0.3)] shadow-[0_0_15px_rgba(245,158,11,0.1)] hover:border-amber-400/50 transition-colors duration-500 flex flex-col group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center justify-center space-x-4 mb-8 mt-4 h-24">
              <img src="/icons/statistics.png" alt="Statistics Icon" className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_12px_rgba(245,158,11,0.3)]" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-5 text-center">Statistics</h2>
            <div className="flex-grow space-y-3 w-full bg-black/40 p-5 rounded-xl border border-white/5 shadow-inner">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-medium">Total:</span>
                <span className="text-white font-mono text-base font-bold">1</span>
              </div>
              <div className="h-px w-full bg-white/[0.05]"></div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-medium">Verified Today:</span>
                <span className="text-amber-400 font-mono text-base font-bold">0</span>
              </div>
              <div className="h-px w-full bg-white/[0.05]"></div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-medium">Blockchain Trans:</span>
                <span className="text-cyan-400 font-mono text-base font-bold">143</span>
              </div>
            </div>
          </motion.div>

          {/* Card 6: Data Management */}
          <motion.div variants={cardVariants} whileHover="hover" className="bg-white/[0.02] backdrop-blur-[10px] rounded-2xl p-8 border border-[rgba(212,175,55,0.3)] shadow-[0_0_15px_rgba(245,158,11,0.1)] hover:border-amber-400/50 transition-colors duration-500 flex flex-col group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center justify-center mb-8 mt-4 relative h-24 group-hover:scale-105 transition-transform duration-500">
              <img src="/icons/data_management.png" alt="Data Management Icon" className="w-24 h-24 object-contain drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-5 text-center">Data Management</h2>
            
            <div className="flex-grow flex flex-col items-center w-full">
              <div className="flex items-center space-x-3 bg-black/50 px-5 py-2.5 rounded-full border border-white/10 mb-8 shadow-inner">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_12px_#22c55e] animate-[pulse_2s_ease-in-out_infinite]"></div>
                <span className="text-base text-slate-200 font-bold tracking-wider uppercase">Data Status: Persisted</span>
              </div>
              
              <div className="w-full space-y-4 mt-auto">
                <motion.button whileTap={{ scale: 0.95 }} className="w-full bg-gradient-to-r from-[#004d60] to-[#00D2FF] hover:from-[#00607a] hover:to-[#33dbff] text-white py-3 px-4 rounded-xl font-medium shadow-[inset_0_0_12px_rgba(255,255,255,0.3)] transition-all group-hover:shadow-[0_0_15px_rgba(0,139,139,0.4),inset_0_0_12px_rgba(255,255,255,0.3)]">
                  Backup Certificates
                </motion.button>
                <button disabled className="w-full bg-gradient-to-r from-[#004d60] to-[#00D2FF] opacity-30 cursor-not-allowed text-white py-3 px-4 rounded-xl font-medium transition-all">
                  Restore from Backup
                </button>
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* Recent Activity Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 mb-10 bg-white/[0.02] backdrop-blur-[10px] rounded-2xl p-8 border border-[rgba(212,175,55,0.3)] shadow-[0_0_15px_rgba(0,0,0,0.5)]"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center text-white">
              <Activity className="w-6 h-6 mr-3 text-cyan-400" />
              Recent Activity Feed
            </h2>
            <button className="text-base text-cyan-400 hover:text-cyan-300 transition-colors flex items-center">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Activity Item 1 */}
            <div className="flex flex-col p-5 bg-black/30 rounded-xl border border-white/5 hover:bg-black/50 transition-colors hover:border-cyan-500/30 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-cyan-900/30 flex items-center justify-center border border-cyan-500/30 mr-3">
                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-base text-slate-500 flex items-center ml-auto">
                  <Clock className="w-3 h-3 mr-1" /> 2m ago
                </span>
              </div>
              <h4 className="text-base font-semibold text-slate-200 mb-1 z-10">Certificate Verified</h4>
              <p className="text-base text-slate-400 z-10">Transaction Hash: 0x8f...4e2a</p>
            </div>

            {/* Activity Item 2 */}
            <div className="flex flex-col p-5 bg-black/30 rounded-xl border border-white/5 hover:bg-black/50 transition-colors hover:border-amber-500/30 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-amber-900/30 flex items-center justify-center border border-amber-500/30 mr-3">
                  <FileText className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-base text-slate-500 flex items-center ml-auto">
                  <Clock className="w-3 h-3 mr-1" /> 1h ago
                </span>
              </div>
              <h4 className="text-base font-semibold text-slate-200 mb-1 z-10">New Batch Issued</h4>
              <p className="text-base text-slate-400 z-10">34 Certs for Computer Science Dept.</p>
            </div>
            
            {/* Activity Item 3 */}
            <div className="flex flex-col p-5 bg-black/30 rounded-xl border border-white/5 hover:bg-black/50 transition-colors hover:border-green-500/30 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-green-900/30 flex items-center justify-center border border-green-500/30 mr-3">
                  <Activity className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-base text-slate-500 flex items-center ml-auto">
                  <Clock className="w-3 h-3 mr-1" /> 5h ago
                </span>
              </div>
              <h4 className="text-base font-semibold text-slate-200 mb-1 z-10">Smart Contract Updated</h4>
              <p className="text-base text-slate-400 z-10">Deployed v1.2 to Polygon Mainnet</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PremiumDashboard;
