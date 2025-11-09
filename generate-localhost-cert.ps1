# Generate SSL certificate for localhost (PowerShell)
# For Windows systems

$ErrorActionPreference = "Stop"

$DOMAIN = "localhost"
$CERTS_DIR = ".\certs"
$KEY_FILE = "$CERTS_DIR\$DOMAIN.key"
$CERT_FILE = "$CERTS_DIR\$DOMAIN.crt"

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Generating SSL certificate for $DOMAIN" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan

# Create certificates directory
if (-not (Test-Path $CERTS_DIR)) {
    New-Item -ItemType Directory -Path $CERTS_DIR -Force | Out-Null
    Write-Host "Directory created: $CERTS_DIR" -ForegroundColor Green
}

# Check for OpenSSL
$opensslPath = Get-Command openssl -ErrorAction SilentlyContinue
if (-not $opensslPath) {
    # Try to find OpenSSL in Git
    $gitOpenSSL = "C:\Program Files\Git\usr\bin\openssl.exe"
    if (Test-Path $gitOpenSSL) {
        Write-Host "Found OpenSSL in Git: $gitOpenSSL" -ForegroundColor Green
        $env:Path = "$env:Path;C:\Program Files\Git\usr\bin"
        $opensslPath = Get-Command openssl -ErrorAction SilentlyContinue
    }
    
    if (-not $opensslPath) {
        Write-Host ""
        Write-Host "OpenSSL not found!" -ForegroundColor Red
        Write-Host ""
        Write-Host "Install OpenSSL:" -ForegroundColor Yellow
        Write-Host "1. Install Git for Windows (includes OpenSSL)" -ForegroundColor Gray
        Write-Host "   https://git-scm.com/download/win" -ForegroundColor DarkGray
        Write-Host "2. Via Chocolatey: choco install openssl" -ForegroundColor Gray
        Write-Host "3. Download from: https://slproweb.com/products/Win32OpenSSL.html" -ForegroundColor Gray
        Write-Host ""
        Write-Host "Or use mkcert (recommended):" -ForegroundColor Yellow
        Write-Host "  choco install mkcert" -ForegroundColor Gray
        Write-Host "  mkcert -install" -ForegroundColor Gray
        Write-Host "  mkcert localhost 127.0.0.1 ::1" -ForegroundColor Gray
        exit 1
    }
}

# Check if certificate already exists
if ((Test-Path $KEY_FILE) -and (Test-Path $CERT_FILE)) {
    Write-Host ""
    Write-Host "Certificate already exists:" -ForegroundColor Yellow
    Write-Host "  $KEY_FILE"
    Write-Host "  $CERT_FILE"
    $response = Read-Host "Regenerate certificate? (y/n)"
    if ($response -ne "y" -and $response -ne "Y") {
        Write-Host "Using existing certificate" -ForegroundColor Green
        exit 0
    }
}

# Generate self-signed certificate
Write-Host ""
Write-Host "Generating new certificate..." -ForegroundColor Yellow

# Create OpenSSL config file
$OPENSSL_CONFIG = "$CERTS_DIR\openssl.conf"
$configContent = @"
[req]
distinguished_name = req_distinguished_name
req_extensions = v3_req
prompt = no

[req_distinguished_name]
C = RU
ST = Moscow
L = Moscow
O = Development
CN = $DOMAIN

[v3_req]
basicConstraints = CA:FALSE
keyUsage = digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth, clientAuth
subjectAltName = @alt_names

[alt_names]
DNS.1 = $DOMAIN
DNS.2 = *.$DOMAIN
IP.1 = 127.0.0.1
IP.2 = ::1
"@

$configContent | Out-File -FilePath $OPENSSL_CONFIG -Encoding ASCII -NoNewline

try {
    # Generate private key
    $keyResult = & openssl genrsa -out $KEY_FILE 2048 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to generate private key: $keyResult"
    }
    
    if (-not (Test-Path $KEY_FILE)) {
        throw "Private key file not created"
    }
    
    # Generate self-signed certificate with extensions in one step
    # Using -x509 flag to create self-signed cert directly
    $certResult = & openssl req -new -x509 -key $KEY_FILE -out $CERT_FILE -days 365 -config $OPENSSL_CONFIG -extensions v3_req 2>&1
    
    # Check if certificate file was created successfully
    Start-Sleep -Milliseconds 300
    if (-not (Test-Path $CERT_FILE)) {
        Write-Host "OpenSSL output: $certResult" -ForegroundColor Yellow
        throw "Certificate file not created"
    }
    
    $certSize = (Get-Item $CERT_FILE).Length
    if ($certSize -eq 0) {
        throw "Certificate file is empty"
    }
    
    # Remove temporary config
    Remove-Item $OPENSSL_CONFIG -Force -ErrorAction SilentlyContinue
    
    Write-Host ""
    Write-Host "Certificate created successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Files:" -ForegroundColor Cyan
    Write-Host "  Key:  $KEY_FILE"
    Write-Host "  Certificate: $CERT_FILE"
    Write-Host ""
    Write-Host "Valid for: 365 days" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Note: This is a self-signed certificate!" -ForegroundColor Yellow
    Write-Host "  Browser will show security warning." -ForegroundColor Yellow
    Write-Host "  This is normal for local development." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To use:" -ForegroundColor Cyan
    Write-Host "  1. Start server: npm run server:https" -ForegroundColor Gray
    Write-Host "  2. Open: https://localhost:5443" -ForegroundColor Gray
    Write-Host "  3. Accept browser warning" -ForegroundColor Gray
    Write-Host ""
}
catch {
    Write-Host ""
    Write-Host "Error creating certificate: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Try:" -ForegroundColor Yellow
    Write-Host "  1. Check OpenSSL: openssl version" -ForegroundColor Gray
    Write-Host "  2. Run PowerShell as Administrator" -ForegroundColor Gray
    exit 1
}