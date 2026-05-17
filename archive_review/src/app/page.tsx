'use client';

import { useState, useEffect } from 'react';
import { Check, ChevronDown, Star, Heart, Shield, Clock, FileText, Users, ArrowRight, Download, Mail } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  slug: string;
  tier: 'starter' | 'professional' | 'agency';
  featured: boolean;
  features: string[];
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async (slug: string) => {
    setCheckingOut(slug);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productSlug: slug }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setCheckingOut(null);
    }
  };

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  const faqs = [
    {
      question: "What's the difference between the Essential, Complete, and Premium packages?",
      answer: "Essential includes the core guide plus essential templates. Complete adds all 15+ fillable templates, all sample letters, behavior tracking forms, and priority support. Premium includes everything plus therapy coordination forms, mediation templates, white-label rights, lifetime updates, and priority 1-on-1 support."
    },
    {
      question: "Can I share the templates with my child's school?",
      answer: "In the Essential and Complete packages, templates are for personal use with your own child. The Premium package includes white-label rights, allowing you to use and adapt the materials in your professional practice or training programs."
    },
    {
      question: "Is this guide applicable in all US states?",
      answer: "Yes. While some procedures may vary slightly by state, IDEA is a federal law that applies nationwide. The guide focuses on federal requirements while noting state-specific variations where relevant."
    },
    {
      question: "What format is the guide delivered in?",
      answer: "The complete guide is delivered as a professional PDF that you can view on any device, print at home, or take to meetings. All templates are included as fillable PDF forms in the Complete and Premium packages."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee. If you're not completely satisfied with the guide, simply contact us and we'll issue a full refund—no questions asked."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-emerald-600" />
              <span className="font-bold text-xl text-gray-900">Special Needs Parent Guide</span>
            </div>
            <button
              onClick={scrollToPricing}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
            >
              Get Instant Access
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-20 lg:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            Trusted by 2,500+ parents nationwide
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Navigate the IEP Process with{' '}
            <span className="text-emerald-600">Confidence</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The complete resource guide for special needs parents. Get expert guidance on IEP meetings, therapy coordination, and advocating for your child&apos;s educational success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToPricing}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
            >
              Get Your Guide <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#whats-inside"
              className="border-2 border-gray-200 hover:border-emerald-600 text-gray-700 hover:text-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2"
            >
              See What&apos;s Inside
            </a>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-gray-900 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-emerald-400">85+</div>
              <div className="text-gray-400 text-sm mt-1">Pages of Guidance</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-emerald-400">25+</div>
              <div className="text-gray-400 text-sm mt-1">Ready-to-Use Templates</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-emerald-400">15+</div>
              <div className="text-gray-400 text-sm mt-1">Action Checklists</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-emerald-400">2,500+</div>
              <div className="text-gray-400 text-sm mt-1">Happy Parents</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              You Shouldn&apos;t Have to Navigate This Alone
            </h2>
            <p className="text-lg text-gray-600">
              As a special needs parent, you already have enough on your plate. The IEP process shouldn&apos;t add more stress.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Overwhelming Paperwork</h3>
              <p className="text-gray-600 text-sm">IEP documents are dense and confusing. Knowing what to ask for and how to document your concerns feels impossible.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Intimidating Meetings</h3>
              <p className="text-gray-600 text-sm">Walking into a room with school professionals can feel like you&apos;re outmatched. You deserve to be an equal partner.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Uncertainty About Rights</h3>
              <p className="text-gray-600 text-sm">You know your child deserves more, but you&apos;re not sure what you&apos;re entitled to under IDEA.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Is This For */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Who This Guide Is For
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">First-Time IEP Parents</h3>
                <p className="text-gray-600 text-sm">You just learned your child needs special education services and feel lost. This guide gives you a clear roadmap.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Experienced Parents Seeking More</h3>
                <p className="text-gray-600 text-sm">You&apos;ve been through IEPs before but want to be more effective. Get advanced strategies and templates.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Parents of Multiple Kids</h3>
                <p className="text-gray-600 text-sm">Managing several IEPs or 504 plans? Our organization system keeps everything at your fingertips.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Special Education Professionals</h3>
                <p className="text-gray-600 text-sm">Coaches, advocates, and consultants can use the Premium package with white-label rights for their clients.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What&apos;s Inside */}
      <section id="whats-inside" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A comprehensive collection of guides, templates, and tools developed by parents who have been through the IEP process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Complete IEP Guide</h3>
              <p className="text-gray-600 text-sm">85+ pages covering everything from eligibility to annual reviews. Written in plain language, not legal jargon.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Meeting Preparation</h3>
              <p className="text-gray-600 text-sm">Step-by-step checklists and scripts to help you prepare for every IEP meeting with confidence.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Therapy Coordination</h3>
              <p className="text-gray-600 text-sm">Tips for managing multiple therapists and ensuring everyone on your child&apos;s team is aligned.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Advocacy Strategies</h3>
              <p className="text-gray-600 text-sm">Proven techniques for communicating with school staff and resolving disagreements constructively.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Ready-to-Use Templates</h3>
              <p className="text-gray-600 text-sm">Fillable PDF templates for IEP preparation, progress tracking, communication logs, and more.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Sample Letters</h3>
              <p className="text-gray-600 text-sm">12+ proven letter templates for requesting meetings, evaluations, and resolving concerns.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Stop Dreading IEP Season. Start Collaborating.
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Walk into every meeting prepared</h3>
                    <p className="text-gray-600 text-sm mt-1">Our checklists and scripts ensure you never forget an important point or question.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Understand your legal rights</h3>
                    <p className="text-gray-600 text-sm mt-1">We explain IDEA in plain language so you know exactly what your child is entitled to.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Build productive relationships</h3>
                    <p className="text-gray-600 text-sm mt-1">Learn to collaborate with school staff while still advocating effectively for your child.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Save hours of research</h3>
                    <p className="text-gray-600 text-sm mt-1">Everything you need is in one comprehensive guide—no more searching the internet for answers.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl p-8 text-white">
                <div className="text-sm font-medium mb-2 opacity-80">What parents are saying</div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-lg mb-6 leading-relaxed">
                  &quot;This guide gave me the confidence to speak up in IEP meetings. I went from feeling intimidated to feeling like an equal team member.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="font-semibold">MT</span>
                  </div>
                  <div>
                    <div className="font-medium">Maria T.</div>
                    <div className="text-sm opacity-80">Parent of a 9-year-old with autism</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Loved by Parents Everywhere
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-2xl p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-300 mb-6">
                &quot;The templates alone were worth the investment. Having everything organized made such a difference in our annual review.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center font-semibold">DR</div>
                <div>
                  <div className="font-medium">David R.</div>
                  <div className="text-sm text-gray-400">Parent of a 12-year-old with ADHD</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-2xl p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-300 mb-6">
                &quot;I used to dread IEP season. Now I actually look forward to collaborating with the school team. This guide changed everything.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center font-semibold">JL</div>
                <div>
                  <div className="font-medium">Jennifer L.</div>
                  <div className="text-sm text-gray-400">Parent of a 7-year-old with Down syndrome</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-2xl p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-300 mb-6">
                &quot;As a first-time IEP parent, I was completely lost. This guide walked me through every step and I finally feel prepared.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-semibold">SM</div>
                <div>
                  <div className="font-medium">Sarah M.</div>
                  <div className="text-sm text-gray-400">Parent of a 5-year-old with speech delays</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Package
            </h2>
            <p className="text-lg text-gray-600">
              One-time payment, instant access. Start advocating with confidence today.
            </p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-100 rounded-2xl h-96 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`relative bg-white rounded-2xl p-8 ${
                    product.featured
                      ? 'border-2 border-emerald-600 shadow-xl scale-105'
                      : 'border border-gray-200 shadow-sm'
                  }`}
                >
                  {product.featured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className={`text-xl font-bold mb-2 ${product.featured ? 'text-emerald-600' : 'text-gray-900'}`}>
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{product.description}</p>
                  </div>

                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      ${(product.price / 100).toFixed(0)}
                    </span>
                    <span className="text-gray-500 ml-1">one-time</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        <Check className={`w-5 h-5 flex-shrink-0 ${product.featured ? 'text-emerald-600' : 'text-gray-400'}`} />
                        <span className={product.featured ? 'text-gray-700' : 'text-gray-600'}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleCheckout(product.slug)}
                    disabled={checkingOut !== null}
                    className={`w-full py-4 rounded-xl font-semibold transition-all ${
                      product.featured
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30'
                        : 'border-2 border-gray-200 hover:border-emerald-600 text-gray-700 hover:text-emerald-600'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {checkingOut === product.slug ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      `Get ${product.name}`
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <p className="text-gray-500 text-sm flex items-center justify-center gap-4">
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                Secure Payment
              </span>
              <span className="flex items-center gap-1">
                <Download className="w-4 h-4" />
                Instant Download
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                30-Day Guarantee
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-5 bg-gray-50 text-gray-600 border-t border-gray-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Take Control of Your Child&apos;s IEP Journey?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands of parents who have navigated the IEP process with confidence. Your child&apos;s education is worth it.
          </p>
          <button
            onClick={scrollToPricing}
            className="bg-white text-emerald-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-50 transition-colors"
          >
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-emerald-500" />
              <span className="font-semibold text-white">Special Needs Parent Guide</span>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Special Needs Parent Guide. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}