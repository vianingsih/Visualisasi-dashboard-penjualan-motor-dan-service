/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { 
  TrendingUp, Users, Package, Settings, ChevronRight, 
  ArrowUpRight, ArrowDownRight, LayoutDashboard, Wrench, Boxes,
  Calendar, Menu, Bell, Search, User, MoreHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types & Data ---

type TabType = 'penjualan' | 'servis' | 'stok';

const SALES_DATA = [
  { name: 'Jan', value: 14200 },
  { name: 'Feb', value: 15100 },
  { name: 'Mar', value: 16400 },
  { name: 'Apr', value: 15800 },
  { name: 'Mei', value: 17200 },
  { name: 'Jun', value: 18240 },
];

const MODEL_DISTRIBUTION = [
  { name: 'BeAT', value: 4210, color: '#0f172a' },
  { name: 'Vario', value: 3850, color: '#1d4ed8' },
  { name: 'PCX', value: 2900, color: '#3b82f6' },
  { name: 'CB150R', value: 2100, color: '#94a3b8' },
  { name: 'Scoopy', value: 1980, color: '#cbd5e1' },
];

const SERVICE_TYPES = [
  { name: 'Ganti Oli', count: 22400 },
  { name: 'Tune-Up', count: 14100 },
  { name: 'Servis Rem', count: 8200 },
  { name: 'Ganti Ban', count: 5400 },
  { name: 'Kelistrikan', count: 2900 },
  { name: 'Overhaul', count: 1320 },
];

const STOCK_DATA = [
  { name: 'Oli Mesin', value: 8420 },
  { name: 'Filter Oli', value: 7100 },
  { name: 'Kampas Rem', value: 6300 },
  { name: 'Busi', value: 5980 },
  { name: 'V-Belt', value: 5200 },
  { name: 'Rantai', value: 4700 },
  { name: 'Aki', value: 3900 },
  { name: 'Filter Udara', value: 3600 },
  { name: 'Shock Abs.', value: 2800 },
  { name: 'Lampu LED', value: 2400 },
];

// --- Components ---

const StatCard = ({ title, value, change, description, icon: Icon, trend }: any) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="stat-card"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20">
        <Icon size={20} />
      </div>
      {change && (
        <span className={`text-[10px] font-mono px-2 py-1 rounded-lg flex items-center gap-1 border ${
          trend === 'up' 
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
            : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
        }`}>
          {trend === 'up' ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
          {change}
        </span>
      )}
    </div>
    <div>
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{title}</p>
      <h3 className="text-2xl font-light text-white mt-1.5 font-sans tracking-tight">{value}</h3>
      <p className="text-[10px] text-slate-400 mt-1.5 font-mono opacity-60 underline underline-offset-4 decoration-white/5">{description}</p>
    </div>
  </motion.div>
);

const ChartContainer = ({ title, children, subtitle }: any) => (
  <div className="dashboard-card h-full flex flex-col relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
       <div className="w-24 h-24 bg-indigo-500 rounded-full blur-[60px]"></div>
    </div>
    <div className="flex justify-between items-start mb-8 relative z-10">
      <div>
        <h3 className="text-sm font-bold text-white uppercase tracking-widest">{title}</h3>
        {subtitle && <p className="text-xs text-slate-500 mt-1 italic">{subtitle}</p>}
      </div>
      <div className="flex gap-2">
        <div className="px-2 py-0.5 bg-white/5 rounded text-[10px] font-mono text-cyan-400 border border-white/5 uppercase">
          Real-time
        </div>
        <button className="p-1 hover:bg-white/5 rounded-md text-slate-500 transition-colors">
          <MoreHorizontal size={18} />
        </button>
      </div>
    </div>
    <div className="flex-1 w-full min-h-[250px] relative z-10">
      {children}
    </div>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('penjualan');

  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <div className="h-screen w-full bg-[#030307] text-slate-200 flex flex-col md:flex-row overflow-hidden font-sans selection:bg-indigo-500/30 selection:text-white">
      {/* Background Decor */}
      <div className="glow-orb top-[-100px] left-[-100px] w-96 h-96 bg-indigo-600/30"></div>
      <div className="glow-orb bottom-[-50px] right-[-50px] w-80 h-80 bg-blue-600/20"></div>
      <div className="glow-orb top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/5 blur-[150px]"></div>

      {/* Sidebar */}
      <aside className="relative z-20 hidden md:flex w-72 bg-black/20 backdrop-blur-2xl border-r border-white/5 flex-col overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-cyan-400 rounded-xl shadow-lg shadow-indigo-500/20 flex items-center justify-center">
              <TrendingUp size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white leading-none">MOTODASH</h1>
              <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest mt-1 block">Enterprise Core</span>
            </div>
          </div>

          <nav className="space-y-6">
            <div>
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em] mb-4 ml-2">Primary Node</p>
              <div className="space-y-1">
                <button className="w-full flex items-center gap-4 px-4 py-3 bg-white/5 border border-white/10 text-white rounded-2xl text-sm font-medium transition-all shadow-xl shadow-black/20">
                  <LayoutDashboard size={18} className="text-indigo-400" />
                  Analytics Hub
                </button>
                <button className="w-full flex items-center gap-4 px-4 py-3 text-slate-500 transition-all hover:text-white hover:translate-x-1 rounded-2xl text-sm font-medium">
                  <Users size={18} />
                  Dealer Intelligence
                </button>
                <button className="w-full flex items-center gap-4 px-4 py-3 text-slate-500 transition-all hover:text-white hover:translate-x-1 rounded-2xl text-sm font-medium">
                  <Package size={18} />
                  Inventory Matrix
                </button>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em] mb-4 ml-2">System Ops</p>
              <div className="space-y-1">
                <button className="w-full flex items-center gap-4 px-4 py-3 text-slate-500 transition-all hover:text-white hover:translate-x-1 rounded-2xl text-sm font-medium">
                  <Settings size={18} />
                  Environment
                </button>
                <button className="w-full flex items-center gap-4 px-4 py-3 text-slate-500 transition-all hover:text-white hover:translate-x-1 rounded-2xl text-sm font-medium">
                  <Bell size={18} />
                  Event Logs
                </button>
              </div>
            </div>
          </nav>
        </div>
        
        <div className="mt-auto p-8 border-t border-white/5">
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-white/10 p-0.5 shrink-0">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Motodash" className="rounded-full bg-slate-800" alt="Profile" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate uppercase tracking-wider">Root Administrator</p>
              <p className="text-[10px] font-mono text-cyan-400 truncate mt-1">SEC_PROTOCOL: ACTIVE</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="bg-black/20 backdrop-blur-md border-b border-white/5 px-8 py-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-12">
            <div className="hidden lg:block">
              <h2 className="text-sm font-bold text-white uppercase tracking-[0.2em]">Deployment overview</h2>
              <p className="text-[10px] text-slate-500 mt-1 italic font-mono uppercase">Cluster: National_Operations_04</p>
            </div>
            <div className="relative group hidden xl:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-indigo-400" size={14} />
              <input 
                type="text" 
                placeholder="Search matrix data..." 
                className="bg-white/5 border border-white/5 rounded-full pl-10 pr-6 py-2 text-[11px] w-80 focus:w-96 focus:ring-1 focus:ring-indigo-500/30 focus:bg-white/[0.08] transition-all outline-none text-slate-200 placeholder:text-slate-600"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] rounded-full border border-white/5">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.5)]"></div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Live Feed Synchronized</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
              <Calendar size={12} className="text-indigo-400" />
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Q2 | 2026</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-10">
            {/* Navigation Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex flex-wrap gap-2 bg-white/[0.03] border border-white/5 p-1 rounded-2xl backdrop-blur-xl">
                <button 
                  onClick={() => setActiveTab('penjualan')}
                  className={`nav-tab ${activeTab === 'penjualan' ? 'nav-tab-active' : 'nav-tab-inactive'}`}
                >
                  <TrendingUp size={16} />
                  Penjualan Motor
                </button>
                <button 
                  onClick={() => setActiveTab('servis')}
                  className={`nav-tab ${activeTab === 'servis' ? 'nav-tab-active' : 'nav-tab-inactive'}`}
                >
                  <Wrench size={16} />
                  Layanan Servis
                </button>
                <button 
                  onClick={() => setActiveTab('stok')}
                  className={`nav-tab ${activeTab === 'stok' ? 'nav-tab-active' : 'nav-tab-inactive'}`}
                >
                  <Boxes size={16} />
                  Stok Sparepart
                </button>
              </div>
              
              <button className="glass-button">
                Generate Analytics Report
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'penjualan' && (
                <motion.div
                  key="penjualan"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard 
                      title="Unit Terjual" 
                      value="18,240" 
                      change="+12.4%" 
                      description="Target Penjualan Nasional" 
                      trend="up"
                      icon={TrendingUp}
                    />
                    <StatCard 
                      title="Cabang Aktif" 
                      value="347" 
                      description="Cakupan Node Terdistribusi" 
                      icon={Users}
                    />
                    <StatCard 
                      title="Model Terpopuler" 
                      value="BeAT Matrix" 
                      description="Dominasi Pasar Utama" 
                      icon={Package}
                    />
                    <StatCard 
                      title="Total Pendapatan" 
                      value="IDR 364 B" 
                      change="+8.52%" 
                      description="Data Kinerja Fiskal" 
                      trend="up"
                      icon={TrendingUp}
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8">
                      <ChartContainer title="Temporal Deployment Trend" subtitle="Unit allocation across 6-month cycle">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={SALES_DATA}>
                            <defs>
                              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis 
                              dataKey="name" 
                              axisLine={false} 
                              tickLine={false} 
                              tick={{ fontSize: 10, fill: '#64748b', fontFamily: 'JetBrains Mono' }} 
                            />
                            <YAxis 
                              axisLine={false} 
                              tickLine={false} 
                              tick={{ fontSize: 10, fill: '#64748b', fontFamily: 'JetBrains Mono' }} 
                            />
                            <Tooltip 
                              cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '4 4' }}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="value" 
                              stroke="#6366f1" 
                              strokeWidth={3}
                              fillOpacity={1} 
                              fill="url(#colorValue)" 
                              animationDuration={2000}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>

                    <div className="lg:col-span-4">
                      <ChartContainer title="Segment Distribution" subtitle="Hierarchical market share mapping">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={MODEL_DISTRIBUTION}
                              cx="50%"
                              cy="45%"
                              innerRadius={65}
                              outerRadius={85}
                              paddingAngle={8}
                              dataKey="value"
                              stroke="none"
                            >
                              {MODEL_DISTRIBUTION.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <text x="50%" y="45%" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-light fill-white font-sans">
                              100%
                            </text>
                            <text x="50%" y="54%" textAnchor="middle" dominantBaseline="middle" className="text-[10px] uppercase font-bold fill-slate-500 tracking-[0.2em]">
                              Coverage
                            </text>
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="grid grid-cols-2 gap-3 mt-4">
                           {MODEL_DISTRIBUTION.map((m) => (
                             <div key={m.name} className="flex items-center gap-3 p-2 bg-white/[0.02] border border-white/5 rounded-xl">
                               <div className="w-2 h-2 rounded-full shrink-0 shadow-[0_0_8px_rgba(255,255,255,0.2)]" style={{ backgroundColor: m.color }}></div>
                               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{m.name}</span>
                             </div>
                           ))}
                        </div>
                      </ChartContainer>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'servis' && (
                <motion.div
                  key="servis"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatCard 
                      title="Log Perawatan" 
                      value="54,320" 
                      change="+7.2%" 
                      description="Pusat Servis Resmi" 
                      trend="up"
                      icon={Wrench}
                    />
                    <StatCard 
                      title="Efisiensi Ops" 
                      value="47.2 ms" 
                      change="-2.1ms" 
                      description="Ambang Batas Latensi: 45.0ms" 
                      trend="down"
                      icon={Calendar}
                    />
                    <StatCard 
                      title="Rating Layanan" 
                      value="4.86 / 5" 
                      change="+0.14" 
                      description="Indeks Kepuasan Pelanggan" 
                      trend="up"
                      icon={Users}
                    />
                  </div>

                  <ChartContainer title="Service Category Density" subtitle="Relative frequency of specialized maintenance node ops">
                    <ResponsiveContainer width="100%" height={320}>
                      <BarChart data={SERVICE_TYPES} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" hide />
                        <YAxis 
                          type="category" 
                          dataKey="name" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600, fontFamily: 'JetBrains Mono' }}
                          width={110}
                        />
                        <Tooltip 
                          cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                        />
                        <Bar 
                          dataKey="count" 
                          fill="url(#barGradient)" 
                          radius={[0, 8, 8, 0]} 
                          barSize={24}
                        >
                           {SERVICE_TYPES.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={index === 0 ? '#6366f1' : '#1e293b'} stroke={index === 0 ? '#818cf8' : 'rgba(255,255,255,0.1)'} />
                           ))}
                        </Bar>
                        <defs>
                          <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#1e1b4b" stopOpacity={1}/>
                            <stop offset="100%" stopColor="#6366f1" stopOpacity={1}/>
                          </linearGradient>
                        </defs>
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </motion.div>
              )}

              {activeTab === 'stok' && (
                <motion.div
                  key="stok"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatCard 
                      title="Total Item Unik" 
                      value="12,840" 
                      description="Node Inventori Terkatalog" 
                      icon={Package}
                    />
                    <StatCard 
                      title="Depresi Kritis" 
                      value="238" 
                      description="Permintaan Isi Ulang: Segera" 
                      icon={ArrowDownRight}
                      trend="down"
                      change="ALPHA_ALERT"
                    />
                    <StatCard 
                      title="Valuasi Aset" 
                      value="IDR 89.4 B" 
                      description="Total Nilai Gudang Agregat" 
                      icon={Boxes}
                    />
                  </div>

                  <ChartContainer title="Asset Velocity Matrix" subtitle="Top performing stock elements by transactional frequency">
                     <ResponsiveContainer width="100%" height={450}>
                      <BarChart data={STOCK_DATA} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" hide />
                        <YAxis 
                          type="category" 
                          dataKey="name" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 9, fill: '#64748b', fontFamily: 'JetBrains Mono' }}
                          width={110}
                        />
                        <Tooltip 
                           cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                        />
                        <Bar 
                          dataKey="value" 
                          fill="#22d3ee" 
                          radius={[0, 12, 12, 0]} 
                          barSize={18}
                          className="drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                        >
                           {STOCK_DATA.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={index < 3 ? '#22d3ee' : '#1e293b'} />
                           ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Console / Status Bar */}
        <footer className="px-8 py-3 bg-black/40 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-600 shrink-0">
          <div className="flex items-center gap-4">
            <span className="text-indigo-400 font-bold uppercase tracking-wider">PROJECT_MOTODASH_V4.2.0</span>
            <div className="h-3 w-[1px] bg-slate-800"></div>
            <span>USER_ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
          </div>
          <div className="flex gap-8 uppercase">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              <span>Core Stable</span>
            </div>
            <span>Lat: 1,942ms</span>
            <span className="text-indigo-500 hidden sm:block">EUC-WEST-CLUSTER-04</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
