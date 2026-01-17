# GTL Page Design Template

## Orange Hacker Theme Design System

All pages in the Google Tracking Lab follow a consistent, animated card-based design with orange accents and glowing effects.

---

## Page Structure

### 1. Use PageContent Wrapper

```tsx
import { PageContent } from "@/components/page-content"

export default function YourPage() {
  return (
    <PageContent
      title="Your Page Title"
      description="Brief description of the page content"
      status="Stable" // or "Beta" | "Draft" | "Experimental"
    >
      {/* Your content here */}
    </PageContent>
  )
}
```

### 2. Content Sections with Animations

Each major section should have:
- Animation delay classes: `animate-in fade-in slide-in-from-bottom-4 duration-700 delay-[100-600ms]`
- Proper spacing: `mb-8` or `mb-12` between sections

---

## Design Components

### Hero/Important Sections

```tsx
<div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
  <div className="border-gradient">
    <div className="border-gradient-content glass-strong p-8 md:p-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-lg bg-[#FF6D00]/10 border border-[#FF6D00]/30 pulse-glow">
          <Icon className="h-6 w-6 text-[#FF6D00]" />
        </div>
        <h2 className="font-mono text-2xl md:text-3xl font-bold text-shimmer">
          Section Title
        </h2>
      </div>
      
      <p className="mb-6 text-base md:text-lg text-[#8b949e] leading-relaxed">
        Section description...
      </p>
      
      {/* Content cards */}
    </div>
  </div>
</div>
```

### Section Headers

```tsx
<div className="flex items-center gap-3 mb-8">
  <div className="h-1 w-12 bg-gradient-to-r from-[#FF6D00] to-[#4285F4] rounded-full"></div>
  <h2 className="font-mono text-2xl font-bold text-[#e8f4f8]">
    Section Title
  </h2>
  <div className="h-1 flex-1 bg-gradient-to-r from-[#4285F4] to-transparent rounded-full"></div>
</div>
```

### Animated Cards

```tsx
<div className="border-animated glass-strong rounded-2xl p-6 hover-glow group">
  <div className="flex items-start gap-4 mb-4">
    <div className="p-3 rounded-xl bg-gradient-to-br from-[#FF6D00]/20 to-[#4285F4]/20 border border-[#FF6D00]/30 group-hover:scale-110 transition-transform">
      <Icon className="h-6 w-6 text-[#FF6D00]" />
    </div>
    <div>
      <h3 className="font-mono text-lg font-bold text-[#e8f4f8] mb-2">
        Card Title
      </h3>
      <span className="text-xs font-mono text-[#8b949e] bg-[#0d1117] px-2 py-1 rounded">
        LABEL
      </span>
    </div>
  </div>
  
  <p className="text-sm text-[#8b949e] mb-4 leading-relaxed">
    Card description...
  </p>
  
  {/* Card content */}
</div>
```

### Info/Feature Cards

```tsx
<div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20 group">
  <div className="flex items-center gap-3 mb-3">
    <div className="p-2 rounded-lg bg-[#FF6D00]/10 group-hover:bg-[#FF6D00]/20 transition-colors">
      <Icon className="h-5 w-5 text-[#FF6D00] icon-spin-hover" />
    </div>
    <span className="font-mono font-semibold text-[#FF6D00]">Feature Name</span>
  </div>
  <p className="text-sm text-[#8b949e]">
    Feature description
  </p>
</div>
```

### Code Blocks

```tsx
<div className="code-block">
  <pre className="text-sm font-mono text-[#FF6D00] overflow-x-auto">
{`your code here`}
  </pre>
</div>
```

### Alert/Notice Boxes

#### Info Box
```tsx
<div className="glass-strong rounded-2xl p-6 border border-[#4285F4]/30">
  <div className="flex items-start gap-3">
    <div className="p-2 rounded-lg bg-[#4285F4]/10 border border-[#4285F4]/30 mt-0.5">
      <Info className="h-5 w-5 text-[#4285F4]" />
    </div>
    <div>
      <h4 className="font-mono font-semibold text-[#4285F4] mb-2">Info Title</h4>
      <p className="text-sm text-[#8b949e]">Info content...</p>
    </div>
  </div>
</div>
```

#### Warning Box
```tsx
<div className="glass-strong rounded-2xl p-6 border border-[#FBBC04]/30">
  <div className="flex items-start gap-3">
    <div className="p-2 rounded-lg bg-[#FBBC04]/10 border border-[#FBBC04]/30 mt-0.5">
      <AlertTriangle className="h-5 w-5 text-[#FBBC04]" />
    </div>
    <div>
      <h4 className="font-mono font-semibold text-[#FBBC04] mb-2">Warning Title</h4>
      <p className="text-sm text-[#8b949e]">Warning content...</p>
    </div>
  </div>
</div>
```

#### Error Box
```tsx
<div className="glass rounded-xl p-5 border border-[#EA4335]/30 bg-[#EA4335]/5">
  <div className="flex items-start gap-3">
    <AlertTriangle className="h-5 w-5 text-[#EA4335] flex-shrink-0 mt-0.5" />
    <div>
      <h4 className="font-mono font-semibold text-[#EA4335] mb-2">Error Title</h4>
      <p className="text-sm text-[#8b949e]">Error content...</p>
    </div>
  </div>
</div>
```

### Navigation Links

```tsx
<Link href="/path">
  <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/30 flex items-center justify-between cursor-pointer group">
    <div>
      <h3 className="font-mono font-semibold text-[#FF6D00] mb-1">Link Title</h3>
      <p className="text-xs text-[#8b949e]">Link description</p>
    </div>
    <ArrowRight className="h-5 w-5 text-[#FF6D00] group-hover:translate-x-1 transition-transform" />
  </div>
</Link>
```

