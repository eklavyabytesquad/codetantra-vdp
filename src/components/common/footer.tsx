"use client"

import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
            <div className="space-y-3">
              <a href="mailto:info@srmvdp.edu.in" 
                 className="flex items-center space-x-3 hover:text-indigo-400 transition-colors duration-200">
                <Mail className="h-5 w-5" />
                <span>info@srmvdp.edu.in</span>
              </a>
              <a href="tel:+919876543210" 
                 className="flex items-center space-x-3 hover:text-indigo-400 transition-colors duration-200">
                <Phone className="h-5 w-5" />
                <span>+91 98765 43210</span>
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Location</h3>
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
              <p className="leading-relaxed">
                SRM VDP Campus,
                <br />
                Kandanchavadi, Old Mahabalipuram Road,
                <br />
                Chennai - 600119,
                <br />
                Tamil Nadu, India
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-indigo-400 transition-colors duration-200">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-indigo-400 transition-colors duration-200">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-indigo-400 transition-colors duration-200">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} SRM CodeHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;