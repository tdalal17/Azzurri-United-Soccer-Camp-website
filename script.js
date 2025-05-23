// Real Google Reviews Data from Azzurri United Soccer Club
const reviews = [
    {
        name: "Hannah Merrill",
        rating: 5,
        text: "Azzurri United is the place to go if you are looking for an excellent soccer club for your kiddos! The coaches are amazing. They are so understanding and flexible. I would highly recommend to anyone who is looking for a soccer club."
    },
    {
        name: "Stephanie Abudayeh",
        rating: 5,
        text: "A wonderful organization with an amazing coach! Organized and well planned sessions. High dedication to ensuring players have strong basics to build upon."
    },
    {
        name: "Talin Nudelman",
        rating: 5,
        text: "Azzurri United Soccer Club is an amazing place for players of all levels!!! Everyone is so great with the kids!!! They focus on soccer fundamentals and skill development. It's so awesome!!!! If you are looking for a great place to play soccer, this club is 100% worth checking out!"
    },
    {
        name: "Zaid Rafati",
        rating: 5,
        text: "If you're searching for a soccer club for your kid, your search should begin and end with Azzurri United. I cannot speak enough about the coaches, truly first class. Coach Farooq is a wealth of knowledge, he will make sure that your kids learn the game of soccer the correct way, from the beginning, and set them up for success. Coach Rob is so passionate about the game, is driven to see the kids succeed. Whether your kid is 4 years old or 14 years old, this is where they should be."
    },
    {
        name: "Setara Sous",
        rating: 5,
        text: "I highly recommend Azzurri United SC for any young soccer player looking to improve their skills in a supportive and fun environment. The coaching staff is outstanding and my child has not only improved his skills but has also gained a real love for the sport. The facility at Streamwood Community Center is awesome and the overall organization of the club is excellent. I truly appreciate the positive, safe, and welcoming atmosphere they've created for all players."
    }
];

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav');

mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        nav.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu if open
        nav.classList.remove('active');
        
        // Smooth scroll to target
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
    } else {
        header.style.padding = '20px 0';
    }
});

// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel-wrapper');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    let currentIndex = 0;
    let autoplayInterval;
    const intervalTime = 5000; // 5 seconds between slides
    
    // Initialize the carousel if it exists
    if (carousel && slides.length > 0) {
        // Create dots
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });
        
        // Create autoplay
        startAutoplay();
        
        // Navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                goToSlide(currentIndex - 1);
                resetAutoplay();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                goToSlide(currentIndex + 1);
                resetAutoplay();
            });
        }
        
        // Pause on hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            startAutoplay();
        });
    }
    
    // Functions for carousel
    function goToSlide(index) {
        // Handle circular navigation
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }
        
        currentIndex = index;
        updateCarousel();
    }
    
    function updateCarousel() {
        // Update slide position
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    function startAutoplay() {
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, intervalTime);
    }
    
    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    // Reviews Carousel
    const reviewsContainer = document.querySelector('.reviews-container');
    let currentReviewIndex = 0;
    let reviewAutoplayInterval;

    function createReviewCard(review) {
        const card = document.createElement('div');
        card.className = 'review-card';
        
        const stars = '★'.repeat(review.rating);
        
        card.innerHTML = `
            <div class="review-header">
                <div class="review-stars">${stars}</div>
                <div class="review-name">${review.name}</div>
            </div>
            <div class="review-text">"${review.text}"</div>
        `;
        
        return card;
    }

    function initializeReviews() {
        // Create review cards
        reviews.forEach((review, index) => {
            const card = createReviewCard(review);
            if (index === 0) card.classList.add('active');
            reviewsContainer.appendChild(card);
        });

        // Start auto-rotation
        startReviewAutoplay();
    }

    function showReview(index) {
        const reviewCards = document.querySelectorAll('.review-card');
        
        // Remove active class from all cards
        reviewCards.forEach(card => card.classList.remove('active'));
        
        // Add active class to current card
        if (reviewCards[index]) {
            reviewCards[index].classList.add('active');
        }
        
        currentReviewIndex = index;
    }

    function nextReview() {
        const nextIndex = (currentReviewIndex + 1) % reviews.length;
        showReview(nextIndex);
    }

    function startReviewAutoplay() {
        clearInterval(reviewAutoplayInterval);
        reviewAutoplayInterval = setInterval(nextReview, 5000); // 5 seconds
    }

    // Initialize reviews
    initializeReviews();

    // Pause reviews on hover
    reviewsContainer.addEventListener('mouseenter', () => {
        clearInterval(reviewAutoplayInterval);
    });

    reviewsContainer.addEventListener('mouseleave', () => {
        startReviewAutoplay();
    });
});

