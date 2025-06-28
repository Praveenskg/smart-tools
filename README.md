# 🚀 Smart Tools - All-in-One Utility Collection

A modern, responsive web application built with Next.js 14 and TypeScript, featuring a comprehensive collection of practical tools and calculators for everyday use.

![Smart Tools](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Shadcn/ui](https://img.shields.io/badge/Shadcn/ui-2.7-000000?style=for-the-badge)

## ✨ Features

### 🏦 Financial Tools

#### **Credit Card EMI Calculator**
- Calculate monthly EMI with processing fees
- GST calculation (18%) on interest and fees
- Detailed amortization schedule
- PDF export functionality
- Interactive pie chart visualization
- Date-based EMI scheduling
- Processing fee inclusion

#### **EMI Calculator**
- Standard loan EMI calculation
- GST on interest calculation
- Amortization schedule generation
- PDF export with detailed breakdown
- Visual progress charts
- Date-based payment scheduling

#### **GST Calculator**
- Calculate GST amounts (inclusive/exclusive)
- Reverse GST calculation
- Multiple GST rates support
- Real-time calculation updates
- Clean, intuitive interface

#### **Tip Calculator**
- Restaurant tip calculation
- Bill splitting functionality
- Multiple tip percentage options
- Tax calculation support
- Per-person amount breakdown

### 📊 Planning & Tracking

#### **Goal Tracker**
- Create and manage personal goals
- Progress tracking with visual indicators
- Category-based organization
- Deadline management
- Local storage persistence
- Goal completion statistics
- Progress percentage calculation
- Days remaining/overdue tracking

### 🧮 Mathematical Tools

#### **Percentage Calculator**
- Basic percentage calculations
- Percentage increase/decrease
- Value from percentage
- Percentage of total
- Multiple calculation modes

#### **Area Calculator**
- Calculate area of various shapes:
  - Rectangle/Square
  - Triangle
  - Circle
  - Trapezoid
  - Parallelogram
- Real-time calculations
- Unit conversion support

### 📅 Date & Time Tools

#### **Age Calculator**
- Calculate exact age in years, months, days
- Precise date difference calculation
- Clean, modern interface
- Instant results

#### **Date of Birth Calculator**
- Find birth date from current age
- Reverse age calculation
- Multiple date formats

### 🏥 Health & Fitness

#### **BMI Calculator**
- Body Mass Index calculation
- Height and weight input
- BMI category classification
- Health status indicators
- Metric and imperial units

### 🔄 Conversion Tools

#### **Unit Converter**
- **Length**: mm, cm, m, km, inches, feet, yards, miles
- **Weight**: mg, g, kg, oz, lb, ton
- **Temperature**: Celsius, Fahrenheit, Kelvin
- **Area**: Square mm, cm, m, km, inches, feet, yards, acres
- Real-time conversion
- Tabbed interface for different categories

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Modern component library
- **Lucide React** - Beautiful icons

### Charts & Visualization
- **Recharts** - Composable charting library
- **Pie charts** for financial breakdowns
- **Progress bars** for goal tracking

### PDF Generation
- **jsPDF** - Client-side PDF generation
- **jspdf-autotable** - Table generation in PDFs

### Date Handling
- **date-fns** - Modern date utility library

### State Management
- **React Hooks** - useState, useEffect, useCallback, useMemo
- **Local Storage** - Client-side data persistence

## 🎨 Design Features

### Modern UI/UX
- **Responsive Design** - Works on all devices
- **Dark/Light Mode** - Theme switching capability
- **Modern Cards** - Clean, elevated design
- **Gradient Text** - Eye-catching typography
- **Smooth Animations** - Fade-in and slide effects
- **Interactive Elements** - Hover states and transitions

### Component Architecture
- **Modular Design** - Reusable components
- **Type Safety** - Full TypeScript implementation
- **Accessibility** - ARIA labels and keyboard navigation
- **Performance** - Optimized rendering and lazy loading

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** - Full-featured experience
- **Tablet** - Adaptive layout
- **Mobile** - Touch-friendly interface
- **All screen sizes** - Fluid design

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/praveenskg/smart-tools.git
   cd smart-tools
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

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
smart-tools/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Main dashboard
│   ├── components/
│   │   ├── ui/                 # Shadcn/ui components
│   │   ├── tools/              # Tool components
│   │   ├── theme-provider.tsx  # Theme context
│   │   └── theme-toggle.tsx    # Theme switcher
│   ├── hooks/                  # Custom React hooks
│   └── lib/                    # Utility functions
├── public/                     # Static assets
└── package.json               # Dependencies and scripts
```

## 🎯 Key Features

### Data Persistence
- **Local Storage** - Goals and preferences persist across sessions
- **No Server Required** - All calculations done client-side
- **Privacy First** - Data stays on your device

### Export Functionality
- **PDF Export** - Download detailed reports
- **Professional Formatting** - Clean, printable documents
- **Complete Data** - All calculations and schedules included

### Performance
- **Fast Loading** - Optimized bundle size
- **Smooth Interactions** - 60fps animations
- **Efficient Calculations** - Real-time updates

## 🔧 Customization

### Adding New Tools
1. Create a new component in `src/components/tools/`
2. Add the tool to the tools array in `src/app/page.tsx`
3. Include proper TypeScript interfaces
4. Add responsive design considerations

### Styling
- Uses Tailwind CSS for styling
- Shadcn/ui components for consistency
- Custom CSS classes for special effects


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

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Check the documentation
- Review the code examples

---

**Made with ❤️ using Next.js, TypeScript, and Tailwind CSS**
