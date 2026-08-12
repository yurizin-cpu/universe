/* =========================================================
   ESTRELAS
========================================================= */

const space = document.getElementById("space");

const STAR_COUNT = 180;


for (let i = 0; i < STAR_COUNT; i++) {

    const star = document.createElement("div");

    star.classList.add("star");


    /*
        Posição aleatória
    */

    star.style.left =
        Math.random() * 100 + "%";

    star.style.top =
        Math.random() * 100 + "%";


    /*
        Profundidade 3D
    */

    const depth =
        Math.random() * 900 - 450;

    star.style.transform =
        `translateZ(${depth}px)`;


    /*
        Tamanho
    */

    const size =
        Math.random() * 2 + .5;

    star.style.width =
        size + "px";

    star.style.height =
        size + "px";


    /*
        Velocidade individual
    */

    star.style.setProperty(
        "--duration",
        (Math.random() * 5 + 3) + "s"
    );


    /*
        Delay aleatório
    */

    star.style.animationDelay =
        (Math.random() * 5) + "s";


    space.appendChild(star);
}


/* =========================================================
   MOVIMENTO DO MOUSE
========================================================= */

const system =
    document.querySelector(".love-system");


document.addEventListener(
    "mousemove",
    (event) => {

        const x =
            (event.clientX / window.innerWidth) - .5;

        const y =
            (event.clientY / window.innerHeight) - .5;


        const rotateY =
            x * 20;

        const rotateX =
            y * -20;


        system.style.setProperty(
            "--mouse-x",
            `${rotateX}deg`
        );


        system.style.setProperty(
            "--mouse-y",
            `${rotateY}deg`
        );

    }
);


/* =========================================================
   TOQUE NO CELULAR
========================================================= */

document.addEventListener(
    "touchmove",
    (event) => {

        const touch =
            event.touches[0];


        const x =
            (touch.clientX / window.innerWidth) - .5;

        const y =
            (touch.clientY / window.innerHeight) - .5;


        system.style.setProperty(
            "--mouse-x",
            `${y * -15}deg`
        );


        system.style.setProperty(
            "--mouse-y",
            `${x * 15}deg`
        );

    },
    {
        passive: true
    }
);


/* =========================================================
   CLIQUE — EXPLOSÃO DE PARTÍCULAS
========================================================= */

document.addEventListener(
    "click",
    () => {

        for (let i = 0; i < 25; i++) {

            const particle =
                document.createElement("div");


            particle.classList.add("star");


            particle.style.left = "50%";
            particle.style.top = "50%";


            particle.style.background =
                i % 2 === 0
                    ? "#ff5ab5"
                    : "#ffffff";


            const angle =
                Math.random() * Math.PI * 2;


            const distance =
                Math.random() * 250 + 100;


            const x =
                Math.cos(angle) * distance;


            const y =
                Math.sin(angle) * distance;


            particle.animate(

                [
                    {
                        transform:
                            "translate(-50%, -50%) scale(1)",
                        opacity: 1
                    },

                    {
                        transform:
                            `translate(
                                calc(-50% + ${x}px),
                                calc(-50% + ${y}px)
                            )
                            scale(0)`,

                        opacity: 0
                    }
                ],

                {
                    duration:
                        Math.random() * 1000 + 800,

                    easing:
                        "cubic-bezier(.2,.8,.3,1)"
                }

            );


            space.appendChild(particle);


            setTimeout(
                () => particle.remove(),
                2000
            );

        }

    }
);


/* =========================================================
   CHUVA 3D DE AMOR — CORAÇÕES + "EU TE AMO"
========================================================= */

const loveRain = document.getElementById("love-rain");
const loveSparkles = document.getElementById("love-sparkles");

