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
    
    function applyFilter(filterText) {
        const filters = document.querySelectorAll('.filter');
        filters.forEach(btn => btn.classList.remove('active'));
        
        // Normalize filter text for matching
        const normalizedFilterText = filterText.toLowerCase().trim();
        
        // Find and activate the matching filter button
        filters.forEach(filter => {
            const buttonText = filter.textContent.trim().toLowerCase();
            if (buttonText === normalizedFilterText || 
                (normalizedFilterText === 'residents' && buttonText === 'residents') ||
                (normalizedFilterText === 'partners' && buttonText === 'partners') ||
                (normalizedFilterText === 'advisory' && buttonText === 'advisory') ||
                (normalizedFilterText === 'all' && buttonText === 'all')) {
                filter.classList.add('active');
            }
        });
        
        const cards = document.querySelectorAll('.team-card');
        
        cards.forEach(card => {
            const role = card.getAttribute('data-role');
            let shouldShow = false;
            
            if (normalizedFilterText === 'all') {
                shouldShow = true;
            } else if (normalizedFilterText === 'partners') {
                // Show cards with "Partner" role when "Partners" filter is clicked
                shouldShow = role === 'Partner';
            } else if (normalizedFilterText === 'residents') {
                // Show cards with "Resident" role when "Residents" filter is clicked
                shouldShow = role === 'Resident';
            } else if (normalizedFilterText === 'advisory') {
                // Show cards with "Advisory" role when "Advisory" filter is clicked
                shouldShow = role === 'Advisory';
            } else {
                // For other filters, match exactly (case-insensitive)
                shouldShow = role.toLowerCase() === normalizedFilterText;
            }
            
            if (shouldShow) {
                card.style.removeProperty('display');
                card.style.removeProperty('visibility');
                card.classList.remove('hidden');
            } else {
                card.style.display = 'none';
                card.style.visibility = 'hidden';
                card.classList.add('hidden');
            }
        });
    }
    
    function initFilters() {
        const filters = document.querySelectorAll('.filter');
        filters.forEach(filter => {
            filter.addEventListener('click', function() {
                const filterText = filter.textContent.trim();
                applyFilter(filterText);
            });
        });
        
        // Check for URL parameter to auto-apply filter
        const urlParams = new URLSearchParams(window.location.search);
        const filterParam = urlParams.get('filter');
        if (filterParam) {
            // Small delay to ensure DOM is ready
            setTimeout(function() {
                applyFilter(filterParam);
                // Scroll to filters section
                const filtersSection = document.querySelector('.filters-section');
                if (filtersSection) {
                    filtersSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
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
