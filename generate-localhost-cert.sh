# Generate SSL certificate for localhost using mkcert
# For Linux/Mac systems
# mkcert creates trusted certificates (no browser warnings!)

set -e

DOMAIN="localhost"
CERTS_DIR="./certs"
KEY_FILE="$CERTS_DIR/$DOMAIN.key"
CERT_FILE="$CERTS_DIR/$DOMAIN.crt"

echo "============================================"
echo "Generating SSL certificate for $DOMAIN"
echo "Using mkcert (trusted certificates)"
echo "============================================"

# Check for mkcert
if ! command -v mkcert &> /dev/null; then
    echo ""
    echo "✗ mkcert not found!"
    echo ""
    echo "Install mkcert:"
    echo "  macOS: brew install mkcert"
    echo "  Linux: See https://github.com/FiloSottile/mkcert#installation"
    echo ""
    exit 1
fi

# Create certificates directory
if [ ! -d "$CERTS_DIR" ]; then
    mkdir -p "$CERTS_DIR"
    echo "✓ Directory created: $CERTS_DIR"
fi

# Check if certificate already exists
if [ -f "$KEY_FILE" ] && [ -f "$CERT_FILE" ]; then
    echo ""
    echo "⚠ Certificate already exists:"
    echo "  $KEY_FILE"
    echo "  $CERT_FILE"
    read -p "Regenerate certificate? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Using existing certificate"
        exit 0
    fi
    
    # Remove old certificates
    rm -f "$KEY_FILE" "$CERT_FILE"
    echo "Old certificates removed"
fi

# Check if mkcert CA is installed
if ! mkcert -CAROOT &> /dev/null; then
    echo ""
    echo "Installing mkcert local CA..."
    mkcert -install
    echo ""
fi

# Generate certificate using mkcert
echo ""
echo "Generating trusted certificate..."

cd "$CERTS_DIR"

# Generate certificate for localhost, 127.0.0.1, and ::1
mkcert localhost 127.0.0.1 ::1

# mkcert creates files with format: localhost+2.pem and localhost+2-key.pem
# Rename them to localhost.crt and localhost.key
if [ -f "localhost+2.pem" ] && [ -f "localhost+2-key.pem" ]; then
    mv "localhost+2.pem" "localhost.crt"
    mv "localhost+2-key.pem" "localhost.key"
    echo ""
    echo "✓ Certificate created successfully!"
else
    echo ""
    echo "✗ Certificate files not found after generation"
    exit 1
fi

cd ..

echo ""
echo "Files:"
echo "  Key:  $KEY_FILE"
echo "  Certificate: $CERT_FILE"
echo ""
echo "Valid for: localhost, 127.0.0.1, ::1"
echo ""
echo "✓ This is a TRUSTED certificate!"
echo "  No browser warnings!"
echo ""
echo "To use:"
echo "  1. Start server: npm run server:https"
echo "  2. Open: https://localhost:5443"
echo "  3. Enjoy HTTPS without warnings!"
echo ""