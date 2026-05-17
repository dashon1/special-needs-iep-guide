'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, DollarSign, ShoppingCart, Download, Users, LogOut, RefreshCw } from 'lucide-react';

interface Stats {
  totalSales: number;
  totalRevenue: number;
  totalDownloads: number;
  uniqueBuyers: number;
  recentPurchases: Array<{
    id: string;
    email: string;
    amount: number;
    productId: string;
    downloadCount: number;
    createdAt: string;
  }>;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Check auth
    const isAuth = sessionStorage.getItem('adminAuth');
    if (!isAuth) {
      router.push('/admin/login');
      return;
    }
    fetchStats();
  }, [router]);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchStats();
    setRefreshing(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-emerald-500" />
              <span className="font-bold text-xl text-white">Admin Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Refresh"
              >
                <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-emerald-500" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              ${((stats?.totalRevenue || 0) / 100).toFixed(2)}
            </div>
            <div className="text-gray-400 text-sm">Total Revenue</div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {stats?.totalSales || 0}
            </div>
            <div className="text-gray-400 text-sm">Total Sales</div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Download className="w-6 h-6 text-purple-500" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {stats?.totalDownloads || 0}
            </div>
            <div className="text-gray-400 text-sm">Total Downloads</div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-amber-500" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {stats?.uniqueBuyers || 0}
            </div>
            <div className="text-gray-400 text-sm">Unique Buyers</div>
          </div>
        </div>

        {/* Recent Purchases */}
        <div className="bg-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Recent Purchases</h2>

          {stats?.recentPurchases && stats.recentPurchases.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Product</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Downloads</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentPurchases.map((purchase) => (
                    <tr key={purchase.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                      <td className="py-3 px-4 text-white">{purchase.email}</td>
                      <td className="py-3 px-4 text-emerald-400 font-medium">
                        ${(purchase.amount / 100).toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-gray-300">
                        {purchase.productId.replace('prod_', '').charAt(0).toUpperCase() + purchase.productId.replace('prod_', '').slice(1)}
                      </td>
                      <td className="py-3 px-4 text-gray-300">{purchase.downloadCount}</td>
                      <td className="py-3 px-4 text-gray-400 text-sm">
                        {new Date(purchase.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <ShoppingCart className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No purchases yet</p>
              <p className="text-gray-500 text-sm mt-1">Sales will appear here once customers start purchasing</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}