// Animation on page load
document.addEventListener('DOMContentLoaded', function() {
    const mediaCards = document.querySelectorAll('.media-card');
    const contactDetails = document.querySelectorAll('.contact-detail');
    const flyerContainer = document.querySelector('.carousel-container');
    const coachCards = document.querySelectorAll('.coach-card');
    
    // Animate coach cards
    coachCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 + (index * 150));
    });
    
    // Animate flyer carousel
    if (flyerContainer) {
        flyerContainer.style.opacity = '0';
        flyerContainer.style.transform = 'translateY(50px)';
        flyerContainer.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            flyerContainer.style.opacity = '1';
            flyerContainer.style.transform = 'translateY(0)';
        }, 300);
    }
    
    mediaCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 600 + (index * 150));
    });
    
    contactDetails.forEach((detail, index) => {
        detail.style.opacity = '0';
        detail.style.transform = 'translateY(50px)';
        detail.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            detail.style.opacity = '1';
            detail.style.transform = 'translateY(0)';
        }, 900 + (index * 150));
    });
    
    // Register button popup functionality
    const registerBtn = document.getElementById('register-btn');
    registerBtn.addEventListener('click', function(e) {
        // On mobile devices, let the link work normally to scroll to contact section
        // On desktop, also show a popup with the phone numbers
        if (window.innerWidth > 768) {
            e.preventDefault();
            
            // Create a more attractive popup instead of the basic alert
            const popup = document.createElement('div');
            popup.className = 'custom-popup';
            popup.innerHTML = `
                <div class="popup-content">
                    <span class="close-popup">&times;</span>
                    <h2>Contact Us</h2>
                    <p>Please call one of our numbers to register:</p>
                    <a href="tel:7737267634" class="popup-phone">773-726-7634</a>
                    <span class="popup-or">or</span>
                    <a href="tel:6306246605" class="popup-phone">630-624-6605</a>
                    <button class="popup-btn">Continue to Contact Info</button>
                </div>
            `;
            
            // Add styles for the popup
            const style = document.createElement('style');
            style.textContent = `
                .custom-popup {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.7);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                    animation: fadeIn 0.3s ease;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .popup-content {
                    background: linear-gradient(135deg, #fff, #f8f8f8);
                    padding: 40px;
                    border-radius: 20px;
                    text-align: center;
                    max-width: 400px;
                    width: 90%;
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
                    position: relative;
                    animation: scaleIn 0.3s ease;
                }
                @keyframes scaleIn {
                    from { transform: scale(0.8); }
                    to { transform: scale(1); }
                }
                .close-popup {
                    position: absolute;
                    top: 15px;
                    right: 20px;
                    font-size: 28px;
                    cursor: pointer;
                    color: #666;
                    transition: all 0.3s ease;
                }
                .close-popup:hover {
                    color: #222;
                    transform: rotate(90deg);
                }
                .popup-content h2 {
                    color: #0a4f9c;
                    margin-bottom: 20px;
                    font-size: 24px;
                }
                .popup-content p {
                    margin-bottom: 25px;
                    font-size: 16px;
                    color: #444;
                }
                .popup-phone {
                    display: block;
                    color: #0a4f9c;
                    font-size: 24px;
                    font-weight: bold;
                    text-decoration: none;
                    margin: 15px 0;
                    transition: all 0.3s ease;
                }
                .popup-phone:hover {
                    color: #0066cc;
                    transform: scale(1.05);
                }
                .popup-or {
                    display: block;
                    margin: 10px 0;
                    color: #888;
                    font-style: italic;
                }
                .popup-btn {
                    background: linear-gradient(45deg, #0a4f9c, #083773);
                    color: white;
                    border: none;
                    padding: 12px 20px;
                    border-radius: 50px;
                    margin-top: 20px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                }
                .popup-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
                }
            `;
            
            document.head.appendChild(style);
            document.body.appendChild(popup);
            
            // Close popup when clicking X or background
            const closeBtn = popup.querySelector('.close-popup');
            closeBtn.addEventListener('click', () => {
                popup.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(popup);
                }, 300);
            });
            
            // Close popup when clicking outside the content
            popup.addEventListener('click', (e) => {
                if (e.target === popup) {
                    popup.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(popup);
                    }, 300);
                }
            });
            
            // Continue to contact section when clicking the button
            const continueBtn = popup.querySelector('.popup-btn');
            continueBtn.addEventListener('click', () => {
                document.querySelector('#contact').scrollIntoView({
                    behavior: 'smooth'
                });
                popup.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(popup);
                }, 300);
            });
        }
    });
    
    // Add parallax effect to header on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPosition = `center ${-scrollPosition * 0.15}px`;
        }
    });
    
    // Add a cursor highlight effect
    const cursor = document.createElement('div');
    cursor.className = 'cursor-highlight';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mousedown', function() {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    
    document.addEventListener('mouseup', function() {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    // Enlarge cursor on hoverable elements
    const hoverables = document.querySelectorAll('a, button, .media-card, .contact-detail, .coach-card, .review-card');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
            cursor.style.backgroundColor = 'rgba(0, 70, 170, 0.1)';
        });
        el.addEventListener('mouseleave', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'rgba(0, 70, 170, 0.2)';
        });
    });
});