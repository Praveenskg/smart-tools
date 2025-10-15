# 🔬 ToolifyLab - Professional Tool Laboratory

A modern, responsive web application built with Next.js 15 and TypeScript, featuring a comprehensive collection of 17 practical tools and calculators for professionals, students, and everyday use. Includes a professional invoice generator with multi-currency support, template management, and PDF export capabilities.

![ToolifyLab](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Shadcn/ui](https://img.shields.io/badge/Shadcn/ui-2.7-000000?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)

## ✨ Features

### 🏦 Financial Tools (5 Tools)

#### **EMI Calculator** ⭐ Popular

- Calculate monthly EMIs for any loan with interest and tenure
- GST calculation (18%) on interest
- Detailed amortization schedule with PDF export
- Interactive pie chart visualization
- Date-based payment scheduling
- Professional PDF reports

#### **Currency Converter** ⭐ Popular

- Convert between different currencies with real-time exchange rates
- Support for 170+ world currencies
- Historical exchange rate data
- Clean, intuitive interface
- Real-time updates

#### **GST Calculator**

- Calculate GST amounts (inclusive/exclusive)
- Reverse GST calculation
- Multiple GST rates support (5%, 12%, 18%, 28%)
- Real-time calculation updates
- Clean, intuitive interface

#### **Tip Calculator**

- Restaurant tip calculation
- Bill splitting functionality
- Multiple tip percentage options (10%, 15%, 18%, 20%, 25%)
- Tax calculation support
- Per-person amount breakdown

#### **Invoice Generator** ⭐ Popular

- **Professional Invoice Creation** - Complete business invoicing solution
- **Multi-Currency Support** - 8 major currencies (USD, EUR, GBP, INR, CAD, AUD, JPY, CNY)
- **Advanced Tax & Discount System** - Flexible tax rates (0%-25%) and percentage discounts
- **Template Management** - Save, load, and manage invoice templates with localStorage
- **Company & Client Management** - Complete contact and address information
- **Itemized Billing** - Add multiple products/services with individual tax rates
- **Real-time Calculations** - Automatic subtotal, discount, tax, and total calculations
- **Professional PDF Export** - Business-ready PDF invoices with jsPDF
- **React Hook Form Integration** - Advanced form validation with Zod schema
- **Shadcn Day Picker** - Beautiful date selection for invoice and due dates
- **Live Preview** - Real-time invoice preview before PDF generation
- **Responsive Design** - Works perfectly on all devices
- **Tabbed Interface** - Organized workflow with Create, Templates, and Preview tabs
- **Perfect for Freelancers & Small Businesses** - Professional invoicing solution without external dependencies

### 📊 Planning & Tracking

#### **Goal Tracker** ⭐ Popular

- Create and manage personal financial goals
- Progress tracking with visual indicators
- Category-based organization
- Deadline management
- Local storage persistence
- Goal completion statistics
- Progress percentage calculation
- Days remaining/overdue tracking
- Interactive charts and progress bars

#### **ToDo List** ⭐ Popular

- Create and manage tasks with priorities
- Due date tracking and reminders
- Task completion status
- Priority levels (High, Medium, Low)
- Local storage persistence
- Filter by completion status
- Edit and delete functionality
- Clean, intuitive interface

### 🧮 Mathematical Tools (2 Tools)

#### **Percentage Calculator**

- Basic percentage calculations
- Percentage increase/decrease
- Value from percentage
- Percentage of total
- Multiple calculation modes
- Real-time results

#### **Area Calculator**

- Calculate area of various geometric shapes:
  - Rectangle/Square
  - Triangle
  - Circle
  - Trapezoid
  - Parallelogram
- Real-time calculations
- Unit conversion support
- Visual shape representation

### 📅 Date & Time Tools (4 Tools)

#### **Age Calculator**

- Calculate exact age in years, months, and days
- Precise date difference calculation
- Clean, modern interface
- Instant results

#### **Date of Birth Calculator**

- Find birth date from current age
- Reverse age calculation
- Multiple date formats
- Precise calculations

#### **Timezone Converter**

- Convert time between different timezones
- Track multiple world clocks simultaneously
- 15+ popular timezones pre-configured
- Real-time clock updates
- Date and time selection
- Copy functionality for converted times

#### **Timers** ⭐ Popular

- Countdown timer with customizable duration
- Stopwatch with lap functionality
- Visual progress indicators
- Audio alerts and notifications
- Pause, resume, and reset functionality
- Mobile-friendly interface

### 🏥 Health & Fitness

#### **BMI Calculator**

- Body Mass Index calculation
- Height and weight input
- BMI category classification (Underweight, Normal, Overweight, Obese)
- Health status indicators
- Metric and imperial units support
- Visual health status display

### 🔄 Conversion Tools

#### **Unit Converter**

- **Length**: mm, cm, m, km, inches, feet, yards, miles
- **Weight**: mg, g, kg, oz, lb, ton
- **Temperature**: Celsius, Fahrenheit, Kelvin
- **Area**: Square mm, cm, m, km, inches, feet, yards, acres
- Real-time conversion
- Tabbed interface for different categories
- Clean, organized layout

### 🤖 AI Tools

#### **Prompt Generator** ⭐ Popular

- Generate powerful, tailored AI prompts instantly
- Multiple prompt styles (Creative, Technical, Business, etc.)
- Real-time prompt generation using AI
- Copy to clipboard functionality
- Prompt history and management
- Professional prompt engineering

### 🖼️ Image Tools

#### **Image Tools** ⭐ Popular

- **Image Resizer** - Resize images to specific dimensions
- **Image Converter** - Convert between different formats (JPEG, PNG, WebP)
- **Image Compressor** - Reduce file size while maintaining quality
- **Color Picker** - Extract colors from images
- **Metadata Viewer** - View image EXIF data and properties
- Batch processing capabilities
- Real-time preview
- Download processed images

### 🛠️ Utility Tools

#### **QR Code Generator** ⭐ Popular

- Create custom QR codes for URLs, text, emails, and more
- Multiple QR code formats
- Customizable colors and sizes
- Logo overlay support
- Download functionality
- Real-time preview
- Error correction levels

## 🛠️ Technology Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React version
- **TypeScript 5** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Shadcn/ui** - Modern component library
- **Lucide React** - Beautiful icons

### Charts & Visualization

- **Recharts** - Composable charting library
- **Pie charts** for financial breakdowns
- **Progress bars** for goal tracking
- **Line charts** for trends

### PDF Generation

- **jsPDF** - Client-side PDF generation
- **jspdf-autotable** - Table generation in PDFs
- **Professional invoice layouts** with company branding
- **Multi-currency support** in PDF exports

### QR Code Generation

- **qrcode** - QR code generation library
- **@types/qrcode** - TypeScript definitions

### Image Processing

- **browser-image-compression** - Client-side image compression
- **exifr** - EXIF data extraction
- **react-easy-crop** - Image cropping functionality

### AI Integration

- **@google/genai** - Google Gemini AI integration
- **react-markdown** - Markdown rendering
- **rehype-highlight** - Syntax highlighting

### Date Handling

- **date-fns** - Modern date utility library
- **react-day-picker** - Date picker component
- **dayjs** - Lightweight date library

### Form Management & Validation

- **react-hook-form** - Performant, flexible forms with easy validation
- **@hookform/resolvers** - Validation resolvers for react-hook-form
- **zod** - TypeScript-first schema validation
- **Shadcn/ui form components** - Professional form elements

### Analytics

- **@vercel/analytics** - Web analytics

### State Management

- **React Hooks** - useState, useEffect, useCallback, useMemo
- **Local Storage** - Client-side data persistence
- **Custom Hooks** - useDynamicTitle, useMobile, usePerformance, useSEO

## 🎨 Design Features

### Modern UI/UX

- **Responsive Design** - Works on all devices
- **Dark/Light Mode** - Theme switching capability
- **Modern Cards** - Clean, elevated design with hover animations
- **Gradient Text** - Eye-catching typography
- **Smooth Animations** - Scale, rotation, and color transitions
- **Interactive Elements** - Hover states and transitions
- **Professional Layout** - Clean, organized interface

### Component Architecture

- **Modular Design** - Reusable components
- **Type Safety** - Full TypeScript implementation
- **Accessibility** - ARIA labels and keyboard navigation
- **Performance** - Optimized rendering and lazy loading
- **Error Boundaries** - Graceful error handling

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop** - Full-featured experience with grid layouts
- **Tablet** - Adaptive layout with touch-friendly elements
- **Mobile** - Touch-friendly interface with optimized spacing
- **All screen sizes** - Fluid design with breakpoint optimization

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/praveenskg/toolifylab.git
   cd toolifylab
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # TypeScript type checking
npm run clean        # Clean build files
```

## 📁 Project Structure

```
toolifylab/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Main dashboard
│   │   ├── manifest.json       # PWA manifest
│   │   ├── sw.ts              # Service worker
│   │   ├── api/               # API routes
│   │   │   └── generate-prompt/ # AI prompt generation
│   │   └── [tool]/            # Individual tool pages (17 tools)
│   │       └── page.tsx       # Tool-specific pages
│   ├── components/
│   │   ├── ui/                # Shadcn/ui components
│   │   ├── tools/             # Tool components (17 tools)
│   │   ├── Image-tools/       # Image processing components
│   │   ├── homepage/          # Homepage components
│   │   ├── theme-provider.tsx # Theme context
│   │   ├── theme-toggle.tsx   # Theme switcher
│   │   ├── header.tsx         # Navigation header
│   │   ├── footer.tsx         # Footer component
│   │   ├── LiveClock.tsx      # Live clock component
│   │   ├── loading.tsx        # Loading states
│   │   └── error-boundary.tsx # Error handling
│   ├── hooks/                 # Custom React hooks
│   │   ├── use-dynamic-title.ts
│   │   ├── use-mobile.ts
│   │   ├── use-performance.ts
│   │   ├── use-pwa.ts
│   │   └── use-seo.ts
│   └── lib/                   # Utility functions
│       ├── utils.ts           # Helper functions
│       └── tools.ts           # Tools configuration
├── public/                    # Static assets
├── components.json            # Shadcn/ui configuration
├── tailwind.config.js         # Tailwind configuration
├── next.config.ts             # Next.js configuration
└── package.json              # Dependencies and scripts
```

## 🎯 Key Features

### Data Persistence

- **Local Storage** - Goals and preferences persist across sessions
- **No Server Required** - All calculations done client-side
- **Privacy First** - Data stays on your device
- **Offline Capable** - Works without internet connection

### Export Functionality

- **PDF Export** - Download detailed reports and professional invoices
- **Professional Formatting** - Clean, printable documents with business branding
- **Complete Data** - All calculations and schedules included
- **Multi-Currency Support** - Export invoices in 8 major currencies
- **Template Management** - Save and reuse invoice templates
- **QR Code Downloads** - Save generated QR codes
- **Image Downloads** - Save processed images in various formats

### Performance

- **Fast Loading** - Optimized bundle size
- **Smooth Interactions** - 60fps animations
- **Efficient Calculations** - Real-time updates
- **Lazy Loading** - Components load on demand

### SEO & Analytics

- **Dynamic Titles** - SEO-optimized page titles
- **Meta Tags** - Proper meta descriptions
- **Vercel Analytics** - Performance tracking
- **Open Graph** - Social media sharing

### AI & Image Processing

- **AI-Powered Prompts** - Generate professional prompts using Google Gemini
- **Image Processing** - Resize, convert, compress, and analyze images
- **Real-time Processing** - Instant results with client-side processing
- **Multiple Formats** - Support for various image and document formats

### Business & Professional Tools

- **Professional Invoicing** - Complete business invoicing solution with multi-currency support
- **Template Management** - Save and reuse invoice templates for efficiency
- **Advanced Calculations** - Automatic tax, discount, and total calculations
- **Form Validation** - Comprehensive validation with react-hook-form and Zod
- **PDF Generation** - Professional PDF invoices with business branding
- **Real-time Preview** - Live invoice preview before export
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

## 🔧 Customization

### Adding New Tools

1. Create a new component in `src/components/tools/`
2. Add the tool to the tools array in `src/lib/tools.ts`
3. Create a page in `src/app/[tool-name]/page.tsx`
4. Include proper TypeScript interfaces
5. Add responsive design considerations
6. Implement error handling
7. Add to appropriate category (Financial, Math, Utility, etc.)

### Styling

- Uses Tailwind CSS for styling
- Shadcn/ui components for consistency
- Custom CSS classes for special effects
- Theme-aware color schemes

### Animation

- Hover animations on cards
- Icon scale and rotation effects
- Smooth color transitions
- Professional micro-interactions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - Amazing React framework
- **Shadcn/ui** - Beautiful component library
- **Tailwind CSS** - Utility-first CSS framework
- **Vercel** - Deployment platform
- **Lucide** - Beautiful icons
- **Recharts** - Charting library
- **Google Gemini** - AI prompt generation
- **browser-image-compression** - Image processing
- **jsPDF** - PDF generation
- **qrcode** - QR code generation
- **react-hook-form** - Advanced form management
- **Zod** - TypeScript-first schema validation
- **date-fns** - Modern date utilities
- **react-day-picker** - Beautiful date picker component

## 📞 Support

If you have any questions or need help:

- Open an issue on GitHub
- Check the documentation
- Review the code examples

## 🌟 Live Demo

Visit the live application: [ToolifyLab](https://tools.praveensingh.online)

---

**Made with ❤️ using Next.js 15, React 19, TypeScript, and Tailwind CSS**
