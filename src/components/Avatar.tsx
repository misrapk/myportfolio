import React, { useState } from 'react';
import { Camera, CheckCircle, Sparkles } from 'lucide-react';

interface AvatarProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  className = '',
  size = 'lg',
  showBadge = true
}) => {
  // Load official photo directly with remote CDN fallback and local upload support
  const [imageSrc, setImageSrc] = useState<string>('/peeyush-profile.jpg');
  const [imageFailed, setImageFailed] = useState<boolean>(false);

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-20 h-20',
    lg: 'w-40 h-40 md:w-52 md:h-52',
    xl: 'w-56 h-56 md:w-64 md:h-64'
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
      setImageFailed(false);
    }
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Glow background accent */}
      <div className="absolute -inset-1.5 bg-gradient-to-tr from-blue-600 via-indigo-500 to-teal-400 rounded-2xl md:rounded-3xl blur-md opacity-70 group-hover:opacity-100 transition duration-500" />
      
      <div
        id="profile-avatar-container"
        className={`relative ${sizeClasses[size]} rounded-2xl md:rounded-3xl overflow-hidden border-2 border-white/80 dark:border-slate-800/80 shadow-2xl bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 group`}
      >
        {/* Top-right verified badge */}
        <div className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded-full bg-slate-900/70 border border-white/20 text-white text-[10px] font-medium flex items-center gap-1 backdrop-blur-md shadow-xs pointer-events-none">
          <Sparkles className="w-2.5 h-2.5 text-amber-400" />
          <span>Verified</span>
        </div>

        {!imageFailed ? (
          <img
            src={imageSrc}
            alt="Peeyush Kant Misra - Data Scientist & Educator"
            className="w-full h-full object-cover object-top filter contrast-[1.04] brightness-[1.02] transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
            onError={() => {
              if (imageSrc === '/peeyush-profile.jpg') {
                setImageSrc('https://avatars.githubusercontent.com/u/46857249?v=4');
              } else {
                setImageFailed(true);
              }
            }}
          />
        ) : (
          /* High-Fidelity SVG Portrait matching Peeyush's photo features: spectacles, dark beard & hair, polka dot collared shirt */
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full transform transition-transform duration-500 group-hover:scale-105"
            aria-label="Peeyush Kant Misra Avatar"
          >
            <defs>
              <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
              <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#d89e7c" />
                <stop offset="100%" stopColor="#c58762" />
              </linearGradient>
              <pattern id="polkaDots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="0.9" fill="#ffffff" opacity="0.65" />
                <circle cx="6" cy="6" r="0.9" fill="#ffffff" opacity="0.65" />
              </pattern>
            </defs>

            {/* Background */}
            <rect width="200" height="200" fill="url(#bgGrad)" />

            {/* Dark polka dot collared shirt */}
            <path d="M40 200 C50 160 70 145 100 145 C130 145 150 160 160 200 Z" fill="#1e2433" />
            <path d="M40 200 C50 160 70 145 100 145 C130 145 150 160 160 200 Z" fill="url(#polkaDots)" />
            
            {/* Shirt Collar & Buttons */}
            <path d="M85 145 L100 168 L115 145 Z" fill="#151b26" />
            <path d="M85 145 L100 168 L100 200 L85 200 Z" fill="#111620" />
            <circle cx="95" cy="180" r="1.5" fill="#e2e8f0" />

            {/* Neck */}
            <rect x="88" y="118" width="24" height="32" rx="4" fill="#c58762" />
            <path d="M88 126 C95 132 105 132 112 126" stroke="#af704b" strokeWidth="2" fill="none" />

            {/* Head / Face */}
            <ellipse cx="100" cy="92" rx="35" ry="42" fill="url(#skinGrad)" />

            {/* Hair */}
            <path
              d="M62 82 C60 52 75 36 100 36 C125 36 140 52 138 82 C138 65 125 48 100 48 C75 48 62 65 62 82 Z"
              fill="#18181b"
            />
            {/* Hair volume & texture */}
            <path d="M68 60 C80 44 120 44 132 60 C125 50 105 44 95 44 C82 44 72 52 68 60 Z" fill="#27272a" />

            {/* Ears */}
            <ellipse cx="64" cy="94" rx="4" ry="9" fill="#c58762" />
            <ellipse cx="136" cy="94" rx="4" ry="9" fill="#c58762" />

            {/* Eyebrows */}
            <path d="M76 76 Q86 73 93 76" stroke="#18181b" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M107 76 Q114 73 124 76" stroke="#18181b" strokeWidth="3" strokeLinecap="round" fill="none" />

            {/* Eyes */}
            <ellipse cx="84" cy="85" rx="3.5" ry="2.5" fill="#18181b" />
            <ellipse cx="116" cy="85" rx="3.5" ry="2.5" fill="#18181b" />
            <circle cx="85" cy="84" r="0.8" fill="#ffffff" />
            <circle cx="117" cy="84" r="0.8" fill="#ffffff" />

            {/* Nose */}
            <path d="M100 83 L98 98 L104 98" stroke="#af704b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />

            {/* Glasses (Black Rectangular Frames) */}
            <rect x="72" y="78" width="24" height="15" rx="3" fill="none" stroke="#18181b" strokeWidth="3" />
            <rect x="104" y="78" width="24" height="15" rx="3" fill="none" stroke="#18181b" strokeWidth="3" />
            {/* Bridge */}
            <path d="M96 83 L104 83" stroke="#18181b" strokeWidth="3" strokeLinecap="round" />
            {/* Temples */}
            <path d="M65 83 L72 83" stroke="#18181b" strokeWidth="2.5" />
            <path d="M128 83 L135 83" stroke="#18181b" strokeWidth="2.5" />
            {/* Lens Reflection Glare */}
            <line x1="75" y1="88" x2="80" y2="82" stroke="#ffffff" strokeWidth="1.2" opacity="0.6" strokeLinecap="round" />
            <line x1="107" y1="88" x2="112" y2="82" stroke="#ffffff" strokeWidth="1.2" opacity="0.6" strokeLinecap="round" />

            {/* Full Beard & Mustache */}
            <path
              d="M72 96 C72 128 85 144 100 144 C115 144 128 128 128 96 C124 106 118 114 110 114 C104 114 100 110 96 110 C92 110 88 114 82 114 C75 114 74 105 72 96 Z"
              fill="#18181b"
            />
            {/* Mustache */}
            <path
              d="M86 102 C92 100 97 104 100 106 C103 104 108 100 114 102 C111 107 105 109 100 109 C95 109 89 107 86 102 Z"
              fill="#09090b"
            />
            {/* Friendly smile line beneath mustache */}
            <path d="M94 112 Q100 115 106 112" stroke="#e08f62" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        )}

        {/* Change / Upload Photo Overlay button */}
        <label
          htmlFor="avatar-upload-input"
          title="Upload or change photo"
          className="absolute inset-0 bg-slate-950/45 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 text-white text-xs font-medium backdrop-blur-xs gap-2 z-10 p-3"
        >
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/25 hover:bg-white/35 border border-white/40 text-white text-xs font-semibold shadow-xl backdrop-blur-md transition-transform transform group-hover:scale-100 scale-90">
            <Camera className="w-3.5 h-3.5 text-white" />
            <span>Update Photo</span>
          </div>
          <span className="text-[10px] text-white/80 font-mono tracking-tight">Click to upload custom</span>
          <input
            id="avatar-upload-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleCustomUpload}
          />
        </label>
      </div>

      {/* Recruiter Status Badge */}
      {showBadge && (
        <div
          id="recruiter-status-badge"
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-emerald-600 dark:bg-emerald-500 text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-lg border border-white dark:border-slate-900 flex items-center gap-1.5 z-20"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-200 animate-ping" />
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          <span>Open to DS / ML Roles</span>
        </div>
      )}
    </div>
  );
};
