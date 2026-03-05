document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Actualizar el año del Copyright automáticamente
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Menú de navegación móvil
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links li a");

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            // Cambiar el icono (hamburguesa a equis)
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Cerrar el menú al hacer clic en un enlace (en móviles)
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            if (navLinks.classList.contains("active")) {
                navLinks.classList.remove("active");
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 3. Header pegajoso (cambia de estilo al hacer scroll)
    const header = document.getElementById("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // 4. Animaciones al hacer Scroll (Intersection Observer)
    const fadeElements = document.querySelectorAll(".animate-on-scroll");

    const scrollObserverOptions = {
        root: null,
        threshold: 0.15, // Ejecutar cuando el 15% del elemento es visible
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target); // Dejar de observar una vez animado
            }
        });
    }, scrollObserverOptions);

    fadeElements.forEach(el => scrollObserver.observe(el));

    // 5. Validación básica del Formulario
    const form = document.getElementById("contactForm");
    
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault(); // Evitar envío por defecto
            
            let isValid = true;
            
            // Campos del formulario
            const name = document.getElementById("name");
            const email = document.getElementById("email");
            const message = document.getElementById("message");
            
            // Expresión regular para validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Limpiar errores previos
            document.querySelectorAll('.form-group').forEach(group => group.classList.remove('error'));

            // Validar Nombre
            if (name.value.trim() === "") {
                name.parentElement.classList.add("error");
                isValid = false;
            }

            // Validar Email
            if (email.value.trim() === "" || !emailRegex.test(email.value)) {
                email.parentElement.classList.add("error");
                isValid = false;
            }

            // Validar Mensaje
            if (message.value.trim() === "") {
                message.parentElement.classList.add("error");
                isValid = false;
            }

            // Si es válido, "enviar" (simulación)
            if (isValid) {
                const btnSubmit = form.querySelector('.form-submit');
                const originalText = btnSubmit.innerHTML;
                
                // Efecto de carga
                btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                btnSubmit.disabled = true;

                // Simular llamada a servidor
                setTimeout(() => {
                    document.getElementById("successMessage").style.display = "block";
                    form.reset();
                    btnSubmit.innerHTML = originalText;
                    btnSubmit.disabled = false;
                    
                    // Ocultar mensaje de éxito después de 5 segundos
                    setTimeout(() => {
                        document.getElementById("successMessage").style.display = "none";
                    }, 5000);
                }, 1500);
            }
        });

        // Limpiar errores mientras el usuario escribe
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.parentElement.classList.contains('error')) {
                    input.parentElement.classList.remove('error');
                }
            });
        });
    }
});
