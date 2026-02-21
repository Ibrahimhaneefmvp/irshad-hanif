import React, { useState, useEffect, useRef } from 'react';
import { 
  Scale, 
  BookOpen, 
  Globe, 
  Briefcase, 
  Award, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight, 
  ArrowRight,
  Menu,
  X,
  Linkedin,
  Video
} from 'lucide-react';
import baba_webpage from './baba_webpage.jpg';

// --- Components ---

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsVisible(entry.isIntersecting));
    });
    const currentElement = domRef.current;
    if (currentElement) observer.observe(currentElement);
    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const domRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) setIsVisible(true);
    });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return <span ref={domRef}>{count}{suffix}</span>;
};

const Navigation = ({ activeSection, scrollToSection, mobileMenuOpen, setMobileMenuOpen }) => (
  <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0f1c]/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
        <Scale className="text-[#c5a059]" size={28} />
        <div className="flex flex-col">
          <span className="text-white font-serif text-lg tracking-wide">ADVOCATE HANIF</span>
          <span className="text-[10px] text-gray-400 tracking-[0.2em] uppercase">Supreme Court of India</span>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-8">
        {['Profile', 'Expertise', 'Judgments', 'Global', 'Contact'].map((item) => (
          <button
            key={item}
            onClick={() => scrollToSection(item.toLowerCase())}
            className={`text-sm uppercase tracking-widest transition-colors duration-300 ${
              activeSection === item.toLowerCase() ? 'text-[#c5a059]' : 'text-gray-400 hover:text-white'
            }`}
          >
            {item}
          </button>
        ))}
        <button 
          onClick={() => scrollToSection('contact')}
          className="px-6 py-2 bg-[#c5a059] text-[#0a0f1c] text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
        >
          Consult
        </button>
      </div>

      {/* Mobile Toggle */}
      <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <X /> : <Menu />}
      </button>
    </div>

    {/* Mobile Menu Overlay */}
    {mobileMenuOpen && (
      <div className="absolute top-20 left-0 w-full bg-[#0a0f1c] border-b border-white/10 p-6 flex flex-col space-y-4 md:hidden animate-fade-in-down">
        {['Profile', 'Expertise', 'Judgments', 'Global', 'Contact'].map((item) => (
          <button
            key={item}
            onClick={() => {
              scrollToSection(item.toLowerCase());
              setMobileMenuOpen(false);
            }}
            className="text-left text-gray-300 hover:text-[#c5a059] py-2 uppercase tracking-widest text-sm"
          >
            {item}
          </button>
        ))}
      </div>
    )}
  </nav>
);

