document.addEventListener('DOMContentLoaded', () => {

    // --- DATA SIMULATION (From your backend) ---
    const bankData = {
        "status": "success",
        "doc_type": "cheque",
        "bank": "City Bank PLC",
        "date": "20/11/2025",
        "payee": "Rahim Ahmed",
        "amount_numeric": 150000,
        "amount_words": "One Lakh Fifty Thousand Only",
        "fraud_check": { "score": 98.5, "status": "PASS" }
    };

    const govData = {
        "status": "success",
        "doc_type": "debit_card_application",
        "applicant": { "name": "Rahim Ahmed", "mobile": "+8801711..." },
        "card_selection": "Platinum",
        "intelligence": [
            "✅ Signature matches KYC",
            "✅ Passport valid > 6 months",
            "ℹ️ High-value customer"
        ]
    };

    // --- 1. HERO ANIMATION ---
    anime({
        targets: '#counter-docs',
        innerHTML: [0, 256000000],
        round: 1,
        duration: 3000,
        easing: 'easeOutExpo',
        update: function(a) {
            const value = a.animations[0].currentValue;
            document.querySelector('#counter-docs').innerHTML = Number(value).toLocaleString();
        }
    });

    // --- 2. SCROLL OBSERVER ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const trigger = entry.target.getAttribute('data-trigger');
                activateDemo(trigger);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.feature-section').forEach(section => {
        observer.observe(section);
    });

    // --- 3. DEMO ORCHESTRATOR ---
    let currentDemo = null;

    function activateDemo(triggerId) {
        if (currentDemo === triggerId) return;
        currentDemo = triggerId;

        // Hide all visuals first
        document.querySelectorAll('.doc-card').forEach(el => {
            el.style.opacity = '0';
            el.style.zIndex = '0';
            el.classList.remove('active');
        });

        // Activate current visual
        const activeCard = document.getElementById(`visual-${triggerId}`);
        const activeTerm = document.getElementById(`term-${triggerId}`);
        const activeBadge = document.getElementById(`badge-${triggerId}`);

        if (activeCard) {
            activeCard.style.opacity = '1';
            activeCard.style.zIndex = '10';
            activeCard.classList.add('active');
            
            // Start Terminal Sequence
            activeTerm.style.display = 'block';
            if (triggerId === 'bankcore') {
                typeWriter(activeTerm, activeBadge, bankData);
            } else if (triggerId === 'govcore') {
                typeWriter(activeTerm, activeBadge, govData);
            }
        }
    }

    // --- 4. TYPEWRITER EFFECT ---
    function typeWriter(element, badge, data) {
        // Reset
        element.innerHTML = '<span style="color: #666">// M0NARQ Engine v1.2 initialized...</span><br>';
        badge.innerHTML = "PROCESSING";
        badge.style.backgroundColor = "#333";
        badge.style.color = "#fff";

        const text = JSON.stringify(data, null, 2);
        let i = 0;
        const speed = 5; // ms per char

        // Clear existing interval if any (hacky way using a custom property)
        if (element.typeInterval) clearInterval(element.typeInterval);

        element.typeInterval = setInterval(() => {
            element.innerHTML += text.charAt(i);
            i++;
            element.scrollTop = element.scrollHeight; // Auto-scroll

            if (i >= text.length) {
                clearInterval(element.typeInterval);
                // Success State
                badge.innerHTML = "SUCCESS (140ms)";
                badge.style.backgroundColor = "#00e5ff"; // Brand Cyan
                badge.style.color = "#000";
                element.innerHTML += '<br><span style="color: #00e5ff">>> DONE_</span>';
            }
        }, speed);
    }
});