### Buttons

#### Primary (Neon Orange)
```tsx
<div className="button-neon rounded-lg px-5 py-3 flex items-center gap-3 cursor-pointer">
  <Icon className="h-4 w-4" />
  <span className="font-mono text-sm">Button Text</span>
</div>
```

#### Ghost (Outline)
```tsx
<button className="button-ghost-orange rounded-lg px-4 py-2 text-sm font-mono flex items-center gap-2">
  <Icon className="h-4 w-4" />
  Button Text
</button>
```

---

## Color Palette

### Google Colors
- **Orange (Primary)**: `#FF6D00` - Main accent color
- **Orange Light**: `#FFB74D` - Hover/lighter variants
- **Orange Dark**: `#E65100` - Darker variants
- **Blue**: `#4285F4` - Google Blue
- **Green**: `#34A853` - Success/positive
- **Yellow**: `#FBBC04` - Warning
- **Red**: `#EA4335` - Error/danger

### Hacker Theme Colors
- **Background Primary**: `#0a0e1a`
- **Background Secondary**: `#0f1419`
- **Background Card**: `#151b26`
- **Text Primary**: `#e8f4f8`
- **Text Secondary**: `#8b949e`
- **Accent Tertiary**: `#ff006e` (Pink accent)

---

## Custom CSS Classes

### Glass Effects
- `.glass` - Standard glassmorphism
- `.glass-strong` - Stronger glass effect
- `.glass-subtle` - Subtle glass effect

### Animations
- `.pulse-glow` - Pulsing glow animation
- `.hover-glow` - Glow on hover
- `.hover-lift` - Lift effect on hover
- `.hover-scale` - Scale up on hover
- `.icon-spin-hover` - Rotate icon on hover
- `.text-shimmer` - Animated gradient text

### Borders
- `.border-gradient` - Gradient border wrapper
- `.border-animated` - Animated rotating border

### Code
- `.code-block` - Styled code block container

### Buttons
- `.button-neon` - Orange neon button
- `.button-ghost-orange` - Orange outline button

---

## Animation Delays

Use staggered delays for multiple sections:
- First section: No delay or `delay-100`
- Second section: `delay-200`
- Third section: `delay-300`
- Fourth section: `delay-[400ms]`
- Fifth section: `delay-[500ms]`
- Sixth section: `delay-[600ms]`

---

## Grid Layouts

### 2 Columns
```tsx
<div className="grid gap-6 md:grid-cols-2">
  {/* Cards */}
</div>
```

### 3 Columns (rare)
```tsx
<div className="grid gap-4 md:grid-cols-3">
  {/* Cards */}
</div>
```

---

## List Items

```tsx
<div className="space-y-2">
  <div className="flex items-start gap-2">
    <span className="text-[#FF6D00] font-mono mt-0.5">›</span>
    <span className="text-sm text-[#8b949e]">List item text</span>
  </div>
</div>
```

### Checkmarks
```tsx
<div className="flex items-start gap-2">
  <span className="text-[#34A853] font-mono mt-0.5">✓</span>
  <span className="text-sm text-[#8b949e]">Completed item</span>
</div>
```

### X marks
```tsx
<div className="flex items-start gap-2">
  <XCircle className="h-5 w-5 text-[#EA4335] flex-shrink-0 mt-0.5" />
  <span className="text-sm text-[#8b949e]">Issue item</span>
</div>
```

---

## Best Practices

1. **Always use PageContent wrapper** - Maintains consistent width and padding
2. **Apply animations** - Each section should fade/slide in with staggered delays
3. **Use icons** - Every card/section should have a relevant icon with appropriate color
4. **Hover effects** - Cards should have hover effects (lift, glow, scale)
5. **Color consistency** - Use the defined color palette, especially orange as primary
6. **Font families** - Use `font-mono` for headings and code
7. **Spacing** - Use `mb-8` or `mb-12` between major sections
8. **Responsive** - Always include responsive variants (`md:`, `lg:`)
9. **Glass effects** - Use glass components for depth and visual interest
10. **Code blocks** - Always use `.code-block` class for code examples

---

## Example Page Structure

```tsx
"use client"

import { PageContent } from "@/components/page-content"
import { Icon1, Icon2, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function YourPage() {
  return (
    <PageContent
      title="Page Title"
      description="Page description"
      status="Stable"
    >
      
      {/* Hero Section */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Hero content */}
      </div>

      {/* Main Content Section 1 */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        {/* Section 1 content */}
      </div>

      {/* Main Content Section 2 */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
        {/* Section 2 content */}
      </div>

      {/* Next Steps */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        <div className="glass-strong rounded-2xl p-8 border border-[#FF6D00]/20">
          <h2 className="font-mono text-2xl font-bold text-[#e8f4f8] mb-6">
            Next Steps
          </h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            {/* Navigation links */}
          </div>
        </div>
      </div>

    </PageContent>
  )
}
```

---

## Icons from lucide-react

Commonly used icons:
- `CheckCircle2` - Success, completed
- `XCircle` - Error, issue
- `AlertTriangle` - Warning
- `Info` - Information
- `Code` - Code examples
- `Server` - Server-side
- `Globe` - Client-side/browser
- `Zap` - Fast/powerful features
- `Target` - Accuracy/targeting
- `Activity` - Events/analytics
- `Shield` - Security/privacy
- `Key` - Authentication/credentials
- `Settings` - Configuration
- `Sparkles` - New/special features
- `ArrowRight` - Navigation links

---

This design system ensures consistency across all pages while maintaining the distinctive orange hacker aesthetic!
