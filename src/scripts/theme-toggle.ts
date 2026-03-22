// Theme toggle functionality with smooth transitions
(function () {
    let isDark = document.documentElement.classList.contains("dark");

    function updateTheme() {
        document.documentElement.classList.toggle("dark", isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }

    function updateDataTheme(value: string) {
        document.documentElement.setAttribute("data-theme", value);
        localStorage.setItem("data-theme", value);
    }

    function toggleDark(event: MouseEvent) {
        const isAppearanceTransition =
            "startViewTransition" in document &&
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (!isAppearanceTransition) {
            isDark = !isDark;
            updateTheme();
            return;
        }

        const x = event.clientX;
        const y = event.clientY;
        const endRadius = Math.hypot(
            Math.max(x, innerWidth - x),
            Math.max(y, innerHeight - y)
        );

        const transition = document.startViewTransition(async () => {
            isDark = !isDark;
            updateTheme();
        });

        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
            ];
            document.documentElement.animate(
                {
                    clipPath: isDark ? [...clipPath].reverse() : clipPath,
                },
                {
                    duration: 400,
                    easing: "ease-out",
                    pseudoElement: isDark
                        ? "::view-transition-old(root)"
                        : "::view-transition-new(root)",
                }
            );
        });
    }

    const themeSwitchButton = document.getElementById("themeSwitch");
    if (themeSwitchButton) {
        themeSwitchButton.addEventListener("click", toggleDark);
    }

    const themeSelect = document.getElementById("themeSelect") as HTMLSelectElement;
    if (themeSelect) {
        themeSelect.addEventListener("change", (e) => {
            updateDataTheme((e.target as HTMLSelectElement).value);
        });
    }

    // Initialize data-theme select value
    const storedDataTheme = localStorage.getItem("data-theme") || "red";
    if (themeSelect) {
        themeSelect.value = storedDataTheme;
    }
})();