"use client"


import React from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  BarChart3, 
  Globe, 
  Layers, 
  Code2, 
  CheckCircle2 
} from 'lucide-react';

import { Twitter, Linkedin, Github as GithubIcon, Mail, Slack } from 'lucide-react';
import styles from "@/styles/Landing.module.css"

const Landing = () => {
  return (
    <div className={styles.wrapper}>
      {/* Background Decor */}
      <div className={styles.ambientGlow}></div>

      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <div className={styles.logo}>
            <ShieldCheck size={24} className={styles.brandYellow} />
            <span>UniBee</span>
          </div>
          <div className={styles.navLinks}>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#docs">Docs</a>
          </div>
          <button className={styles.navCta}>Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className={styles.hero}>
        <div className={styles.badge}>v2.0 is now live</div>
        <h1 className={styles.heroTitle}>
          Decimate Your High <br />
          <span className={styles.gradientText}>Billing Costs</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Open-source subscription billing software to optimize finances for 
          international business structures. Simple, scalable, and secure.
        </p>
        <div className={styles.heroActions}>
          <button className={styles.primaryBtn}>
            Try Now <ArrowRight size={18} />
          </button>
          <button className={styles.secondaryBtn}>Book a Demo</button>
        </div>
      </header>

      {/* Feature Grid */}
      <section className={styles.features} id="features">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Built for SaaS Growth</h2>
          <p className={styles.sectionDesc}>Everything you need to manage global payments.</p>
        </div>

        <div className={styles.grid}>
          <FeatureCard 
            icon={<Zap size={24} />} 
            title="Rapid Integration" 
            desc="Connect your existing stack in minutes with our robust SDKs."
          />
          <FeatureCard 
            icon={<BarChart3 size={24} />} 
            title="Revenue Analytics" 
            desc="Real-time reports of your revenue growth and user trends."
          />
          <FeatureCard 
            icon={<Globe size={24} />} 
            title="Global Tax" 
            desc="Automatic tax calculation for 150+ countries out of the box."
          />
          <FeatureCard 
            icon={<Layers size={24} />} 
            title="Flexible Models" 
            desc="One-time, recurring, or usage-based billing models supported."
          />
        </div>
      </section>

        {/* CTA Section */}
<section className={styles.ctaSection}>
  <div className={styles.ctaCard}>
    <h2 className={styles.ctaTitle}>Manage your global user base in one billing system.</h2>
    <p className={styles.ctaSubtitle}>Join other SMBs and enterprises that are already using UniBee to optimize their billing solutions.</p>
    <div className={styles.ctaActions}>
      <button className={styles.primaryBtn}>Try Now</button>
      <button className={styles.secondaryBtn}>Contact Sales</button>
    </div>
  </div>
</section>

{/* Comprehensive Footer */}
<footer className={styles.footerMain}>
  <div className={styles.footerGrid}>
    <div className={styles.footerBrand}>
      <div className={styles.logo}>
        <ShieldCheck size={24} className={styles.brandYellow} />
        <span>UniBee</span>
      </div>
      <p className={styles.brandDesc}>
        Open-source subscription billing software for modern SaaS businesses.
      </p>
      <div className={styles.socialLinks}>
        <a href="#"><GithubIcon size={20} /></a>
        <a href="#"><Twitter size={20} /></a>
        <a href="#"><Linkedin size={20} /></a>
        <a href="#"><Slack size={20} /></a>
      </div>
    </div>

    <div className={styles.footerColumn}>
      <h4>Product</h4>
      <a href="#">Recurring Billing</a>
      <a href="#">Payment Management</a>
      <a href="#">AI Analytics</a>
      <a href="#">Self-Hosting</a>
    </div>

    <div className={styles.footerColumn}>
      <h4>Resources</h4>
      <a href="#">Documentation</a>
      <a href="#">API Reference</a>
      <a href="#">Blog</a>
      <a href="#">Community</a>
    </div>

    <div className={styles.footerColumn}>
      <h4>Legal</h4>
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Service</a>
      <a href="#">Cookie Policy</a>
    </div>
  </div>

  <div className={styles.footerBottom}>
    <p>© 2026 All Rights Reserved | 🐝 Built in Tallinn</p>
    <div className={styles.supportLinks}>
      <a href="mailto:help@unibee.dev"><Mail size={14} /> help@unibee.dev</a>
    </div>
  </div>
</footer>



      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2026 UniBee. Open source under MIT License.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className={styles.card}>
    <div className={styles.cardIcon}>{icon}</div>
    <h3>{title}</h3>
    <p>{desc}</p>
  </div>
);

export default Landing;