import React from "react";
import { Mail, Phone, MapPin, Clock, Send, ShieldCheck } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="w-full bg-slate-50/50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Get in Touch With Us
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-400 leading-relaxed">
            If you have any questions regarding our medical support team or need
            assistance with scheduling, please reach out below. We will get back
            to you as shortly as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-5 rounded-[1.75rem] border border-slate-100 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#006694]/5 flex items-center justify-center text-[#006694] flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Emergency Hotline
                </span>
                <span className="block font-black text-slate-800 text-sm sm:text-base">
                  +880 1607-420771
                </span>
                <span className="block text-[11px] font-medium text-slate-400">
                  Available 24/7 for critical care emergency services
                </span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-[1.75rem] border border-slate-100 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#006694]/5 flex items-center justify-center text-[#006694] flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Email Assistance
                </span>
                <span className="block font-black text-slate-800 text-sm sm:text-base">
                  support@hospital.com
                </span>
                <span className="block text-[11px] font-medium text-slate-400">
                  Get a response within a maximum of 12 hours
                </span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-[1.75rem] border border-slate-100 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#006694]/5 flex items-center justify-center text-[#006694] flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Chamber Location
                </span>
                <span className="block font-black text-slate-800 text-sm sm:text-base">
                  Sherpur, Mymensingh, Bangladesh
                </span>
                <span className="block text-[11px] font-medium text-slate-400">
                  Main Digital Diagnostics Hub Tower
                </span>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-[2rem] space-y-3 relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 text-white/5 pointer-events-none">
                <Clock className="w-32 h-32" />
              </div>
              <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>OPD Operational Hours</span>
              </div>
              <p className="text-xs font-medium text-slate-300 leading-relaxed">
                Saturday to Thursday (08:00 AM – 10:00 PM). Closed on Fridays
                for general dynamic consultation appointments.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-6 sm:p-8 lg:p-10 border border-slate-100 rounded-[2.5rem] shadow-sm space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                Send Us a Direct Message
              </h3>
              <p className="text-xs font-medium text-slate-400">
                Fill out this quick form panel and we will route it directly to
                the respective consultant desk.
              </p>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rakibul Islam"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-xs sm:text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#006694]/5 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. ashik3@gmail.com"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-xs sm:text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#006694]/5 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">
                  Subject / Query Type
                </label>
                <input
                  type="text"
                  placeholder="Appointment booking issues, general queries, etc."
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-xs sm:text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#006694]/5 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">
                  Your Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Type your description or query details here..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-xs sm:text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#006694]/5 transition-all resize-none"
                ></textarea>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wide">
                    Your data is strictly encrypted
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#006694] hover:bg-[#00557c] text-white font-bold text-xs sm:text-sm tracking-wide px-6 py-3.5 rounded-xl transition-all shadow-md shadow-[#006694]/10 active:scale-95 flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