const Hero = () => (
  <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
    {/* Dynamic Background Elements */}
    <div className="absolute top-0 left-0 w-full h-full bg-[#0a0f1c]">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#c5a059]/10 rounded-full blur-[100px] animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]"></div>
    </div>

    <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
      <FadeIn>
        <div className="inline-block px-4 py-1 border border-[#c5a059]/30 rounded-full bg-[#c5a059]/5 mb-6">
          <span className="text-[#c5a059] text-xs font-bold tracking-[0.2em] uppercase">Est. 1994 • Supreme Court of India</span>
        </div>
      </FadeIn>
      
      <FadeIn delay={200}>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight mb-8">
          Justice, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c5a059] to-[#e6dace]">Defended.</span>
        </h1>
      </FadeIn>

      <FadeIn delay={400}>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Mohd. Irshad Hanif. Advocate-on-Record. <br className="hidden md:block" />
          Three decades of defining precedents and bridging the gap between complex law and accessible justice.
        </p>
      </FadeIn>

      <FadeIn delay={600}>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button onClick={() => document.getElementById('contact').scrollIntoView({behavior: 'smooth'})} className="px-8 py-4 bg-[#c5a059] text-[#0a0f1c] font-bold uppercase tracking-widest hover:bg-white hover:scale-105 transition-all duration-300 w-full md:w-auto">
            Book Consultation
          </button>
          <button onClick={() => document.getElementById('judgments').scrollIntoView({behavior: 'smooth'})} className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/5 hover:border-white transition-all duration-300 w-full md:w-auto flex items-center justify-center gap-2">
            View Precedents <ArrowRight size={16} />
          </button>
        </div>
      </FadeIn>
    </div>
    
    {/* Stats Strip */}
    <div className="absolute bottom-0 left-0 w-full border-t border-white/5 bg-[#0a0f1c]/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: 'Years Experience', value: 32, suffix: '+' },
          { label: 'AOR Designation', value: 2004, suffix: '' },
          { label: 'Major Cities', value: 4, suffix: '' },
          { label: 'Translations Authored', value: 3, suffix: '' },
        ].map((stat, idx) => (
          <div key={idx} className="text-center">
            <div className="text-2xl md:text-3xl font-serif text-white font-bold">
              <AnimatedCounter end={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Profile = () => (
  <section id="profile" className="py-24 bg-[#0a0f1c] relative">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <FadeIn className="relative">
        <div className="relative z-10 rounded-sm overflow-hidden border border-white/10 group">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-transparent to-transparent opacity-60"></div>
          {/* Placeholder for real image */}
          <img 
            src={baba_webpage} 
            alt="Supreme Court Meeting" 
            className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-8 left-8 right-8">
            <div className="bg-[#0a0f1c]/90 backdrop-blur-md p-6 border-l-4 border-[#c5a059]">
              <h3 className="text-[#c5a059] font-serif text-xl mb-2">The Scholar-Advocate</h3>
              <p className="text-gray-400 text-sm">Authored Urdu translations of the IPC & Evidence Act, endorsed by Chief Justice Altamash Kabir.</p>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#c5a059]/30"></div>
        <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[#c5a059]/30"></div>
      </FadeIn>

      <div className="space-y-8">
        <FadeIn delay={200}>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">A Legacy of <br /><span className="text-[#c5a059]">Constitutional Values.</span></h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Advocate Mohd. Irshad Hanif is not merely a litigator; he is a custodian of law. As an <strong className="text-white">Advocate-on-Record</strong>, he holds the distinct privilege of filing directly in the Supreme Court of India.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed mt-4">
            From the bustling corridors of the Delhi High Court to the solemn benches of the Apex Court, his career has been defined by a relentless pursuit of equity. His scholarly contributions—translating the <em className="text-white">Indian Penal Code</em> and <em className="text-white">Evidence Act</em> into Urdu—reflect a philosophy that true justice must be accessible to be effective.
          </p>
        </FadeIn>

        <FadeIn delay={400}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {[
              "Supreme Court Bar Association",
              "SCAORA Member",
              "Senior Panel Empanelment",
              "32 Years Legal Standing"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center space-x-3 text-gray-300">
                <div className="w-2 h-2 bg-[#c5a059] rounded-full"></div>
                <span className="text-sm tracking-wide">{item}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  </section>
);

const Expertise = () => {
  const [activeTab, setActiveTab] = useState(0);
  const areas = [
    {
      title: "Supreme Court Litigation",
      icon: <Scale size={24} />,
      desc: "Special Leave Petitions (SLP), Review Petitions, and Curative Petitions filed with the exclusive authority of an AOR.",
      details: ["Constitutional Matters", "Appellate Jurisdiction", "Federal Disputes"]
    },
    {
      title: "Criminal Defense",
      icon: <Award size={24} />,
      desc: "High-stakes defense for serious charges, including bail matters, appeals against conviction, and white-collar crime.",
      details: ["Bail & Anticipatory Bail", "Criminal Appeals", "PMLA & Economic Offenses"]
    },
    {
      title: "Corporate & Civil",
      icon: <Briefcase size={24} />,
      desc: "Comprehensive dispute resolution for businesses, contract enforcement, and property litigation across states.",
      details: ["Contract Disputes", "NCLT Matters", "Property & Land Law"]
    },
    {
      title: "Matrimonial & Family",
      icon: <Briefcase size={24} />, // Reusing briefcase for generic, or use Users if imported
      desc: "Sensitive handling of divorce, custody, and family partition suits, with expertise in diverse personal laws.",
      details: ["Divorce Proceedings", "Child Custody", "498A Quashing"]
    }
  ];

  return (
    <section id="expertise" className="py-24 bg-[#05080f] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#c5a059 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-serif text-white text-center mb-16">Areas of <span className="text-[#c5a059]">Expertise</span></h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Tab List */}
          <div className="lg:col-span-4 space-y-2">
            {areas.map((area, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`w-full text-left p-6 flex items-center space-x-4 transition-all duration-300 border-l-2 ${
                  activeTab === idx 
                    ? 'bg-white/5 border-[#c5a059] text-white' 
                    : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5'
                }`}
              >
                <span className={`${activeTab === idx ? 'text-[#c5a059]' : 'text-gray-600'}`}>
                  {area.icon}
                </span>
                <span className="font-serif text-lg tracking-wide">{area.title}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-8 bg-[#0a0f1c] border border-white/10 p-10 md:p-14 relative min-h-[400px] flex flex-col justify-center">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Scale size={150} text="#fff" />
            </div>
            
            <div key={activeTab} className="animate-fade-in-up"> {/* Replaced <key> with <div> */}
              <h3 className="text-3xl font-serif text-[#c5a059] mb-6">{areas[activeTab].title}</h3>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed font-light">
                {areas[activeTab].desc}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {areas[activeTab].details.map((detail, i) => (
                  <div key={i} className="flex items-center space-x-3 text-sm text-gray-400 border border-white/10 p-3 rounded bg-white/5">
                    <ChevronRight size={14} className="text-[#c5a059]" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Judgments = () => {
  const cases = [
    {
      year: "2023",
      court: "Supreme Court",
      title: "Death Sentence Commutation",
      desc: "Landmark intervention reducing a death penalty to 20 years life imprisonment without remission, setting a precedent on balancing crime severity with rehabilitation."
    },
    {
      year: "2022",
      court: "Supreme Court",
      title: "ASHA v. ROCKY",
      desc: "Crucial ruling in a matrimonial transfer petition before Justice Bela M. Trivedi, ensuring fair trial access in cross-state family disputes."
    },
    {
      year: "Ongoing",
      court: "Delhi High Court",
      title: "Delhi Riots Evidence",
      desc: "Defense strategy flagging investigative lapses and evidence integrity, leading to pivotal acquittals and reinforcing procedural justice."
    },
    {
      year: "2022",
      court: "Supreme Court",
      title: "Suleman v. State of UP",
      desc: "Challenge to state-level conviction regarding appreciation of evidence in criminal appeals before Justices Kaul and Sundresh."
    }
  ];

  return (
    <section id="judgments" className="py-24 bg-[#0a0f1c] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <span className="text-[#c5a059] text-xs font-bold tracking-[0.2em] uppercase mb-2 block">Case History</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white">Notable <br />Judgments</h2>
            </div>
            <p className="text-gray-400 max-w-md mt-6 md:mt-0">
              Selected rulings that have shaped legal discourse and protected individual liberties.
            </p>
          </div>
        </FadeIn>

        {/* Horizontal Scroll / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cases.map((c, i) => (
            <FadeIn key={i} delay={i * 100} className="h-full">
              <div className="group h-full bg-[#05080f] border border-white/10 p-8 hover:border-[#c5a059]/50 transition-all duration-300 hover:-translate-y-2 flex flex-col">
                <div className="text-[#c5a059] font-bold text-5xl opacity-20 mb-4 group-hover:opacity-40 transition-opacity">
                  0{i + 1}
                </div>
                <div className="mb-4">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">{c.year} • {c.court}</span>
                </div>
                <h3 className="text-xl font-serif text-white mb-4 leading-tight group-hover:text-[#c5a059] transition-colors">
                  {c.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mt-auto">
                  {c.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const GlobalDesk = () => (
  <section id="global" className="py-24 bg-[#0f172a] relative overflow-hidden">
    {/* Map Background visual */}
    <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-no-repeat bg-center bg-cover"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] to-transparent"></div>

    <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
      <div className="lg:w-1/2">
        <FadeIn>
          <div className="inline-flex items-center space-x-2 bg-[#c5a059]/10 px-4 py-2 rounded-full mb-6">
            <Globe size={16} className="text-[#c5a059]" />
            <span className="text-[#c5a059] text-xs font-bold tracking-widest uppercase">International Desk</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
            Borders Should Not <br />Limit Justice.
          </h2>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Specialized legal counsel for Non-Resident Indians (NRIs) and global citizens. We bridge the distance between your location and the Indian courts, handling property disputes, family law, and corporate interests without requiring your physical presence.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 rounded border border-white/10">
              <Video className="text-[#c5a059] mb-4" size={32} />
              <h4 className="text-white font-serif text-lg mb-2">Virtual Advocacy</h4>
              <p className="text-sm text-gray-400">Secure video consultations and digital documentation.</p>
            </div>
            <div className="bg-white/5 p-6 rounded border border-white/10">
              <MapPin className="text-[#c5a059] mb-4" size={32} />
              <h4 className="text-white font-serif text-lg mb-2">Remote Execution</h4>
              <p className="text-sm text-gray-400">Power of Attorney and property management from abroad.</p>
            </div>
          </div>
        </FadeIn>
      </div>
      
      {/* Decorative Interactive Element */}
      <div className="lg:w-1/2 relative">
        <FadeIn delay={200}>
          <div className="relative z-10 bg-[#0a0f1c] border border-white/10 p-8 rounded-lg shadow-2xl max-w-md mx-auto">
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
              <span className="text-white font-serif">Timezone Ready</span>
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="space-y-6">
              {[
                { city: "New Delhi", time: "10:00 AM", active: true },
                { city: "Dubai", time: "08:30 AM", active: false },
                { city: "London", time: "05:30 AM", active: false },
                { city: "New York", time: "12:30 AM", active: false },
              ].map((zone, i) => (
                <div key={i} className={`flex items-center justify-between ${zone.active ? 'opacity-100' : 'opacity-50'}`}>
                  <span className="text-gray-300">{zone.city}</span>
                  <span className="text-[#c5a059] font-mono">{zone.time}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 bg-[#c5a059] text-[#0a0f1c] font-bold uppercase text-xs tracking-widest hover:bg-white transition-colors">
              Schedule International Call
            </button>
          </div>
        </FadeIn>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-24 bg-[#0a0f1c] border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Begin Your Legal <br /><span className="text-[#c5a059]">Defense.</span></h2>
          <p className="text-gray-400 mb-12">
            Confidential consultations available in-person at the Supreme Court Chamber or via secure video link.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-[#c5a059]">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-white font-serif text-lg mb-1">Supreme Court Chamber</h4>
                <p className="text-gray-400 text-sm">Setal Wad Block, Supreme Court of India,<br />New Delhi - 110001</p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-[#c5a059]">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-white font-serif text-lg mb-1">Email Direct</h4>
                <p className="text-gray-400 text-sm">hanif.irshad@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-12 border-t border-white/10 flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-[#c5a059] transition-colors"><Linkedin /></a>
            <a href="#" className="text-gray-400 hover:text-[#c5a059] transition-colors"><Mail /></a>
          </div>
        </div>

        <div className="bg-[#05080f] p-8 md:p-12 border border-white/10">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-[#c5a059] uppercase tracking-widest">Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-[#c5a059] transition-colors" placeholder="Full Name" />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-[#c5a059] uppercase tracking-widest">Phone</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-[#c5a059] transition-colors" placeholder="+91..." />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-[#c5a059] uppercase tracking-widest">Email</label>
              <input type="email" className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-[#c5a059] transition-colors" placeholder="email@address.com" />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-[#c5a059] uppercase tracking-widest">Case Type</label>
              <select className="w-full bg-[#0a0f1c] border border-white/10 p-4 text-gray-300 focus:outline-none focus:border-[#c5a059] transition-colors">
                <option>Supreme Court Appeal</option>
                <option>International/NRI Matter</option>
                <option>Criminal Defense</option>
                <option>Matrimonial Dispute</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-[#c5a059] uppercase tracking-widest">Details</label>
              <textarea rows="4" className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-[#c5a059] transition-colors" placeholder="Brief description of the legal issue..."></textarea>
            </div>
            <button className="w-full py-4 bg-[#c5a059] text-[#0a0f1c] font-bold uppercase tracking-widest hover:bg-white transition-all duration-300">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#05080f] py-12 border-t border-white/5 text-center">
    <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
      <Scale className="text-[#c5a059] mb-4" size={32} />
      <p className="text-white font-serif text-lg tracking-wide mb-2">ADVOCATE MOHD. IRSHAD HANIF</p>
      <p className="text-gray-500 text-xs uppercase tracking-widest mb-8">Supreme Court of India</p>
      <p className="text-gray-600 text-sm max-w-2xl mx-auto leading-relaxed">
        Disclaimer: This website is for informational purposes only and does not constitute legal advice or solicitation under the rules of the Bar Council of India.
      </p>
      <p className="text-gray-700 text-xs mt-8">© 2026 Md. Irshad Hanif & Associates. All Rights Reserved.</p>
    </div>
  </footer>
);

// --- Main App Component ---

const App = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  //Pop-up for solicitation
  
  const [showDisclaimer, setShowDisclaimer] = React.useState(false);

  React.useEffect(() => {
    if (!localStorage.getItem('hasSeenDisclaimer')) {
      setShowDisclaimer(true);
    }
  }, []);

  const closeDisclaimer = () => {
    setShowDisclaimer(false);
    localStorage.setItem('hasSeenDisclaimer', 'true');
  };

  // Smooth scroll handler
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(sectionId);
  };

  // Scroll spy to update active section in nav
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'profile', 'expertise', 'judgments', 'global', 'contact'];
      const scrollPosition = window.scrollY + 200;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#0a0f1c] min-h-screen text-white font-sans selection:bg-[#c5a059] selection:text-white overflow-x-hidden">
      <Navigation 
        activeSection={activeSection} 
        scrollToSection={scrollToSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      <main>
        <Hero />
        <Profile />
        <Expertise />
        <Judgments />
        <GlobalDesk />
        <Contact />
      {/* Disclaimer Modal - shows only on first visit */}
      {showDisclaimer && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100] flex items-center justify-center p-6">
          <div className="bg-[#0a0f1c] border border-[#c5a059]/40 rounded-3xl max-w-md w-full p-10 text-center">
            <div className="text-6xl mb-6">⚖️</div>
            <h3 className="text-2xl font-semibold text-white mb-4">Important Disclaimer</h3>
            <p className="text-gray-300 leading-relaxed text-[16px]">
              Disclaimer: This website is for informational purposes only and does not constitute legal advice or solicitation under the rules of the Bar Council of India.
            </p>
            <button 
              onClick={closeDisclaimer}
              className="mt-8 w-full py-4 bg-[#c5a059] hover:bg-amber-400 text-black font-semibold rounded-2xl transition-all active:scale-95"
            >
              I Understand
            </button>
          </div>
        </div>
      )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
