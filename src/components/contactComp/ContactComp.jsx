import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, MessageSquare } from 'lucide-react';

const ContactComp = () => {
  return (
    <section className="min-h-screen bg-[#02080f] text-white px-5 md:px-20 py-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold text-cyan-400 mb-4">Get In Touch</h2>
        <p className="text-gray-400 text-lg">Have a project in mind or just want to say hi? Let's connect.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        
        {/* Contact Info Cards */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl flex items-center gap-6">
            <div className="p-4 bg-cyan-500/10 rounded-xl text-cyan-400"><Mail size={28} /></div>
            <div>
              <p className="text-sm text-gray-400">Email Me</p>
              <p className="text-lg font-semibold">krishnamanocha21@gmail.com</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl flex items-center gap-6">
            <div className="p-4 bg-cyan-500/10 rounded-xl text-cyan-400"><MapPin size={28} /></div>
            <div>
              <p className="text-sm text-gray-400">Location</p>
              <p className="text-lg font-semibold">Panipat, Haryana, India</p>
            </div>
          </div>

          {/* Social Links Grid */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { icon: <Github />, link: "https://github.com/krishnamanocha21", color: "hover:bg-gray-800" },
              { icon: <Linkedin />, link: "https://www.linkedin.com/in/krishna-manocha-12433a317/", color: "hover:bg-blue-600" },
              { icon: <MessageSquare />, link: "https://wa.me/917056649569", color: "hover:bg-green-600" }
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.link}
                target="_blank"
                whileHover={{ y: -5 }}
                className={`flex justify-center py-4 bg-white/5 border border-white/10 rounded-xl transition-all ${social.color}`}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" placeholder="Your Name" className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 focus:outline-none focus:border-cyan-400 transition-all" />
            <input type="email" placeholder="Your Email" className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 focus:outline-none focus:border-cyan-400 transition-all" />
          </div>
          <input type="text" placeholder="Subject" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 focus:outline-none focus:border-cyan-400 transition-all" />
          <textarea rows="4" placeholder="Your Message" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 focus:outline-none focus:border-cyan-400 transition-all"></textarea>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-cyan-500 text-black font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
          >
            Send Message <Send size={18} />
          </motion.button>
        </motion.form>

      </div>
    </section>
  );
};

export default ContactComp;