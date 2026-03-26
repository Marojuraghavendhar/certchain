const chatWidget = document.getElementById('certibot-widget');
const chatMessages = document.getElementById('certibot-messages');
const chatInput = document.getElementById('certibot-input');

function toggleChat() {
    if (chatWidget.style.display === 'none' || chatWidget.style.display === '') {
        chatWidget.style.display = 'flex';
        // Add initial greeting if empty
        if (chatMessages.children.length === 0) {
            addBotMessage("Hello! I'm CertiBot 🤖. How can I help you today?");
            addQuickReplies();
        }
        document.getElementById('certibot-input').focus();
    } else {
        chatWidget.style.display = 'none';
    }
}

function handleEnter(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const text = chatInput.value.trim();
    if (text) {
        addUserMessage(text);
        chatInput.value = '';
        setTimeout(() => getBotResponse(text), 600);
    }
}

function addUserMessage(text) {
    const div = document.createElement('div');
    div.className = 'message user-message';
    div.textContent = text;
    chatMessages.appendChild(div);
    scrollToBottom();
}

function addBotMessage(text) {
    const div = document.createElement('div');
    div.className = 'message bot-message';
    div.innerHTML = text; // Allow HTML for links
    chatMessages.appendChild(div);
    scrollToBottom();
}

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addQuickReplies() {
    const div = document.createElement('div');
    div.className = 'quick-replies';
    div.innerHTML = `
        <button onclick="handleQuickReply('Verify Certificate')">Verify Cert</button>
        <button onclick="handleQuickReply('Download Issue')">Download Issue</button>
        <button onclick="handleQuickReply('Contact Support')">Support</button>
    `;
    chatMessages.appendChild(div);
    scrollToBottom();
}

function handleQuickReply(text) {
    addUserMessage(text);
    setTimeout(() => getBotResponse(text), 600);
}

function getBotResponse(input) {
    const lowerInput = input.toLowerCase();

    let response = "I'm not sure about that. Try asking about verification, downloads, or account settings.";

    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        response = "Hi there! 👋 Need help with your certificates?";
    } else if (lowerInput.includes('verify')) {
        response = "To verify a certificate, go to the <a href='verify.html' target='_blank' style='color: #fff; text-decoration: underline;'>Verification Portal</a> and enter the Certificate ID.";
    } else if (lowerInput.includes('download')) {
        response = "If you're having trouble downloading, try refreshing the page or checking your pop-up blocker settings. Ensure your certificate is fully issued.";
    } else if (lowerInput.includes('support') || lowerInput.includes('contact')) {
        response = "You can reach our support team at <a href='mailto:support@certichain.com' style='color: #fff;'>support@certichain.com</a>.";
    } else if (lowerInput.includes('blockchain')) {
        response = "We use the Ethereum blockchain to ensure all certificates are immutable and tamper-proof! 🛡️";
    }

    addBotMessage(response);
}

function startVoiceRecognition() {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.start();

        recognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            document.getElementById('certibot-input').value = transcript;
            sendMessage();
        };

        recognition.onerror = function (event) {
            console.error('Voice error:', event.error);
            alert('Voice recognition error. Please try typing.');
        };
    } else {
        alert('Voice recognition is not supported in this browser.');
    }
}
