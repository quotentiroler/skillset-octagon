const sharp = require('sharp');
const toIco = require('to-ico');
const fs = require('fs');
const path = require('path');

async function generateFavicon() {
  try {
    console.log('🎯 Generating proper favicon.ico...');
    
    // Create PNG buffers from SVG at different sizes
    const sizes = [16, 32, 48];
    const buffers = [];
    
    for (const size of sizes) {
      console.log(`📐 Creating ${size}x${size} icon...`);
      const buffer = await sharp('public/favicon.svg')
        .resize(size, size)
        .png()
        .toBuffer();
      buffers.push(buffer);
    }
    
    // Convert to ICO
    console.log('🔄 Converting to ICO format...');
    const icoBuffer = await toIco(buffers);
    
    // Write to file
    fs.writeFileSync('public/favicon.ico', icoBuffer);
    
    console.log('✅ favicon.ico generated successfully!');
    console.log('📁 File size:', fs.statSync('public/favicon.ico').size, 'bytes');
    
  } catch (error) {
    console.error('❌ Error generating favicon:', error.message);
    
    // Fallback: Create a simple base64 encoded favicon
    console.log('🔄 Creating fallback favicon...');
    createFallbackFavicon();
  }
}

function createFallbackFavicon() {
  // Simple 16x16 ICO file with octagon pattern (base64 encoded)
  const icoBase64 = `AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABILAAASCwAAAAAAAAAAAAA7fPYAO3z2ADt89gA7fPYAO3z2ADt89gA7fPYAO3z2ADt89gA7fPYAO3z2ADt89gA7fPYAO3z2ADt89gA7fPYAO3z2K2zx/its8f8rbPH/K2zx/yt89gA7fPYAO3z2ADt89gA7fPYAO3z2ADt89gA7fPYAO3z2ADt89gA7fPYAK2zx/2zx//9s8f//bPH//2zx//8rbPH/O3z2ADt89gA7fPYAO3z2ADt89gA7fPYAO3z2ADt89gArbPH/bPH//2zx//9s8f//bPH//2zx//9s8f//K2zx/zt89gA7fPYAO3z2ADt89gA7fPYAO3z2ACts8f9s8f//bPH//2zx//9s8f//bPH//2zx//9s8f//bPH//yts8f87fPYAO3z2ADt89gA7fPYAK2zx/2zx//9s8f//bPH//2zx//9s8f//bPH//2zx//9s8f//bPH//2zx//8rbPH/O3z2ADt89gArbPH/bPH//2zx//9s8f//bPH//2zx//9s8f//bPH//2zx//9s8f//bPH//2zx//9s8f//K2zx/zt89gArbPH/bPH//2zx//9s8f//bPH//2zx//9s8f//bPH//2zx//9s8f//bPH//2zx//9s8f//K2zx/zt89gArbPH/bPH//2zx//9s8f//bPH//2zx//9s8f//bPH//2zx//9s8f//bPH//2zx//9s8f//K2zx/zt89gArbPH/bPH//2zx//9s8f//bPH//2zx//9s8f//bPH//2zx//9s8f//bPH//2zx//9s8f//K2zx/zt89gArbPH/bPH//2zx//9s8f//bPH//2zx//9s8f//bPH//2zx//9s8f//bPH//2zx//9s8f//K2zx/zt89gA7fPYAK2zx/2zx//9s8f//bPH//2zx//9s8f//bPH//2zx//9s8f//bPH//2zx//8rbPH/O3z2ADt89gA7fPYAO3z2ACts8f9s8f//bPH//2zx//9s8f//bPH//2zx//9s8f//bPH//yts8f87fPYAO3z2ADt89gA7fPYAO3z2ADt89gArbPH/bPH//2zx//9s8f//bPH//2zx//8rbPH/O3z2ADt89gA7fPYAO3z2ADt89gA7fPYAO3z2ADt89gA7fPYAK2zx/2zx//9s8f//bPH//yts8f87fPYAO3z2ADt89gA7fPYAO3z2ADt89gA7fPYAO3z2ADt89gA7fPYAO3z2ACts8f8rbPH/K2zx/zt89gA7fPYAO3z2ADt89gA7fPYAO3z2ADt89gA7fPYAO3z2ADt89gA7fPYAO3z2ADt89gA7fPYAO3z2ADt89gA7fPYAO3z2ADt89gA7fPYAO3z2ADt89gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`;
  
  const buffer = Buffer.from(icoBase64, 'base64');
  fs.writeFileSync('public/favicon.ico', buffer);
  
  console.log('✅ Fallback favicon.ico created!');
}

generateFavicon();