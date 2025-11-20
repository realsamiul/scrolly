// Wait for the main window to load so the original scripts.js has finished its init
window.addEventListener('load', () => {
    console.log("M0NARQ System: Online");

    // Ensure Anime.js is available from the original script
    // The original script likely exposes 'anime' globally or we use standard DOM manipulation
    
    // --- 1. HERO COUNTER ANIMATION ---
    const counterEl = document.getElementById('counter');
    if (counterEl && window.anime) {
        let obj = { val: 0 };
        window.anime({
            targets: obj,
            val: 256000000,
            round: 1,
            easing: 'easeOutExpo',
            duration: 3000,
            update: function() {
                counterEl.innerHTML = obj.val.toLocaleString();
            }
        });
    }

    // --- 2. SCROLL INTERACTION LOGIC ---
    // This replaces the FloodAI "scroll observer" for our specific elements
    // without breaking the site's global scroll behavior.
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const trigger = entry.target.getAttribute('data-trigger');
                activateDemo(trigger);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-trigger]').forEach(el => observer.observe(el));

    // --- 3. DEMO STATE MACHINE ---
    function activateDemo(triggerId) {
        // Reset all cards
        document.querySelectorAll('.doc-card').forEach(card => {
            card.style.opacity = '0';
            card.style.zIndex = '0';
            card.classList.remove('active');
        });

        // Activate specific card
        const activeCard = document.getElementById(`vis-${triggerId}`);
        const activeTerm = document.getElementById(`term-${triggerId}`);
        
        if (activeCard) {
            activeCard.style.opacity = '1';
            activeCard.style.zIndex = '10';
            activeCard.classList.add('active');
            
            // Trigger terminal if not already running
            if (activeTerm && activeTerm.style.display === 'none') {
                activeTerm.style.display = 'block';
                if (triggerId === 'cheque') runChequeSimulation(activeTerm);
                if (triggerId === 'form') runFormSimulation(activeTerm);
            }
        }
    }

    // --- 4. TERMINAL SIMULATIONS ---
    
    function runChequeSimulation(el) {
        const log = [
            { text: "// Ingesting image: city_bank_cheque.jpg", color: "#888" },
            { text: ">> PaddleOCR: Bengali Text Detected", color: "#FFF" },
            { text: "   Confidence: 98.2%", color: "#00D4FF" },
            { text: ">> Extracting Amount...", color: "#FFF" },
            { text: "   Numeric: 1,50,000", color: "#0F0" },
            { text: "   Words: 'One Lakh Fifty Thousand'", color: "#0F0" },
            { text: ">> Verifying Signature...", color: "#FFF" },
            { text: "   MATCH CONFIRMED", color: "#00D4FF", bold: true }
        ];
        typeLines(el, log);
    }

    function runFormSimulation(el) {
        const log = [
            { text: "// Scanning Layout Topology...", color: "#888" },
            { text: ">> Document Type: DEBIT_CARD_APP", color: "#FFF" },
            { text: ">> Field Extraction:", color: "#FFF" },
            { text: "   Name: Rahim Ahmed", color: "#CCC" },
            { text: "   Mobile: +8801711000...", color: "#CCC" },
            { text: ">> Validation Checks:", color: "#FFF" },
            { text: "   [✓] Phone Format Valid", color: "#0F0" },
            { text: "   [✓] Mandatory Fields Present", color: "#0F0" }
        ];
        typeLines(el, log);
    }

    function typeLines(container, lines) {
        container.innerHTML = ''; // Clear
        let delay = 0;
        
        lines.forEach(line => {
            setTimeout(() => {
                const div = document.createElement('div');
                div.style.color = line.color;
                if (line.bold) div.style.fontWeight = 'bold';
                div.textContent = line.text;
                container.appendChild(div);
                container.scrollTop = container.scrollHeight;
            }, delay);
            delay += 300; // Speed of typing
        });
    }

});
