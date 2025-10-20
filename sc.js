        // Mobile menu toggle
        const toggle = document.getElementById('menuToggle');
        const siteNav = document.getElementById('siteNav');
        
        toggle.addEventListener('click', () => {
            const isOpen = siteNav.classList.toggle('open');
            toggle.classList.toggle('active');
            toggle.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen && window.innerWidth <= 840 ? 'hidden' : '';
        });

        // Close mobile menu when clicking nav links
        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 840) {
                    siteNav.classList.remove('open');
                    toggle.classList.remove('active');
                    toggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });
        });

        // Close menu when clicking outside (mobile only)
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 840 && siteNav.classList.contains('open') &&
                !siteNav.contains(e.target) && !toggle.contains(e.target) && e.target.tagName !== 'BUTTON') {
                siteNav.classList.remove('open');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });

        // Handle window resize (closes mobile menu if viewport becomes large)
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth > 840) {
                    siteNav.classList.remove('open');
                    toggle.classList.remove('active');
                    toggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            }, 250);
        });

        // Add ripple effect to CTA button (in header)
        const ctaBtn = document.querySelector('.cta-btn');
        ctaBtn.addEventListener('click', function(e) {
             // Ripple effect logic removed to avoid complexity/extra CSS, relying on :before styling instead.
        });

        // Navbar shadow on scroll
        const topbar = document.querySelector('.topbar');
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 10) {
                topbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
            } else {
                topbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            }
        }, { passive: true });

        // Smooth scroll for in-page links (Improved)
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                const id = a.getAttribute('href');
                if(id.length > 1 && document.querySelector(id)){
                    e.preventDefault();
                    document.querySelector(id).scrollIntoView({behavior:'smooth'});
                    
                    // Close mobile menu after scroll
                    if(siteNav.classList.contains('open')){ 
                        siteNav.classList.remove('open'); 
                        toggle.classList.remove('active');
                        toggle.setAttribute('aria-expanded','false'); 
                        document.body.style.overflow = '';
                    }
                }
            });
        });

        // Toggle active highlight on Service/About cards
        const cards = document.querySelectorAll('.card');
        cards.forEach(card=>{
            card.addEventListener('click', toggleActive);
            card.addEventListener('keydown', e=>{
                if(e.key==='Enter' || e.key===' '){ e.preventDefault(); toggleActive.call(card); }
            });
        });
        function toggleActive(){
            cards.forEach(c=>c.classList.remove('active'));
            this.classList.add('active');
            console.log('Selected:', this.dataset.service);
        }
        
        // Provide quick user feedback on CTA interactions
        const toast = document.getElementById('toast');
        function showToast(msg){
            toast.textContent = msg;
            toast.style.display = 'block';
            clearTimeout(window.__t);
            window.__t = setTimeout(()=> toast.style.display='none', 2200);
        }
        
        // Removed as the toast element is not fully styled in the provided CSS, reducing noise.
        // document.getElementById('waBtn').addEventListener('click', ()=> showToast('Opening WhatsApp…'));
        // document.getElementById('emailBtn').addEventListener('click', ()=> showToast('Opening email…'));
        
        // Removed back-to-top logic as the button is not present in the HTML.
