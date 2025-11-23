(function() {
    'use strict';
    
    function initTypingAnimation() {
        const typingElement = document.querySelector('.typing-text');
        
        if (!typingElement) {
            // Retry after a short delay if element not found
            setTimeout(initTypingAnimation, 100);
            return;
        }
        
        const texts = ['founders', 'scientists', 'researchers', 'builders', 'innovators'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let speed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentText.length) {
                speed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                speed = 300;
            }
            
            setTimeout(type, speed);
        }
        
        type();
    }
    
    function initCards() {
        const cards = document.querySelectorAll('.team-card');
        cards.forEach(card => {
            card.addEventListener('click', function() {
                card.classList.toggle('is-flipped');
            });
        });
    }
    
    function initFilters() {
        const filters = document.querySelectorAll('.filter');
        filters.forEach(filter => {
            filter.addEventListener('click', function() {
                filters.forEach(btn => btn.classList.remove('active'));
                filter.classList.add('active');
                
                const filterText = filter.textContent.trim();
                const cards = document.querySelectorAll('.team-card');
                
                cards.forEach(card => {
                    const role = card.getAttribute('data-role');
                    let shouldShow = false;
                    
                    if (filterText === 'All') {
                        shouldShow = true;
                    } else if (filterText.toLowerCase() === 'partners') {
                        // Show cards with "Partner" role when "Partners" filter is clicked
                        shouldShow = role === 'Partner';
                    } else {
                        // For other filters, match exactly (case-insensitive)
                        shouldShow = role.toLowerCase() === filterText.toLowerCase();
                    }
                    
                    if (shouldShow) {
                        card.style.display = ''; // Remove inline style to use CSS grid
                        card.style.visibility = 'visible';
                    } else {
                        card.style.display = 'none';
                        card.style.visibility = 'hidden';
                    }
                });
            });
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            document.documentElement.style.scrollBehavior = 'smooth';
            initTypingAnimation();
            initCards();
            initFilters();
        });
    } else {
        document.documentElement.style.scrollBehavior = 'smooth';
        initTypingAnimation();
        initCards();
        initFilters();
    }
})();
