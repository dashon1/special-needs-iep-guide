'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check, Download, Mail, ArrowRight, Heart } from 'lucide-react';

export default function PurchaseSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [purchaseInfo, setPurchaseInfo] = useState<{
    email?: string;
    downloadToken?: string;
    tokenExpiresAt?: string;
    maxDownloads?: number;
    downloadCount?: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionId) {
      verifyPurchase();
    } else {
      setLoading(false);
      setError('No session ID found');
    }
  }, [sessionId]);

  const verifyPurchase = async () => {
    try {
      const res = await fetch('/api/purchase/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });
      const data = await res.json();

      if (data.success) {
        setPurchaseInfo(data);
      } else {
        setError(data.error || 'Purchase verification failed');
      }
    } catch (err) {
      setError('Failed to verify purchase');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (purchaseInfo?.downloadToken) {
      window.location.href = `/api/download/${purchaseInfo.downloadToken}`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying your purchase...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">!</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Return Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <header className="py-6">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2">
            <Heart className="w-8 h-8 text-emerald-600" />
            <span className="font-bold text-xl text-gray-900">Special Needs Parent Guide</span>
          </div>
        </div>
      </header>

      {/* Success Content */}
      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-emerald-600" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Thank You for Your Purchase!
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Your guide is ready. Download it now and start advocating with confidence for your child.
          </p>

          {purchaseInfo?.email && (
            <div className="bg-gray-50 rounded-xl p-4 mb-8">
              <p className="text-sm text-gray-500 mb-1">Purchase confirmation sent to:</p>
              <p className="font-medium text-gray-900">{purchaseInfo.email}</p>
            </div>
          )}

          <button
            onClick={handleDownload}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-5 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg shadow-emerald-600/30 mb-6"
          >
            <Download className="w-6 h-6" />
            Download Your Guide
          </button>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mb-8">
            <span className="flex items-center gap-1">
              <Check className="w-4 h-4 text-emerald-600" />
              5 downloads allowed
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-4 h-4 text-emerald-600" />
              Link expires in 72 hours
            </span>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="font-semibold text-gray-900 mb-4">What&apos;s Next?</h2>
            <div className="grid md:grid-cols-3 gap-4 text-left">
              <div className="bg-emerald-50 rounded-xl p-4">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center mb-3 text-white font-bold text-sm">1</div>
                <h3 className="font-medium text-gray-900 mb-1">Read the Guide</h3>
                <p className="text-sm text-gray-600">Start with the introduction and table of contents.</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mb-3 text-white font-bold text-sm">2</div>
                <h3 className="font-medium text-gray-900 mb-1">Print Templates</h3>
                <p className="text-sm text-gray-600">Print the templates you need for your next IEP meeting.</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mb-3 text-white font-bold text-sm">3</div>
                <h3 className="font-medium text-gray-900 mb-1">Prepare Confidently</h3>
                <p className="text-sm text-gray-600">Use the checklists and scripts before your next meeting.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Email Info */}
        <div className="mt-8 bg-white rounded-2xl p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <span className="text-gray-600">Check your inbox for the download link</span>
          </div>
          <p className="text-sm text-gray-500">
            If you don&apos;t see the email within a few minutes, check your spam folder.
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Home
          </a>
        </div>
      </main>
    </div>
  );
}