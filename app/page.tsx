"use client";

import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import Particles from "react-particles";
import type { Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import { ArrowRight, MessageSquare, Shield, Zap } from "lucide-react";
import Link from "next/link";

const particlesConfig = {
  particles: {
    number: { value: 100, density: { enable: true, value_area: 800 } },
    color: { value: ["#6d28d9", "#9333ea", "#7c3aed"] },
    shape: { type: "circle" },
    opacity: {
      value: 0.5,
      random: true,
      animation: { enable: true, speed: 1, minimumValue: 0.1, sync: false },
    },
    size: {
      value: 3,
      random: true,
      animation: { enable: true, speed: 2, minimumValue: 0.1, sync: false },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#8b5cf6",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: true, rotateX: 600, rotateY: 1200 },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
      resize: true,
    },
    modes: {
      grab: { distance: 140, line_linked: { opacity: 0.8 } },
      push: { particles_nb: 4 },
    },
  },
  retina_detect: true,
  background: {
    color: "#1a202c",
    image: "radial-gradient(circle, rgba(31,41,55,1) 0%, rgba(0,0,0,1) 100%)",
    position: "50% 50%",
    repeat: "no-repeat",
    size: "cover",
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function Home() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Particles className="absolute inset-0" options={particlesConfig as any} />
      <div className="relative z-10">
        <nav className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-heading font-bold text-white">Chaitanya AI</div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              <Link href="/features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
              <Link href="/sign-in" className="text-gray-300 hover:text-white transition-colors">Sign In</Link>
              <Link
                href="/sign-up"
                className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-all transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Toggle Button */}
            <div className="md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none text-2xl">
                {menuOpen ? "×" : "☰"}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden mt-4 space-y-4 bg-black/80 p-6 rounded-lg backdrop-blur-md">
              <Link href="/about" className="block text-gray-300 hover:text-white transition-colors">About</Link>
              <Link href="/features" className="block text-gray-300 hover:text-white transition-colors">Features</Link>
              <Link href="/sign-in" className="block text-gray-300 hover:text-white transition-colors">Sign In</Link>
              <Link
                href="/sign-up"
                className="block bg-purple-600 text-white px-6 py-2 rounded-full text-center hover:bg-purple-700 transition-all transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-24">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center max-w-4xl mx-auto">
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-heading font-bold text-white mb-8"
            >
              Experience the Future of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-indigo-600">
                AI Conversation
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl text-gray-300 mb-12">
              Engage with our advanced AI assistant powered by cutting-edge technology. Experience natural conversations, get instant answers, and unlock new possibilities.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Link
                href="/chat"
                className="group bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full flex items-center gap-2 hover:opacity-90 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/20"
              >
                Start Chatting
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/features"
                className="text-white border border-purple-500/30 px-8 py-4 rounded-full hover:bg-purple-500/10 transition-all backdrop-blur-sm"
              >
                Explore Features
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-6 py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInUp} className="glass-card rounded-2xl p-8 border border-purple-500/20 backdrop-blur-xl bg-gradient-to-br from-purple-900/40 to-transparent">
              <MessageSquare className="w-12 h-12 text-purple-400 mb-6" />
              <h3 className="text-xl font-heading font-bold text-white mb-4">Natural Conversations</h3>
              <p className="text-gray-300">Experience fluid, context-aware conversations that feel natural and intuitive.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="glass-card rounded-2xl p-8 border border-purple-500/20 backdrop-blur-xl bg-gradient-to-br from-purple-900/40 to-transparent">
              <Zap className="w-12 h-12 text-purple-400 mb-6" />
              <h3 className="text-xl font-heading font-bold text-white mb-4">Lightning Fast</h3>
              <p className="text-gray-300">Get instant responses powered by our advanced AI processing capabilities.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="glass-card rounded-2xl p-8 border border-purple-500/20 backdrop-blur-xl bg-gradient-to-br from-purple-900/40 to-transparent">
              <Shield className="w-12 h-12 text-purple-400 mb-6" />
              <h3 className="text-xl font-heading font-bold text-white mb-4">Secure & Private</h3>
              <p className="text-gray-300">Your conversations are protected with enterprise-grade security and encryption.</p>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
