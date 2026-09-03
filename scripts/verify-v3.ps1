$ErrorActionPreference = "Stop"

Write-Host "[1/5] Checking PostCSS configuration..."
if (Test-Path .\postcss.config.js) {
  $postcss = Get-Content .\postcss.config.js -Raw
  if ($postcss -match "tailwindcss") {
    throw "postcss.config.js still references tailwindcss"
  }
}

Write-Host "[2/5] Checking design-system tokens..."
$css = Get-Content .\src\index.css -Raw
foreach ($token in @("#F2F3F0", "#4C7A66", "#0E1411", "#79A98D", "#D28A6D")) {
  if ($css -notmatch [Regex]::Escape($token)) {
    throw "Missing design token $token"
  }
}

Write-Host "[3/5] Installing dependencies..."
npm install

Write-Host "[4/5] Building production bundle..."
npm run build

Write-Host "[5/5] Portfolio v3.1 verification complete."
Write-Host "Run: npm run dev"
