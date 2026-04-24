import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, FileCheck, X } from 'lucide-react';

const Certificate = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const certificates = [
    {
      title: "CTRL+ALT+IDEA Ideathon, MSIT",
      status: "Winner (1st Position)",
      image: "/certificates/Ctrl_alt_idea.png", 
      type: "Winner",
      date: "Feb 12, 2026",
      issuer: "Microsoft Student Chapter, MSIT"
    },
    {
      title: "Digital CyberHunt CTF",
      status: "Finalist",
      image: "/certificates/ctf_certi.png",
      type: "Finalist",
      date: "Feb 7, 2026",
      issuer: "ThunderCipher (Geek Room MSIT)"
    },
    {
      title: "HackMSIT 1.0",
      status: "Finalist (Team: Breadboard & Butter)",
      image: "/certificates/Hack_msit.png",
      type: "Finalist",
      date: "April 10-11, 2026",
      issuer: "Microsoft Student Chapter, MSIT"
    },
    {
      title: "IDEATHON 2026",
      status: "Qualified / Team Participant",
      image: "/certificates/iic_ideathon.png",
      type: "Qualified",
      date: "April 7, 2026",
      issuer: "Maharaja Surajmal Institute of Technology"
    },
    {
      title: "Shark Tank, Esummit'26",
      status: "Participant",
      image: "/certificates/sharktank.png",
      type: "Participant",
      date: "March 24, 2026",
      issuer: "eCell MSIT"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section className="min-h-screen bg-[#02080f] text-white px-5 md:px-20 py-12">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-10"
      >
        <h2 className="text-4xl font-bold text-cyan-400 flex items-center gap-3">
          🏆 Certificates
        </h2>
        <p className="text-gray-400 mt-2 text-lg">
          A recognition of milestones and achievements.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {certificates.map((cert, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
            onClick={() => setSelectedImage(cert.image)}
            className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-5 transition-colors cursor-pointer"
          >
            {/* Optimized Thumbnail Container */}
            <div className="w-20 h-24 md:w-24 md:h-32 flex-shrink-0 overflow-hidden rounded-lg border border-white/10 bg-gray-900/50 flex items-center justify-center p-1">
              <img 
                src={cert.image} 
                alt={cert.title} 
                className="max-w-full max-h-full object-contain shadow-sm"
              />
            </div>

            <div className="flex flex-col">
              <h3 className="text-lg font-semibold leading-tight text-white mb-1">
                {cert.title}
              </h3>
              
              <div className="flex items-center gap-2">
                {cert.type === "Winner" ? (
                  <Trophy size={14} className="text-yellow-400" />
                ) : (
                  <FileCheck size={14} className="text-cyan-400/70" />
                )}
                <p className={`text-sm ${cert.type === "Winner" ? "text-yellow-400/90 font-medium" : "text-gray-400"}`}>
                  {cert.status}
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-1">{cert.date}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full flex justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 md:-right-12 text-white hover:text-cyan-400 transition-colors bg-white/10 p-2 rounded-full"
              >
                <X size={24} />
              </button>

              {/* Responsive Image with Height Clamping for A4 layout */}
              <img 
                src={selectedImage} 
                alt="Full Certificate" 
                className="max-h-[85vh] w-auto rounded-md shadow-2xl border border-white/10 object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificate;