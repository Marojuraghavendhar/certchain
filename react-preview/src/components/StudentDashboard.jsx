import React from 'react';
import { 
  Compass, 
  Medal, 
  Briefcase, 
  LineChart, 
  ChevronRight,
  Terminal,
  CheckCircle2
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const chartData = [
  { name: 'Jan', value: 10 },
  { name: 'Feb', value: 30 },
  { name: 'Mar', value: 45 },
  { name: 'Apr', value: 70 },
  { name: 'May', value: 65 },
  { name: 'Jun', value: 95 },
  { name: 'Jul', value: 140 }
];

// Reusable animated node for the Skills Network graph
const NetworkNode = ({ x, y, label, isLarge }) => (
  <div className="absolute flex flex-col items-center" style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}>
    <div className={`rounded-full bg-cyan-400/80 shadow-[0_0_15px_rgba(34,211,238,0.8)] ${isLarge ? 'w-3 h-3' : 'w-2 h-2'}`}></div>
    {label && <span className="text-[10px] text-slate-300 mt-1 whitespace-nowrap">{label}</span>}
  </div>
);

// Renders connecting line between two points (% coordinates)
const NetworkLine = ({ x1, y1, x2, y2 }) => {
  const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  return (
    <div 
      className="absolute bg-cyan-500/30 h-px origin-left"
      style={{
        left: `${x1}%`,
        top: `${y1}%`,
        width: `${length}%`,
        transform: `rotate(${angle}deg)`
      }}
    />
  );
};

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-[#070e1d] text-slate-200 p-6 md:p-8 lg:p-12 font-sans selection:bg-cyan-500/30 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none translate-y-1/3 translate-x-1/3"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-8">
          <p className="text-slate-400 text-sm md:text-base mb-1 tracking-wide">Secure and verifiable digital credentials via blockchain technology</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Skill Network - Takes 2 columns */}
          <div className="md:col-span-2 relative p-[1px] rounded-2xl bg-gradient-to-b from-slate-700 to-slate-800/20 overflow-hidden group">
            <div className="absolute -inset-2 bg-cyan-400/10 opacity-0 group-hover:opacity-100 blur-xl transition duration-500"></div>
            <div className="bg-[#0b1426]/90 backdrop-blur-xl rounded-2xl p-6 h-full relative border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <Compass className="w-6 h-6 text-slate-300" />
                <h2 className="text-xl font-semibold text-white tracking-wide">Skill Network</h2>
              </div>
              
              <div className="relative w-full aspect-video md:aspect-[21/9] lg:aspect-[2.5/1] bg-[#0d1627] rounded-xl border border-white/5 overflow-hidden flex items-center justify-center">
                {/* SVG Lines for better connection rendering */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0 0 4px rgba(34,211,238,0.3))' }}>
                  <line x1="20%" y1="30%" x2="35%" y2="50%" stroke="rgba(34,211,238,0.2)" strokeWidth="1" />
                  <line x1="20%" y1="30%" x2="45%" y2="25%" stroke="rgba(34,211,238,0.2)" strokeWidth="1" />
                  <line x1="35%" y1="50%" x2="45%" y2="25%" stroke="rgba(34,211,238,0.3)" strokeWidth="1" />
                  <line x1="35%" y1="50%" x2="55%" y2="60%" stroke="rgba(34,211,238,0.4)" strokeWidth="1" />
                  <line x1="45%" y1="25%" x2="60%" y2="35%" stroke="rgba(34,211,238,0.3)" strokeWidth="1" />
                  <line x1="55%" y1="60%" x2="60%" y2="35%" stroke="rgba(34,211,238,0.3)" strokeWidth="1" />
                  <line x1="60%" y1="35%" x2="75%" y2="50%" stroke="rgba(34,211,238,0.2)" strokeWidth="1" />
                  <line x1="55%" y1="60%" x2="75%" y2="50%" stroke="rgba(34,211,238,0.2)" strokeWidth="1" />
                  <line x1="35%" y1="50%" x2="25%" y2="70%" stroke="rgba(34,211,238,0.2)" strokeWidth="1" />
                  <line x1="55%" y1="60%" x2="40%" y2="85%" stroke="rgba(34,211,238,0.4)" strokeWidth="1" />
                  <line x1="25%" y1="70%" x2="40%" y2="85%" stroke="rgba(34,211,238,0.2)" strokeWidth="1" />
                  <line x1="40%" y1="85%" x2="70%" y2="80%" stroke="rgba(34,211,238,0.2)" strokeWidth="1" />
                  <line x1="55%" y1="60%" x2="70%" y2="80%" stroke="rgba(34,211,238,0.3)" strokeWidth="1" />
                  <line x1="15%" y1="55%" x2="20%" y2="30%" stroke="rgba(34,211,238,0.2)" strokeWidth="1" />
                  <line x1="15%" y1="55%" x2="25%" y2="70%" stroke="rgba(34,211,238,0.2)" strokeWidth="1" />
                  <line x1="15%" y1="55%" x2="35%" y2="50%" stroke="rgba(34,211,238,0.2)" strokeWidth="1" />
                </svg>

                {/* Nodes */}
                <NetworkNode x={20} y={30} label="React" />
                <NetworkNode x={45} y={25} label="Data Science" isLarge />
                <NetworkNode x={35} y={50} label="Smart Contract" />
                <NetworkNode x={60} y={35} label="Blockchain" />
                <NetworkNode x={55} y={60} label="Data Science" isLarge />
                <NetworkNode x={75} y={50} label="Solidity" />
                <NetworkNode x={25} y={70} label="Machine Learning" />
                <NetworkNode x={40} y={85} label="Python" isLarge />
                <NetworkNode x={70} y={80} label="Web3" />
                <NetworkNode x={15} y={55} label="UI/UX" />
              </div>
            </div>
          </div>

          {/* Achievements - Takes 1 column */}
          <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-slate-700/80 to-slate-800/10">
            <div className="bg-[#0b1426]/90 backdrop-blur-xl rounded-2xl p-6 h-full flex flex-col border border-white/5">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Medal className="w-6 h-6 text-amber-500" />
                  <h2 className="text-xl font-semibold text-white tracking-wide">Achievements</h2>
                </div>
                <button className="text-xs text-slate-400 hover:text-white transition-colors flex items-center">
                  View All <ChevronRight className="w-3 h-3 ml-1" />
                </button>
              </div>
              
              <div className="space-y-4 mb-8 flex-1">
                {/* Master Coder Badge */}
                <div className="bg-[#111a2f] border border-amber-500/20 rounded-xl p-4 flex items-center gap-4 hover:border-amber-500/40 transition-colors cursor-pointer group">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <div className="absolute inset-0 bg-amber-500/20 blur-md rounded-full group-hover:bg-amber-500/30 transition-colors"></div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 to-amber-600 flex items-center justify-center p-[2px] shadow-lg border border-amber-200/50 relative z-10">
                      <div className="w-full h-full bg-[#0a0a0a] rounded-full flex items-center justify-center">
                        <Terminal className="w-4 h-4 text-amber-400" />
                      </div>
                    </div>
                    {/* Ribbon */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-[2px] z-0">
                      <div className="w-2 h-3 bg-amber-600 rounded-sm skew-x-[20deg]"></div>
                      <div className="w-2 h-3 bg-amber-600 rounded-sm -skew-x-[20deg]"></div>
                    </div>
                  </div>
                  <span className="font-semibold text-amber-400">Master Coder</span>
                </div>

                {/* Verified Expert Badge */}
                <div className="bg-[#111a2f] border border-slate-600/30 rounded-xl p-4 flex items-center gap-4 hover:border-slate-500/50 transition-colors cursor-pointer group">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <div className="absolute inset-0 bg-slate-400/10 blur-md rounded-full group-hover:bg-slate-400/20 transition-colors"></div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center p-[2px] shadow-md border border-slate-300/50 relative z-10">
                      <div className="w-full h-full bg-[#0a0a0a] rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-slate-300" />
                      </div>
                    </div>
                    {/* Ribbon */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-[2px] z-0">
                      <div className="w-2 h-3 bg-slate-500 rounded-sm skew-x-[20deg]"></div>
                      <div className="w-2 h-3 bg-slate-500 rounded-sm -skew-x-[20deg]"></div>
                    </div>
                  </div>
                  <span className="font-semibold text-slate-200">Verified Expert</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="bg-[#0d1627] rounded-xl p-4 border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-300">7/10 Verified Skills</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400/80 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Career Opportunities - Takes 1 column */}
          <div className="relative p-[1px] rounded-2xl bg-gradient-to-b from-slate-700/80 to-slate-800/20">
            <div className="bg-[#0b1426]/90 backdrop-blur-xl rounded-2xl p-6 h-full flex flex-col border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="w-6 h-6 text-amber-700/80 fill-amber-600/20" />
                <h2 className="text-xl font-semibold text-white tracking-wide">Career Opportunities</h2>
              </div>
              
              <p className="text-slate-400 text-sm leading-relaxed mb-6 mt-2 flex-1">
                Discover jobs and Internships matched to your verified skills.
              </p>
              
              <a href="#" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center group transition-colors">
                View 24+ Personalized Openings <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>

          {/* Learning Analytics - Takes 2 columns */}
          <div className="md:col-span-2 relative p-[1px] rounded-2xl bg-gradient-to-b from-slate-700/50 to-slate-800/10">
            <div className="bg-[#0b1426]/90 backdrop-blur-xl rounded-2xl p-6 h-full border border-white/5">
               <div className="flex items-center gap-3 mb-6">
                <LineChart className="w-6 h-6 text-red-400" />
                <h2 className="text-xl font-semibold text-white tracking-wide">Learning Analytics</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-48">
                {/* verified skills growth */}
                <div className="bg-[#0d1627] rounded-xl p-4 border border-white/5 flex flex-col relative">
                  <span className="absolute top-4 left-4 text-xs font-semibold text-slate-400">(A)</span>
                  <h3 className="text-sm text-center text-slate-200 mb-4">Verified Skills Growth</h3>
                  
                  <div className="flex-1 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" tick={{fontSize: 10, fill: '#64748b'}} axisLine={false} tickLine={false} />
                        <YAxis tick={{fontSize: 10, fill: '#64748b'}} axisLine={false} tickLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff' }}
                          itemStyle={{ color: '#22d3ee' }}
                        />
                        <Area type="monotone" dataKey="value" stroke="#22d3ee" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* verification % */}
                <div className="bg-[#0d1627] rounded-xl p-4 border border-white/5 flex flex-col relative items-center justify-center">
                  <span className="absolute top-4 left-4 text-xs font-semibold text-slate-400">(B)</span>
                  <h3 className="text-sm text-slate-200 absolute top-4">Credential Verification %</h3>
                  
                  <div className="relative mt-4 flex items-center justify-center">
                    {/* Circular Progress SVG */}
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="54"
                        stroke="currentColor"
                        strokeWidth="12"
                        className="text-slate-800"
                        fill="transparent"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="54"
                        stroke="currentColor"
                        strokeWidth="12"
                        className="text-cyan-400/80 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                        fill="transparent"
                        strokeDasharray="339.292"
                        strokeDashoffset="50.89" 
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-white">85%</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
