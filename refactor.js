const fs = require('fs');
const path = require('path');

const sectionsDir = path.join(__dirname, 'src', 'components', 'sections');
const layoutDir = path.join(__dirname, 'src', 'components', 'layout');

// Regex patterns to match and replace with semantic shadcn-like tokens
const replacements = [
  // Backgrounds
  { regex: /bg-industrial-900/g, replacement: 'bg-background' },
  { regex: /bg-industrial-800/g, replacement: 'bg-card' },
  { regex: /bg-industrial-700/g, replacement: 'bg-secondary' },
  { regex: /bg-\[#0F4C81\]/g, replacement: 'bg-primary' },
  { regex: /bg-\[#F8FAFC\]/g, replacement: 'bg-background' },
  { regex: /bg-slate-900/g, replacement: 'bg-background' },
  { regex: /bg-slate-950/g, replacement: 'bg-background' },
  { regex: /bg-brand-orange/g, replacement: 'bg-primary' },
  { regex: /hover:bg-slate-800/g, replacement: 'hover:bg-muted' },
  { regex: /hover:bg-slate-100\/50/g, replacement: 'hover:bg-secondary/50' },
  { regex: /bg-slate-100/g, replacement: 'bg-secondary' },
  { regex: /bg-white\/[0-9]+/g, replacement: 'bg-card' }, // Reset white opacities to solid card or glass later
  
  // Text
  { regex: /text-white\/[2345678]0/g, replacement: 'text-muted-foreground' },
  { regex: /text-white/g, replacement: 'text-foreground' },
  { regex: /text-\[#1E293B\]/g, replacement: 'text-foreground' },
  { regex: /text-\[#4A5568\]/g, replacement: 'text-muted-foreground' },
  { regex: /text-\[#0F4C81\]/g, replacement: 'text-primary' },
  { regex: /text-brand-orange/g, replacement: 'text-primary' },
  { regex: /text-secondary/g, replacement: 'text-muted-foreground' },
  { regex: /text-tertiary/g, replacement: 'text-muted-foreground' },
  
  // Borders
  { regex: /border-white\/[0-9]+/g, replacement: 'border-border' },
  { regex: /border-slate-200\/[0-9]+/g, replacement: 'border-border' },
  { regex: /border-\[#4A5568\]/g, replacement: 'border-border' },
  { regex: /border-brand-orange/g, replacement: 'border-primary' },
  { regex: /border-tertiary/g, replacement: 'border-border' },
  
  // Shadows (Soft Shadows)
  { regex: /shadow-md/g, replacement: 'shadow-sm' },
  { regex: /shadow-xl/g, replacement: 'shadow-lg' },
  
  // Rounding (Rounded XL)
  { regex: /rounded-md/g, replacement: 'rounded-xl' },
  { regex: /rounded-lg/g, replacement: 'rounded-xl' },
  { regex: /rounded-2xl/g, replacement: 'rounded-2xl' },
  { regex: /rounded-\[2\.5rem\]/g, replacement: 'rounded-3xl' },
  
  // Gradients
  { regex: /from-industrial-900/g, replacement: 'from-background' },
  { regex: /to-industrial-800/g, replacement: 'to-card' },
];

function processDirectory(directory) {
  if (!fs.existsSync(directory)) return;
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let updated = content;
      
      replacements.forEach(({ regex, replacement }) => {
        updated = updated.replace(regex, replacement);
      });
      
      if (content !== updated) {
        fs.writeFileSync(fullPath, updated, 'utf8');
        console.log(`Updated ${file}`);
      }
    }
  });
}

processDirectory(sectionsDir);
processDirectory(layoutDir);
console.log('Semantic refactoring to Claude Enterprise completed.');
