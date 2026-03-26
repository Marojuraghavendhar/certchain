// Mining Simulation Script

function showMiningModal(onComplete) {
    // Create modal if not exists
    if (!document.getElementById('mining-modal')) {
        const modal = document.createElement('div');
        modal.id = 'mining-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #00ff00;
            font-family: 'Courier New', monospace;
            flex-direction: column;
        `;

        modal.innerHTML = `
            <div style="width: 80%; max-width: 600px; background: #000; border: 2px solid #00ff00; padding: 20px; border-radius: 10px; box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);">
                <div style="border-bottom: 1px solid #00ff00; padding-bottom: 10px; margin-bottom: 10px; display: flex; justify-content: space-between;">
                    <span>> BLOCKCHAIN_MINER_V1.0.exe</span>
                    <span id="miner-status">INITIALIZING</span>
                </div>
                <div id="mining-log" style="height: 200px; overflow-y: hidden; opacity: 0.8; font-size: 14px; margin-bottom: 20px;"></div>
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                    <span style="margin-right: 10px;">PROGRESS:</span>
                    <div style="flex: 1; height: 20px; background: #333; border: 1px solid #00ff00;">
                        <div id="mining-bar" style="width: 0%; height: 100%; background: #00ff00; transition: width 0.1s linear;"></div>
                    </div>
                    <span id="mining-pct" style="margin-left: 10px;">0%</span>
                </div>
                <div style="text-align: center; font-size: 12px; color: #888;">
                    HASH_RATE: <span id="hash-rate">0</span> MH/s
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    const modal = document.getElementById('mining-modal');
    modal.style.display = 'flex';
    const log = document.getElementById('mining-log');
    const bar = document.getElementById('mining-bar');
    const pct = document.getElementById('mining-pct');
    const status = document.getElementById('miner-status');
    const hashRate = document.getElementById('hash-rate');

    let progress = 0;
    let logs = [];

    const addLog = (msg) => {
        logs.push(`> ${msg}`);
        if (logs.length > 8) logs.shift();
        log.innerHTML = logs.join('<br>');
    };

    addLog("Connecting to Mainnet...");

    // Simulation Loop
    const interval = setInterval(() => {
        progress += Math.random() * 2;
        if (progress > 100) progress = 100;

        bar.style.width = `${progress}%`;
        pct.innerText = `${Math.floor(progress)}%`;
        hashRate.innerText = (Math.random() * 50 + 100).toFixed(2);

        // Random events
        if (Math.random() > 0.7) {
            const hash = '0x' + Math.random().toString(16).substr(2, 24) + '...';
            addLog(`Hashing: ${hash}`);
        }

        if (progress >= 100) {
            clearInterval(interval);
            status.innerText = "BLOCK FOUND!";
            status.style.color = "#fff";
            status.style.background = "#00ff00";
            status.style.padding = "2px 5px";
            status.style.color = "#000";

            addLog("SUCCESS: Block #49201 mined.");
            addLog("Broadcasting to network...");

            setTimeout(() => {
                modal.style.display = 'none';
                if (onComplete) onComplete();
            }, 1000);
        }
    }, 50);
}
