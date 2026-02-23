import { menuData } from './menu_data.json.js';

document.addEventListener('DOMContentLoaded', () => {

    lucide.createIcons();


    gsap.registerPlugin(ScrollTrigger);


    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuClose = document.getElementById('menu-close');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => mobileMenu.classList.remove('translate-x-full'), 10);
    });

    const closeMenu = () => {
        mobileMenu.classList.add('translate-x-full');
        setTimeout(() => mobileMenu.classList.add('hidden'), 300);
    };

    menuClose.addEventListener('click', closeMenu);
    navLinks.forEach(link => link.addEventListener('click', closeMenu));


    const menuContainer = document.getElementById('menu-container');
    const filterBtns = document.querySelectorAll('.filter-btn');

    const renderMenu = (category = 'all') => {
        menuContainer.innerHTML = '';
        const filtered = category === 'all' 
            ? menuData 
            : menuData.filter(item => item.category === category);

        filtered.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'menu-card group';
            card.innerHTML = `
                <div class="relative overflow-hidden rounded-xl mb-4 h-48">
                    <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover transition duration-500 group-hover:scale-110">
                    <span class="absolute top-2 right-2 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold">₹${item.price}</span>
                </div>
                <h3 class="text-xl font-bold mb-1">${item.name}</h3>
                <p class="text-sm opacity-70 mb-4">${item.description}</p>
                <div class="flex justify-between items-center">
                    <span class="text-xs uppercase tracking-wider text-[#D2B48C] font-semibold">${item.category}</span>
                    <button class="text-[#4B2C20] hover:scale-110 transition"><i data-lucide="heart" class="w-5 h-5"></i></button>
                </div>
            `;
            menuContainer.appendChild(card);
            

            gsap.from(card, {
                opacity: 0,
                y: 30,
                delay: index * 0.1,
                duration: 0.5,
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%"
                }
            });
        });
        lucide.createIcons();
    };

    renderMenu();

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderMenu(btn.dataset.category);
        });
    });


    const bookingForm = document.getElementById('booking-form');
    const successMsg = document.getElementById('booking-success');

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(bookingForm);
        

        const phone = formData.get('phone');
        if (new RegExp('^[0-9]{10}$').test(phone)) {

            const btn = bookingForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = "Processing...";
            btn.disabled = true;

            setTimeout(() => {
                bookingForm.classList.add('hidden');
                successMsg.classList.remove('hidden');
                

                const booking = Object.fromEntries(formData.entries());
                localStorage.setItem('latest_booking', JSON.stringify(booking));
                
                confetti();
            }, 1500);
        } else {
            alert("Please enter a valid 10-digit phone number.");
        }
    });


    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section.querySelectorAll('h2, p, .grid'), {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
            }
        });
    });
});


function confetti() {

}
