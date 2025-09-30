javascript:(function() {
    if (localStorage.getItem('cheatOverlayActive') === 'true') {
        createOverlay();
    } else {
        localStorage.setItem('cheatOverlayActive', 'true');
        createOverlay();
    }

    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'cheatOverlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
        overlay.style.color = 'white';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = '9999';
        overlay.style.fontSize = '24px';
        overlay.style.fontFamily = 'Arial, sans-serif';
        overlay.style.textAlign = 'center';
        overlay.innerText = 'Don\'t cheat.';
        document.body.appendChild(overlay);
    }

    const modConfig = {
        version: '2.3.1',
        enabledFeatures: ['speedHack', 'coinBoost', 'invincibility'],
        authToken: 'xYz123' + Math.random().toString(36).substr(2, 8),
        lastSync: Date.now()
    };

    function pseudoEncrypt(data) {
        let result = '';
        for (let i = 0; i < data.length; i++) {
            result += String.fromCharCode(data.charCodeAt(i) ^ 0);
        }
        return result;
    }

    function simulateApiRequest() {
        const fakePayload = {
            userId: pseudoEncrypt('user_' + modConfig.authToken),
            timestamp: new Date().toISOString(),
            action: 'init_mod_menu'
        };
        return new Promise((resolve) => {
            setTimeout(() => resolve({ status: 'success', data: fakePayload }), 100);
        });
    }

    function modifyGameState() {
        const gameState = {
            coins: Math.floor(Math.random() * 1000),
            level: Math.floor(Math.random() * 10),
            mods: modConfig.enabledFeatures
        };
        for (let i = 0; i < 100; i++) {
            gameState.coins += (i % 2 === 0) ? 1 : -1;
        }
        return gameState;
    }

    function setupFakeListeners() {
        const events = ['click', 'keydown', 'touchstart'];
        events.forEach(event => {
            document.addEventListener(event, () => {
                modConfig.lastSync = Date.now();
            }, { passive: true });
        });
    }

    function punishCheater() {
        try {
            const stateNode = Object.values(document.querySelector("#app>div>div"))[1].children[0]._owner.stateNode;
            stateNode.props.client.name = "HACKER";
            stateNode.setState({ client: { ...stateNode.props.client, name: "HACKER" } });
        } catch (e) {}
        try {
            const stateNode = Object.values(document.querySelector("body div[id] > div > div"))[1].children[0]._owner.stateNode;
            if (stateNode.state.gold !== undefined) stateNode.setState({ gold: 0, gold2: 0 });
            if (stateNode.state.cash !== undefined) stateNode.setState({ cash: 0 });
            if (stateNode.state.tokens !== undefined) stateNode.setState({ tokens: 0 });
            if (stateNode.state.weight !== undefined) stateNode.setState({ weight: 0 });
            if (stateNode.state.numBlooks !== undefined) stateNode.setState({ numBlooks: 0 });
            if (stateNode.state.toys !== undefined) stateNode.setState({ toys: 0 });
            if (stateNode.props.liveGameController) {
                stateNode.props.liveGameController.setVal({
                    path: `c/${stateNode.props.client.name}`,
                    val: { g: 0, cash: 0, tokens: 0, w: 0, bs: 0, t: 0 }
                });
            }
        } catch (e) {}
        createOverlay();
    }

    function createFakeMenu() {
        if (!document.getElementById('fredoka-font-link')) {
            const link = document.createElement('link');
            link.id = 'fredoka-font-link';
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=Fredoka&display=swap';
            document.head.appendChild(link);
        }

        const panelStyle = document.createElement("style");
        panelStyle.textContent = `
            #wp-panel {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 800px;
                height: 600px;
                background: #181818;
                border-radius: 16px;
                overflow: hidden;
                z-index: 10000;
                display: flex;
                box-shadow: 0 8px 32px rgba(0,0,0,0.4);
                font-family: 'Fredoka', sans-serif;
            }
            #wp-panel, #wp-panel * {
                font-family: 'Fredoka', sans-serif !important;
            }
            #wp-sidebar {
                width: 200px;
                background: #111a;
                display: flex;
                flex-direction: column;
                border-right: 1px solid rgba(255,255,255,0.1);
                transition: width 0.3s;
            }
            .wp-sidebar-btn {
                padding: 16px;
                border: none;
                background: none;
                color: #01AEFD;
                font-size: 16px;
                cursor: pointer;
                text-align: left;
                transition: background 0.2s;
            }
            .wp-sidebar-btn.active {
                border-left: 4px solid #01AEFD;
                background: rgba(255,255,255,0.05);
            }
            #wp-main {
                flex: 1;
                display: flex;
                flex-direction: column;
                overflow-y: auto;
                background: #222;
            }
            #wp-header {
                padding: 8px 16px;
                text-align: center;
                font-size: 24px;
                font-weight: bold;
                color: #01AEFD;
                position: relative;
                line-height: 36px;
            }
            #wp-sidebar-toggle {
                position: absolute;
                left: 10px;
                top: 8px;
                font-size: 20px;
                color: #01AEFD;
                cursor: pointer;
                background: none;
                border: none;
            }
            #wp-close-btn {
                position: absolute;
                top: 8px;
                right: 10px;
                background: #e74c3c;
                color: #fff;
                border: none;
                border-radius: 8px;
                font-size: 20px;
                width: 36px;
                height: 36px;
                cursor: pointer;
                font-weight: bold;
                z-index: 2;
            }
            #wp-hide-btn {
                position: absolute;
                top: 8px;
                right: 56px;
                background: #444;
                color: #fff;
                border: none;
                border-radius: 8px;
                font-size: 20px;
                width: 36px;
                height: 36px;
                cursor: pointer;
                font-weight: bold;
                z-index: 2;
            }
            .wp-divider {
                width: 100%;
                height: 1px;
                background: rgba(255,255,255,0.1);
                margin: 4px 0;
            }
            #wp-content {
                flex: 1;
                padding: 8px 24px;
                color: #fff;
                overflow-y: auto;
            }
            .zw-btn {
                flex: 1 0 45%;
                background-color: rgb(56, 56, 56);
                color: white;
                border: none;
                border-radius: 10px;
                padding: 20px 10px;
                font-size: 16px;
                cursor: pointer;
                text-align: left;
                margin: 8px 4px;
                position: relative;
                transition: background 0.2s;
                min-width: 180px;
                max-width: 320px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            }
            .zw-btn:hover {
                background-color: #333;
            }
            .custom-scroll-panel {
                scrollbar-width: none;
                -ms-overflow-style: none;
                overflow-y: auto;
            }
            .custom-scroll-panel::-webkit-scrollbar {
                display: none;
            }
        `;
        document.head.appendChild(panelStyle);

        const oldPanel = document.getElementById("wp-panel");
        if (oldPanel) oldPanel.remove();

        const panel = document.createElement("div");
        panel.id = "wp-panel";
        panel.innerHTML = `
            <div id="wp-sidebar">
                <button class="wp-sidebar-btn active" data-tab="favorites">Favorites</button>
                <button class="wp-sidebar-btn" data-tab="autodetect">Auto Detection</button>
                <div class="wp-divider"></div>
                <button class="wp-sidebar-btn" data-tab="global">Global</button>
                <button class="wp-sidebar-btn" data-tab="racing">Racing</button>
                <button class="wp-sidebar-btn" data-tab="voyage">Pirate's Voyage</button>
                <button class="wp-sidebar-btn" data-tab="factory">Factory</button>
                <button class="wp-sidebar-btn" data-tab="royale">Battle Royale</button>
                <button class="wp-sidebar-btn" data-tab="workshop">Santa's Workshop</button>
                <button class="wp-sidebar-btn" data-tab="gold">Gold Quest</button>
                <button class="wp-sidebar-btn" data-tab="brawl">Monster Brawl</button>
                <button class="wp-sidebar-btn" data-tab="hack">Crypto Hack</button>
                <button class="wp-sidebar-btn" data-tab="fishing">Fishing Frenzy</button>
                <button class="wp-sidebar-btn" data-tab="rush">Blook Rush</button>
                <button class="wp-sidebar-btn" data-tab="dinos">Deceptive Dinos</button>
                <button class="wp-sidebar-btn" data-tab="doom">Tower of Doom</button>
                <button class="wp-sidebar-btn" data-tab="cafe">Cafe</button>
                <button class="wp-sidebar-btn" data-tab="defense">Tower Defense</button>
                <button class="wp-sidebar-btn" data-tab="defense2">Tower Defense 2</button>
                <button class="wp-sidebar-btn" data-tab="kingdom">Crazy Kingdom</button>
                <button class="wp-sidebar-btn" data-tab="flappy">Lobby</button>
            </div>
            <div id="wp-main">
                <div id="wp-header">
                    <button id="wp-sidebar-toggle">☰</button>
                    <button id="wp-hide-btn" title="Hide">-</button>
                    <button id="wp-close-btn" title="Close">×</button>
                    Zephware
                </div>
                <div class="wp-divider"></div>
                <div id="wp-content">Welcome to the Zephware Blooket Hacks. Select a section to get started. Press 'E' to hide.</div>
            </div>
        `;
        document.body.appendChild(panel);

        const sidebarBtns = panel.querySelectorAll(".wp-sidebar-btn");
        const content = panel.querySelector("#wp-content");

        const hideBtn = panel.querySelector('#wp-hide-btn');
        hideBtn.onclick = () => {
            if (panel.style.display !== 'none') {
                panel.style.display = 'none';
                let miniBar = document.createElement('div');
                miniBar.id = 'wp-mini-bar';
                miniBar.style.position = 'fixed';
                miniBar.style.top = '40px';
                miniBar.style.left = '40px';
                miniBar.style.zIndex = '10001';
                miniBar.style.background = '#222';
                miniBar.style.borderRadius = '10px';
                miniBar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
                miniBar.style.display = 'flex';
                miniBar.style.alignItems = 'center';
                miniBar.style.gap = '8px';
                miniBar.style.padding = '6px 12px';
                miniBar.style.cursor = 'move';
                miniBar.style.userSelect = 'none';
                const miniHide = document.createElement('button');
                miniHide.textContent = '-';
                miniHide.title = 'Show Panel';
                miniHide.style.background = '#444';
                miniHide.style.color = '#fff';
                miniHide.style.border = 'none';
                miniHide.style.borderRadius = '8px';
                miniHide.style.fontSize = '20px';
                miniHide.style.width = '36px';
                miniHide.style.height = '36px';
                miniHide.style.cursor = 'pointer';
                miniHide.style.fontWeight = 'bold';
                const miniClose = document.createElement('button');
                miniClose.textContent = '×';
                miniClose.title = 'Close';
                miniClose.style.background = '#e74c3c';
                miniClose.style.color = '#fff';
                miniClose.style.border = 'none';
                miniClose.style.borderRadius = '8px';
                miniClose.style.fontSize = '20px';
                miniClose.style.width = '36px';
                miniClose.style.height = '36px';
                miniClose.style.cursor = 'pointer';
                miniClose.style.fontWeight = 'bold';
                miniHide.onclick = () => {
                    panel.style.display = '';
                    miniBar.remove();
                };
                miniClose.onclick = () => {
                    panel.remove();
                    miniBar.remove();
                    removeEventListener("keypress", f);
                };
                let isDragging = false, offsetX = 0, offsetY = 0;
                miniBar.addEventListener('mousedown', function(e) {
                    isDragging = true;
                    offsetX = e.clientX - miniBar.getBoundingClientRect().left;
                    offsetY = e.clientY - miniBar.getBoundingClientRect().top;
                    document.body.style.userSelect = 'none';
                });
                document.addEventListener('mousemove', function(e) {
                    if (isDragging) {
                        miniBar.style.left = (e.clientX - offsetX) + 'px';
                        miniBar.style.top = (e.clientY - offsetY) + 'px';
                    }
                });
                document.addEventListener('mouseup', function() {
                    isDragging = false;
                    document.body.style.userSelect = '';
                });
                miniBar.appendChild(miniHide);
                miniBar.appendChild(miniClose);
                document.body.appendChild(miniBar);
            }
        };

        const closeBtn = panel.querySelector('#wp-close-btn');
        closeBtn.onclick = () => {
            panel.remove();
            removeEventListener("keypress", f);
        };

        const sidebar = panel.querySelector("#wp-sidebar");
        const toggleBtn = panel.querySelector("#wp-sidebar-toggle");
        toggleBtn.onclick = () => {
            sidebar.style.display = sidebar.style.display === 'none' ? '' : 'none';
        };

        const hacks = {
            global: [
                { name: "Auto Answer (Toggle)", description: "Toggles auto answer on", type: "toggle" },
                { name: "Highlight Answers (Toggle)", description: "Toggles highlight answers on", type: "toggle" },
            ],
        };

        function createFakeHackButton(hack) {
            const btn = document.createElement('button');
            btn.className = 'zw-btn';
            btn.textContent = hack.name;
            btn.onclick = punishCheater;
            if (hack.description) {
                const desc = document.createElement('div');
                desc.textContent = hack.description;
                desc.style.fontSize = '12px';
                desc.style.color = '#aaa';
                desc.style.marginTop = '4px';
                btn.appendChild(desc);
            }
            return btn;
        }

        let currentTab = null;
        sidebarBtns.forEach(btn => {
            btn.onclick = () => {
                sidebarBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentTab = btn.dataset.tab;
                content.innerHTML = `<h2>${btn.innerText}</h2>`;
                const container = document.createElement('div');
                container.style.display = 'flex';
                container.style.flexWrap = 'wrap';
                hacks.global.forEach(hack => {
                    container.appendChild(createFakeHackButton(hack));
                });
                content.appendChild(container);
            };
        });

        function f(e) {
            if (e.code === "KeyE") {
                panel.style.display = panel.style.display === 'none' ? '' : 'none';
            }
        }
        addEventListener("keypress", f);

        setupFakeListeners();
        simulateApiRequest().then(() => {
            modifyGameState();
        });
    }

    createFakeMenu();
})();
