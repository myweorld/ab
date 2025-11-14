// ==UserScript==
// @name         Agar.live Full Map Spectate
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Full map spectate system for agar.live - Refactored
// @author       TAKI-MITSUHA
// @match        https://agar.live/*
// @match        http://agar.live/*
// @icon         https://agar.live/favicon.ico
// @grant        GM_xmlhttpRequest
// @connect      localhost
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    console.log('[Userscript] Loading Agar.live Full Map...');

    // Method 1: Load from localhost (for development)
    const loadFromLocalhost = () => {
        const script = document.createElement('script');
        // Cache busting - add timestamp to force reload
        script.src = 'http://localhost:8000/bundle.js?t=' + Date.now();
        script.onload = () => {
            console.log('[Userscript] Bundle loaded from localhost');
            // Wait a bit for bundle to execute
            setTimeout(() => {
                initSpectateSystem();
            }, 100);
        };
        script.onerror = () => {
            console.error('[Userscript] Failed to load from localhost. Make sure to run: npm run serve');
        };
        document.head.appendChild(script);
    };

    // Method 2: Load from CDN (for production)
    const loadFromCDN = () => {
        const script = document.createElement('script');
        script.src = 'YOUR_CDN_URL/bundle.js'; // Update this with your CDN URL
        script.onload = () => {
            console.log('[Userscript] Bundle loaded from CDN');
            // Wait a bit for bundle to execute
            setTimeout(() => {
                initSpectateSystem();
            }, 100);
        };
        script.onerror = () => {
            console.error('[Userscript] Failed to load from CDN');
        };
        document.head.appendChild(script);
    };

    // Initialize the spectate system
    const initSpectateSystem = () => {
        // Poll for spectateSystem to be available
        let attempts = 0;
        const maxAttempts = 20; // 2 seconds max

        const checkSpectateSystem = () => {
            attempts++;

            if (typeof window.spectateSystem !== 'undefined') {
                console.log('[Userscript] SpectateSystem found!');
                addFullMapButton();
                return;
            }

            if (attempts < maxAttempts) {
                setTimeout(checkSpectateSystem, 100);
            } else {
                console.error('[Userscript] SpectateSystem not found after', maxAttempts * 100, 'ms');
                console.error('[Userscript] Make sure bundle.js loaded correctly');
            }
        };

        checkSpectateSystem();
    };

    // Add a button to the page
    const addFullMapButton = () => {
        // Wait for page to load
        setTimeout(() => {
            const button = document.createElement('button');
            button.id = 'fullMapBtn';
            button.innerText = 'Full Map (F1)';
            button.style.cssText = `
                position: fixed;
                top: 10px;
                right: 10px;
                z-index: 10000;
                padding: 10px 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                border-radius: 8px;
                font-weight: bold;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                transition: all 0.3s ease;
            `;

            button.onmouseover = () => {
                button.style.transform = 'scale(1.05)';
                button.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
            };

            button.onmouseout = () => {
                button.style.transform = 'scale(1)';
                button.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
            };

            button.onclick = async () => {
                if (window.spectateSystem && !window.spectateSystem.isActive) {
                    // Get current server from game
                    const serverUrl = getServerUrl();

                    button.disabled = true;
                    button.innerText = 'Starting...';

                    try {
                        await window.spectateSystem.start(serverUrl);
                        button.innerText = 'Full Map (Active)';
                        button.style.background = 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)';

                        console.log('[Userscript] Full Map activated!');
                    } catch (error) {
                        console.error('[Userscript] Failed to start:', error);
                        button.disabled = false;
                        button.innerText = 'Full Map (Error)';
                        button.style.background = 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)';
                    }
                } else {
                    window.spectateSystem?.stop();
                    button.disabled = false;
                    button.innerText = 'Full Map (F1)';
                    button.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                }
            };

            document.body.appendChild(button);

            // F1 hotkey
            document.addEventListener('keydown', (e) => {
                if (e.key === 'F1') {
                    e.preventDefault();
                    button.click();
                }
            });

            console.log('[Userscript] Full Map button added (press F1 or click button)');
        }, 2000);
    };

    // Try to detect server URL from the game
    const getServerUrl = () => {
        // Try to get from game's WebSocket connection
        // Default to first server
        return 'ffa1.agariodns.cyou';
    };

    // Load the bundle
    loadFromLocalhost(); // Change to loadFromCDN() for production

})();
