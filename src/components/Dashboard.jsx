import { useMemo, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, Legend
} from "recharts";
import { 
  CheckCircle, AlertTriangle, Clock, Shield, 
  LayoutDashboard, FileText, ClipboardList, History, LogOut, Menu, X, Plus, Download
} from "lucide-react";

// ==================== UI REPLACEMENTS (Shadcn Substitutes) ====================
const Card = ({ children, className = "" }) => (
  <div className={`bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden ${className}`}>{children}</div>
);
const CardHeader = ({ children }) => <div className="p-6 pb-2 space-y-1">{children}</div>;
const CardTitle = ({ children }) => <h3 className="text-lg font-bold text-gray-800 tracking-tight">{children}</h3>;
const CardContent = ({ children, className = "" }) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;

// ==================== CONSTANTS & DATA ====================
const COLORS = {
  blue: "#2563eb",
  orange: "#f97316",
  green: "#16a34a",
  red: "#dc2626",
};

const DATA = {
  weeklyHours: [
    { day: "Mon", regular: 8, overtime: 2 }, { day: "Tue", regular: 8, overtime: 1 },
    { day: "Wed", regular: 8, overtime: 0 }, { day: "Thu", regular: 8, overtime: 3 },
    { day: "Fri", regular: 8, overtime: 1.5 }, { day: "Sat", regular: 6, overtime: 0 },
    { day: "Sun", regular: 0, overtime: 0 },
  ],
  taskTrend: [
    { week: "W1", assigned: 28, completed: 24 },
    { week: "W2", assigned: 31, completed: 29 },
    { week: "W3", assigned: 29, completed: 27 },
    { week: "W4", assigned: 35, completed: 36 },
  ],
  training: [
    { name: "Completed", value: 75, color: COLORS.green },
    { name: "In Progress", value: 15, color: COLORS.orange },
    { name: "Pending", value: 10, color: COLORS.red },
  ],
  equipment: [
    { name: "Operational", value: 70, color: COLORS.green },
    { name: "Maintenance", value: 20, color: COLORS.orange },
    { name: "Offline", value: 10, color: COLORS.red },
  ],
};

// ==================== SIDEBAR (Based on Image) ====================
function Sidebar({ isOpen, setIsOpen }) {
  const menuItems = [
    { icon: <LayoutDashboard size={18} />, label: "Dashboard", active: true },
    { icon: <Plus size={18} />, label: "Submit Report" },
    { icon: <ClipboardList size={18} />, label: "Report Status" },
    { icon: <History size={18} />, label: "History" },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsOpen(false)} />
      )}
      <aside className={`fixed top-0 left-0 z-50 h-screen bg-[#0f1115] text-white transition-transform w-64 
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h2 className="text-red-500 font-bold text-xl tracking-wider">REDVION</h2>
            <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">Employee Portal</p>
          </div>

          <nav className="flex-1 px-3 space-y-1">
            {menuItems.map((item, i) => (
              <button key={i} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                ${item.active ? "bg-white text-black font-semibold shadow-md" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-white/10 space-y-4">
            <div className="px-4">
              <p className="text-sm font-bold">twat</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-tighter">General</p>
            </div>
            <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-red-400 transition-colors">
              <LogOut size={18} />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

// ==================== MAIN CONTENT ====================
export default function EmployeeAnalytics() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const analytics = DATA;

  const stats = useMemo(() => {
    const regular = analytics.weeklyHours.reduce((s, d) => s + d.regular, 0);
    const overtime = analytics.weeklyHours.reduce((s, d) => s + d.overtime, 0);

    return [
      { title: "Incident Free", value: "127 Days", sub: "+5 this month", icon: <Shield className="text-green-600" /> },
      { title: "Weekly Hours", value: (regular + overtime).toFixed(1), sub: `${overtime.toFixed(1)}h OT`, icon: <Clock className="text-blue-600" /> },
      { title: "Active Alerts", value: "2", sub: "Requires attention", danger: true, icon: <AlertTriangle className="text-yellow-500" /> },
      { title: "Tasks", value: "18/20", sub: "90% completion", icon: <CheckCircle className="text-orange-500" /> },
    ];
  }, [analytics]);

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="lg:ml-64 transition-all">
        {/* Header from Image */}
        <header className="h-20 flex items-center justify-between px-8 sticky top-0 bg-[#f8f9fc]/80 backdrop-blur-md z-30">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 bg-white rounded-md shadow-sm" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={20}/>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, <span className="text-gray-700">twat</span></h1>
              <p className="text-sm text-gray-500">Here's an overview of your safety and performance analytics</p>
            </div>
          </div>
          <button className="bg-[#f05252] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-red-200 hover:bg-red-600 transition-all flex items-center gap-2">
            <Plus size={18} /> New Observation
          </button>
        </header>

        <main className="p-8 pt-2 space-y-8">
          {/* STATS SECTION */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <StatCard key={i} {...s} />
            ))}
          </div>

          {/* TOP CHARTS */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <ChartCard title="Weekly Work Hours" subtitle="Regular vs overtime">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={analytics.weeklyHours}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                  <Bar dataKey="regular" fill={COLORS.blue} radius={[4, 4, 0, 0]} barSize={30} />
                  <Bar dataKey="overtime" fill={COLORS.orange} radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <DonutCard title="Safety Training" subtitle="Certification progress" data={analytics.training} />
          </div>

          {/* BOTTOM CHARTS */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-8">
            <ChartCard title="Task Performance" subtitle="Assigned vs Completed weekly">
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={analytics.taskTrend}>
                  <defs>
                    <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.green} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={COLORS.green} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                  <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                  <Area type="monotone" dataKey="assigned" stroke={COLORS.orange} fill="transparent" strokeWidth={3} dot={{r: 4, fill: COLORS.orange}} />
                  <Area type="monotone" dataKey="completed" stroke={COLORS.green} fill="url(#colorCompleted)" strokeWidth={3} dot={{r: 4, fill: COLORS.green}} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            <DonutCard title="Equipment Status" subtitle="Operational health overview" data={analytics.equipment} />
          </div>
        </main>
      </div>
    </div>
  );
}

// ==================== HELPER COMPONENTS ====================

function StatCard({ title, value, sub, icon, danger }) {
  return (
    <Card className="border-none shadow-sm">
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{title}</p>
          <h2 className="text-2xl font-black text-gray-900 mt-1">{value}</h2>
          <p className={`text-xs mt-1 font-bold ${danger ? "text-red-500" : "text-green-500"}`}>
            {sub}
          </p>
        </div>
        <div className="h-14 w-14 flex items-center justify-center rounded-2xl bg-gray-50 border border-gray-100 shadow-inner">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}

function ChartCard({ title, subtitle, children }) {
  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-xs text-gray-400 font-medium">{subtitle}</p>
      </CardHeader>
      <CardContent className="mt-4">{children}</CardContent>
    </Card>
  );
}

function DonutCard({ title, subtitle, data }) {
  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-xs text-gray-400 font-medium">{subtitle}</p>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie data={data} dataKey="value" innerRadius={75} outerRadius={105} paddingAngle={4} stroke="none">
              {data.map((d, i) => <Cell key={i} fill={d.color} />)}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{paddingTop: '20px', fontSize: '12px', fontWeight: 'bold'}} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}