const LOVE_RAIN_INTERVAL = 135;
const MAX_LOVE_OBJECTS = 90;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function createLoveFall(initial = false) {
    if (!loveRain) return;

    if (loveRain.children.length >= MAX_LOVE_OBJECTS) {
        loveRain.firstElementChild?.remove();
    }

    const item = document.createElement("div");
    const isHeart = Math.random() < 0.58;

    item.classList.add("love-fall");
    item.classList.add(isHeart ? "love-heart" : "love-text");

    if (isHeart) {
        const hearts = ["❤", "♥", "♡", "💗"];
        item.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    } else {
        item.textContent = Math.random() < 0.18
            ? "EU TE AMO ♥"
            : "EU TE AMO";
    }

    const depth = random(-450, 450);
    const scale = depth < -100
        ? random(.55, .85)
        : depth > 180
            ? random(1.05, 1.55)
            : random(.8, 1.15);

    const size = isHeart
        ? random(17, 38)
        : random(12, 23);

    item.style.left = random(-3, 103) + "%";
    item.style.setProperty("--size", size + "px");
    item.style.setProperty("--depth", depth + "px");
    item.style.setProperty("--scale", scale.toFixed(2));

    item.style.setProperty("--fall-time", random(5.5, 10) + "s");
    item.style.setProperty("--glow-time", random(1.4, 3.2) + "s");

    item.style.setProperty("--rotation", random(-25, 25) + "deg");

    item.style.setProperty("--sway-a", random(-80, 80) + "px");
    item.style.setProperty("--sway-b", random(-140, 140) + "px");
    item.style.setProperty("--sway-c", random(-180, 180) + "px");

    item.style.setProperty("--opacity", random(.38, .92).toFixed(2));

    if (initial) {
        item.style.animationDelay = random(-7, 0) + "s";
    }

    loveRain.appendChild(item);

    // Pequena trilha luminosa para alguns elementos.
    if (Math.random() < 0.32) {
        createLoveTrail(item);
    }

    setTimeout(() => item.remove(), 12000);
}

function createLoveTrail(source) {
    const trailCount = Math.floor(random(2, 5));

    for (let i = 0; i < trailCount; i++) {
        setTimeout(() => {
            if (!source.isConnected) return;

            const rect = source.getBoundingClientRect();
            const spark = document.createElement("div");

            spark.className = "love-trail";
            spark.style.left = rect.left + rect.width / 2 + random(-8, 8) + "px";
            spark.style.top = rect.top + rect.height / 2 + random(-8, 8) + "px";

            spark.style.setProperty("--trail-size", random(1.5, 3.5) + "px");
            spark.style.setProperty("--trail-time", random(.5, 1.1) + "s");

            loveRain.appendChild(spark);

            setTimeout(() => spark.remove(), 1200);
        }, i * 130);
    }
}

function createSpark() {
    if (!loveSparkles) return;

    const spark = document.createElement("div");
    spark.className = "love-spark";

    spark.style.left = random(0, 100) + "%";
    spark.style.top = random(45, 110) + "%";
    spark.style.setProperty("--spark-x", random(-100, 100) + "px");
    spark.style.setProperty("--spark-time", random(2.5, 6) + "s");
    spark.style.animationDelay = random(0, 2) + "s";

    loveSparkles.appendChild(spark);

    setTimeout(() => spark.remove(), 7000);
}

// Chuva inicial distribuída pelo cenário.
for (let i = 0; i < 48; i++) {
    setTimeout(() => createLoveFall(true), i * 85);
}

// Fluxo contínuo.
setInterval(() => createLoveFall(false), LOVE_RAIN_INTERVAL);

// Poeira brilhante romântica.
setInterval(createSpark, 160);

// Ao clicar, além da explosão original de estrelas, cria uma pequena
// explosão extra de corações ao redor do centro.
document.addEventListener("click", () => {
    if (!loveRain) return;

    for (let i = 0; i < 12; i++) {
        const heart = document.createElement("div");
        heart.className = "love-fall love-heart";
        heart.textContent = i % 2 ? "♥" : "❤";

        heart.style.left = "50%";
        heart.style.top = "50%";
        heart.style.setProperty("--size", random(14, 28) + "px");
        heart.style.setProperty("--depth", random(80, 240) + "px");
        heart.style.setProperty("--scale", random(.7, 1.2).toFixed(2));
        heart.style.setProperty("--rotation", random(-30, 30) + "deg");
        heart.style.setProperty("--opacity", "1");
        heart.style.setProperty("--fall-time", random(1.4, 2.3) + "s");
        heart.style.setProperty("--glow-time", "1s");
        heart.style.setProperty("--sway-a", random(-90, 90) + "px");
        heart.style.setProperty("--sway-b", random(-170, 170) + "px");
        heart.style.setProperty("--sway-c", random(-260, 260) + "px");

        loveRain.appendChild(heart);

        setTimeout(() => heart.remove(), 2500);
    }
});
