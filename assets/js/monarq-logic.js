window.addEventListener('load', () => {
    console.log("M0NARQ: System Initializing...");

    // 1. HERO COUNTER (Check if anime exists from the big script)
    if (typeof anime !== 'undefined') {
        const counterEl = document.getElementById('counter');
        if (counterEl) {
            let obj = { val: 0 };
            anime({
                targets: obj,
                val: 256000000,
                round: 1,
                easing: 'easeOutExpo',
                duration: 4000,
                update: function() {
                    counterEl.innerHTML = obj.val.toLocaleString();
                }
            });
        }
    } else {
        console.warn("M0NARQ: Anime.js not found. Check scripts.js loading.");
        // Fallback if script fails
        const counterEl = document.getElementById('counter');
        if(counterEl) counterEl.innerHTML = "256,000,000";
    }

    // 2. SCROLL OBSERVER
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const trigger = entry.target.getAttribute('data-trigger');
                activateDemo(trigger);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-trigger]').forEach(el => observer.observe(el));

    // 3. DEMO LOGIC
    function activateDemo(triggerId) {
        // Reset visuals
        document.querySelectorAll('.doc-card').forEach(card => {
            card.style.opacity = '0';
            card.style.zIndex = '0';
            card.classList.remove('active');
        });

        // Activate current
        const activeCard = document.getElementById(`vis-${triggerId}`);
        const activeTerm = document.getElementById(`term-${triggerId}`);
        
        if (activeCard) {
            activeCard.style.opacity = '1';
            activeCard.style.zIndex = '10';
            activeCard.classList.add('active');
            
            // Start terminal if hidden
            if (activeTerm && activeTerm.style.display === 'none') {
                activeTerm.style.display = 'block';
                if (triggerId === 'cheque') runChequeLog(activeTerm);
                if (triggerId === 'form') runFormLog(activeTerm);
            }
        }
    }

    // 4. TERMINAL LOGIC
    function runChequeLog(el) {
        el.innerHTML = '';
        const lines = [
            { text: "// BANKCORE v1.0.2", color: "#888" },
            { text: ">> SCANNING...", color: "#fff" },
            { text: "   [OK] PaddleOCR Init", color: "#0f0" },
            { text: ">> DETECTED: Bengali Script", color: "#00D4FF" },
            { text: "   Amount: 1,50,000 BDT", color: "#fff" },
            { text: "   Payee: Rahim Ahmed", color: "#fff" },
            { text: ">> VERIFYING SIGNATURE...", color: "#ffa500" },
            { text: "   MATCH CONFIRMED (99.2%)", color: "#0f0", bold: true }
        ];
        printLines(el, lines);
    }

    function runFormLog(el) {
        el.innerHTML = '';
        const lines = [
            { text: "// GOVCORE v2.1.0", color: "#888" },
            { text: ">> IDENTIFYING LAYOUT...", color: "#fff" },
            { text: "   Type: Debit Card App", color: "#00D4FF" },
            { text: ">> EXTRACTING FIELDS:", color: "#fff" },
            { text: "   - Name: Rahim Ahmed", color: "#ccc" },
            { text: "   - Phone: +8801711...", color: "#ccc" },
            { text: ">> VALIDATION CHECKS:", color: "#fff" },
            { text: "   [PASS] KYC Compliant", color: "#0f0", bold: true }
        ];
        printLines(el, lines);
    }

    function printLines(container, lines) {
        let delay = 0;
        lines.forEach(line => {
            setTimeout(() => {
                const div = document.createElement('div');
                div.style.color = line.color;
                if (line.bold) div.style.fontWeight = 'bold';
                div.style.marginBottom = '4px';
                div.textContent = line.text;
                container.appendChild(div);
                container.scrollTop = container.scrollHeight;
            }, delay);
            delay += 400;
        });
    }
});
