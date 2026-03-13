// // /frontend/tailwind.config.js (Ensuring Animation Blocks are Removed)

// /** @type {import('tailwindcss').Config} */
// import colors from 'tailwindcss/colors'; 
// import defaultTheme from 'tailwindcss/defaultTheme'; 

// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ['Inter', ...defaultTheme.fontFamily.sans],
//       },
//       colors: {
//         primary: {
//           50: '#eff6ff',
//           100: '#dbeafe',
//           200: '#bfdbfe',
//           300: '#93c5fd',
//           400: '#60a5fa', 
//           500: '#3b82f6',
//           600: '#2563eb', 
//           700: '#1d4ed8',
//           800: '#1e40af',
//           900: '#1e3a8a',
//           950: '#172554',
//         },
//         gray: colors.gray,
//         blue: colors.blue,
//         red: colors.red,
//         green: colors.green,
//       },
//       // KEYFRAMES AND ANIMATION BLOCKS MUST BE ABSENT HERE
//     },
//   },
//   plugins: [
//     require('@tailwindcss/forms'),
//     require('@tailwindcss/typography'),
//   ],
// }




/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 1. TYPOGRAPHY: Ensure 'Inter' is the default sans font
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        mono: ['Fira Code', ...defaultTheme.fontFamily.mono], // Optional: Great for code blocks
      },

      // 2. COLOR PALETTE EXTENSIONS
      // We extend the palette to include specific "glass" colors for your cards
      colors: {
        glass: {
          100: 'rgba(255, 255, 255, 0.1)',
          200: 'rgba(255, 255, 255, 0.2)',
          300: 'rgba(255, 255, 255, 0.3)',
        },
        dark: {
          900: '#020617', // Matches your body bg
          800: '#0f172a',
          700: '#1e293b',
        }
      },

      // 3. ANIMATIONS (Cinematic Feels)
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },

      // 4. EFFECTS
      dropShadow: {
        'glow-blue': '0 0 10px rgba(56, 189, 248, 0.5)',
        'glow-indigo': '0 0 15px rgba(99, 102, 241, 0.6)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'conic-logo': 'conic-gradient(from 180deg at 50% 50%, rgba(79, 70, 229, 0.5) 0deg, rgba(34, 211, 238, 0.5) 180deg, rgba(79, 70, 229, 0.5) 360deg)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // Note: 'forms' plugin is great, but often conflicts with custom styled inputs.
    // If your inputs look weird, try disabling this line.
    require('@tailwindcss/forms'), 
  ],
}