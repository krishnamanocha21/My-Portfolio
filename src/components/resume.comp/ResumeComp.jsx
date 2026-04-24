import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, RotateCcw, Maximize, 
  Search, Moon, PanelLeft, LayoutGrid, ChevronUp, ChevronDown 
} from 'lucide-react';

const ResumeComp = () => {
  // CRITICAL: This matches the file you provided exactly.
  const resumeUrl = "/Krishna Resume.pdf"; 

  const handleFullscreen = () => {
    window.open(resumeUrl, '_blank');
  };

  return (
    <section className="min-h-screen bg-[#02080f] text-white px-5 md:px-20 py-12 flex flex-col">
      
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-cyan-400">Krishna's Resume</h2>
        <p className="text-gray-400 mt-2 text-lg">
          Full Stack Developer | GenAI 
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex-grow w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0b1220] shadow-2xl flex flex-col relative"
        style={{ height: "85vh" }}
      >
        {/* Modern Custom Toolbar */}
        <div className="h-14 bg-black/40 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-4">
            
          </div>

          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.1, color: "#fff" }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFullscreen}
              className="cursor-pointer text-gray-400 p-1"
              title="Open Fullscreen"
            >
              <Maximize size={18} />
            </motion.div>
            
            
          </div>
        </div>

        {/* The PDF Viewer with specific Zoom */}
        <div className="relative flex-grow bg-[#1a1d21]">
          <iframe
            /* #zoom=100 sets it to 100% size.
               Change to #zoom=page-width if you want it to fill the container width.
            */
            src={`${resumeUrl}#zoom=100&toolbar=0&navpanes=0`}
            title="Krishna Manocha Resume"
            className="w-full h-full border-none"
          />

          {/* Page Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-xl border border-white/10 px-5 py-2 rounded-full flex items-center gap-6 shadow-2xl">
            <div className="flex items-center gap-2">
              <ChevronUp size={16} className="text-gray-500" />
              <span className="text-sm font-medium tracking-widest text-gray-200">1 / 1</span>
              
            </div>
            <div className="w-[1px] h-4 bg-white/10" />
            <LayoutGrid size={16} className="text-gray-400" />
          </div>
        </div>
      </motion.div>

      <footer className="mt-8 text-center text-gray-500 text-xs tracking-widest uppercase">
        Krishna Manocha : Web Developer | GenAi
      </footer>
    </section>
  );
};

export default ResumeComp;