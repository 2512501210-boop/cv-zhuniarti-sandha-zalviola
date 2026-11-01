
// ==========================================
// OLA PERSONAL CV - JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ======================================
    // PRELOADER
    // ======================================

    const preloader = document.getElementById("preloader");

    function hidePreloader() {
        if (preloader) {
            preloader.classList.add("hidden");
        }
    }

    if (document.readyState === "complete") {
        hidePreloader();
    } else {
        window.addEventListener("load", hidePreloader, { once: true });
    }

    // Cadangan agar loading tidak terlalu lama
    setTimeout(hidePreloader, 1800);


    // ======================================
    // NAVBAR SCROLL
    // ======================================

    const navbar = document.getElementById("mainNav");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main section[id]");
    const backToTop = document.getElementById("backToTop");

    function updateOnScroll() {

        const scrollPosition = window.scrollY;

        // Navbar berubah saat scroll
        if (navbar) {
            navbar.classList.toggle("scrolled", scrollPosition > 40);
        }

        // Back to top
        if (backToTop) {
            backToTop.classList.toggle("show", scrollPosition > 350);
        }

        // Menu aktif sesuai section
        let currentSection = "home";

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop - 150;

            if (scrollPosition >= sectionTop) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(function (link) {

            const target = link.getAttribute("href");

            link.classList.toggle(
                "active",
                target === "#" + currentSection
            );

        });

    }

    window.addEventListener("scroll", updateOnScroll, { passive: true });
    updateOnScroll();


    // ======================================
    // NAVBAR MOBILE AUTO CLOSE
    // ======================================

    const navMenu = document.getElementById("navMenu");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (
                navMenu &&
                navMenu.classList.contains("show") &&
                typeof bootstrap !== "undefined"
            ) {

                const menuInstance =
                    bootstrap.Collapse.getOrCreateInstance(navMenu);

                menuInstance.hide();
            }

        });

    });


    // ======================================
    // SCROLL REVEAL
    // ======================================

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries, observerInstance) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observerInstance.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -20px 0px"
            }
        );

        revealElements.forEach(function (element) {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });

    }


    // ======================================
    // BACK TO TOP
    // ======================================

    if (backToTop) {

        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    // ======================================
    // CONTACT FORM
    // ======================================

    const contactForm = document.getElementById("contactForm");

    const namaInput = document.getElementById("nama");
    const keperluanInput = document.getElementById("keperluan");
    const pesanInput = document.getElementById("pesan");

    const sendInstagram = document.getElementById("sendInstagram");
    const formStatus = document.getElementById("formStatus");

    const whatsappNumber = "6285856627990";
    const instagramUrl = "https://www.instagram.com/ssavviola/";

    function showStatus(message, type) {

        if (!formStatus) return;

        formStatus.textContent = message;
        formStatus.className = "form-status " + type;

    }

    function validateForm() {

        if (!contactForm) return false;

        contactForm.classList.add("was-validated");

        if (!contactForm.checkValidity()) {

            showStatus(
                "Mohon lengkapi nama, keperluan, dan pesan terlebih dahulu.",
                "error"
            );

            return false;
        }

        return true;
    }

    function createMessage() {

        const nama = namaInput.value.trim();
        const keperluan = keperluanInput.value;
        const pesan = pesanInput.value.trim();

        return (
            "Halo Ola! ♡\n\n" +
            "Nama: " + nama + "\n" +
            "Keperluan: " + keperluan + "\n\n" +
            "Pesan:\n" + pesan
        );

    }


    // ======================================
    // KIRIM VIA WHATSAPP
    // ======================================

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!validateForm()) return;

            const message = createMessage();

            const whatsappUrl =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(message);

            showStatus(
                "WhatsApp dibuka. Silakan tekan tombol kirim di WhatsApp.",
                "success"
            );

            window.open(
                whatsappUrl,
                "_blank",
                "noopener,noreferrer"
            );

        });

    }


    // ======================================
    // HUBUNGI VIA INSTAGRAM
    // ======================================

    if (sendInstagram) {

        sendInstagram.addEventListener("click", async function () {

            if (!validateForm()) return;

            const message = createMessage();

            try {

                await navigator.clipboard.writeText(message);

                showStatus(
                    "Pesan berhasil disalin. Silakan tempel di DM Instagram.",
                    "success"
                );

            } catch (error) {

                showStatus(
                    "Instagram dibuka. Silakan salin pesan dari formulir secara manual.",
                    "error"
                );

            }

            window.open(
                instagramUrl,
                "_blank",
                "noopener,noreferrer"
            );

        });

    }


    // ======================================
    // RESET STATUS SAAT FORM DIUBAH
    // ======================================

    if (contactForm) {

        contactForm.addEventListener("input", function () {

            if (formStatus) {
                formStatus.textContent = "";
                formStatus.className = "form-status";
            }

        });

    }

});
