#!/usr/bin/env python3
"""
Simple HTTP Server for CertiChain Website
Run this script to serve the website locally
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

# Configuration
PORT = 8000
DIRECTORY = "."

class CertiChainHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_GET(self):
        # Route handling
        if self.path == '/':
            self.path = '/index.html'
        elif self.path == '/dashboard':
            self.path = '/dashboard.html'
        elif self.path == '/config':
            self.path = '/config.js'
        
        return super().do_GET()

def main():
    # Change to the script directory
    os.chdir(Path(__file__).parent)
    
    # Create server
    with socketserver.TCPServer(("", PORT), CertiChainHandler) as httpd:
        print("🚀 CertiChain server is running!")
        print(f"📱 Open your browser and navigate to:")
        print(f"   🌐 http://localhost:{PORT}")
        print(f"   🔗 http://localhost:{PORT}/dashboard")
        print("")
        print("📋 Available routes:")
        print("   / - Login/Signup page")
        print("   /dashboard - Main application dashboard")
        print("   /config - Configuration file")
        print("")
        print("💡 To stop the server, press Ctrl+C")
        print("")
        
        # Try to open browser automatically
        try:
            webbrowser.open(f'http://localhost:{PORT}')
            print("🌐 Browser opened automatically!")
        except:
            print("📱 Please open your browser manually")
        
        print("")
        
        # Start server
        httpd.serve_forever()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n👋 Server stopped. Goodbye!")
    except Exception as e:
        print(f"\n❌ Error: {e}")
        print("💡 Make sure no other service is using port 8000")
