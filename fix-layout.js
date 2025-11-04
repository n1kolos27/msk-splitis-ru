const fs = require('fs');
const path = require('path');

function fixLayouts(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      fixLayouts(fullPath);
    } else if (file.name.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      const originalContent = content;
      
      // Исправляем layout: "page.html" на layout: page.html
      content = content.replace(/layout:\s*"page\.html"/g, 'layout: page.html');
      content = content.replace(/layout:\s*'page\.html'/g, 'layout: page.html');
      
      // Исправляем неправильные пути к layout
      content = content.replace(/layout:\s*src\/_layouts\/page\.html/g, 'layout: page.html');
      content = content.replace(/layout:\s*"src\/_layouts\/page\.html"/g, 'layout: page.html');
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf-8');
        console.log(`Fixed: ${fullPath}`);
      }
    }
  }
}

console.log('Fixing layouts...');
fixLayouts('src/pages');
console.log('Done!');

