// ==========================================
// 💌 PERSONALISASI SURAT (UBAH DI SINI)
// ==========================================
const CONFIG = {
    namaPanggilan: "BEYYYY",
    kalimatPersonal: " Besok udaa mulai masuk kuliah yaa....", 
    
    // Foto untuk di akhir (gunakan file lokal)
    fotoAkhir: "kita.png",

    // Kecepatan ngetik (semakin kecil semakin cepat)
    typingSpeed: 20 
};

const letterScript = [
    "Beyyy semangat yaa buat besokkk!!!!",
    CONFIG.kalimatPersonal,
    "Jadi asdos sambil kuliah itu keren banget, dan Beyyy udah buktiin kalo Beyyy mampu.",
    "Besok bisa jadi hari yang padet tapi aku yakin Beyyy pasti bisa ngelewatin ituuu.",
    "Banyak hal baik nunggu Beyyy di semester ini lets goooooo.",
    "Aku selalu dukung Beyyy dari dari jauh ",
    "Semangat buat besok, Beyyy pasti bisa."
];

const signatureText = "~lannn";

const patronusScript = {
    spell: "LUMOS MAXIMA",
    msg1: "No matter how hard it feels...",
    msg2: "I'll always believe in you.",
    msg3: "SEMANGAT BU ASDOS :>"
};

const OPENING_SPELL = "REVELIO";
// ==========================================

// Set foto awal dari config
document.getElementById('ending-photo').src = CONFIG.fotoAkhir;

// --- SEQUENCE LOGIC ---
const btnStart = document.getElementById('btn-start');

const sceneStart = document.getElementById('scene-start');
const sceneIntro = document.getElementById('scene-intro');
const introText = document.getElementById('intro-text');
const sceneEnvelope = document.getElementById('scene-envelope');
const envelope = document.getElementById('envelope');
const topFlap = document.getElementById('top-flap');
const sceneSpell = document.getElementById('scene-spell');
const spellReveal = document.getElementById('spell-reveal');
const sceneLetter = document.getElementById('scene-letter');
const parchment = document.getElementById('parchment');
const typeContainer = document.getElementById('typewriter-container');
const bgMusic = document.getElementById('bg-music');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function tryPlayMusic() {
    if (!bgMusic) return;

    const playPromise = bgMusic.play();
    if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
            // Autoplay can be blocked; retry on first user interaction.
        });
    }
}

function initAutoPlayMusic() {
    tryPlayMusic();

    const unlockMusic = () => {
        tryPlayMusic();
        document.removeEventListener('click', unlockMusic);
        document.removeEventListener('touchstart', unlockMusic);
        document.removeEventListener('keydown', unlockMusic);
    };

    document.addEventListener('click', unlockMusic, { once: true });
    document.addEventListener('touchstart', unlockMusic, { once: true });
    document.addEventListener('keydown', unlockMusic, { once: true });
}

initAutoPlayMusic();

function createLumosTextTimeline(spellElement) {
    gsap.killTweensOf(spellElement);

    return gsap.timeline()
        .fromTo(spellElement,
            {
                opacity: 0,
                y: 26,
                scale: 0.62,
                filter: "blur(16px)",
                letterSpacing: "0.08em"
            },
            {
                opacity: 1,
                y: -10,
                scale: 1.06,
                filter: "blur(0px)",
                letterSpacing: "0.24em",
                duration: 1.7,
                ease: "power3.out"
            }
        )
        .to(spellElement, {
            duration: 0.2,
            repeat: 4,
            yoyo: true,
            scale: 1.02,
            opacity: 0.96,
            ease: "sine.inOut"
        });
}

async function playSpellAnimation(spellText) {
    spellReveal.textContent = spellText;
    sceneSpell.classList.remove('hidden');

    gsap.timeline()
        .add(createLumosTextTimeline(spellReveal), 0)
        .to(spellReveal, {
            opacity: 0,
            duration: 0.34,
            ease: "power1.in"
        }, 1.3);

    await delay(2150);
    sceneSpell.classList.add('hidden');
}

// 1. Mulai
btnStart.addEventListener('click', async () => {
    gsap.to('#owl-start-img', { scale: 0.92, opacity: 0, duration: 0.32, ease: "power2.in" });
    sceneStart.style.opacity = '0';
    await delay(450);
    sceneStart.classList.add('hidden');
    
    sceneIntro.classList.remove('hidden');
    gsap.to(introText, { opacity: 1, filter: "blur(0px)", duration: 1, ease: "power2.out" });
    
    await delay(900);
    gsap.to(introText, { opacity: 0, filter: "blur(10px)", duration: 0.85, ease: "power2.inOut" });
    
    await delay(450);
    sceneIntro.classList.add('hidden');
    
    sceneEnvelope.classList.remove('hidden');
    gsap.fromTo(envelope, 
        { opacity: 0, y: 50, scale: 0.8 }, 
        { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "back.out(1.7)" }
    );
});

// 2. Buka Amplop
envelope.addEventListener('click', async () => {
    envelope.style.pointerEvents = 'none';

    // buka flap
    topFlap.style.transform = 'rotateX(180deg)';
    
    await delay(350);

    // 🔥 animasi amplop (lebih smooth + cinematic)
    gsap.timeline()
        .to(envelope, { 
            x: -14, 
            rotate: -3, 
            duration: 0.07, 
            yoyo: true, 
            repeat: 5, 
            ease: "power1.inOut" 
        })
        .to(envelope, { 
            x: 0, 
            rotate: 0, 
            duration: 0.08, 
            ease: "power1.out" 
        })
        .to(envelope, { 
            scale: 0.8, 
            y: -30, 
            filter: "drop-shadow(0 0 30px rgba(186,225,255,0.9))", 
            duration: 0.25, 
            ease: "power2.out" 
        })
        .to(envelope, { 
            scale: 3, 
            y: 10, 
            opacity: 0, 
            filter: "blur(30px)", 
            duration: 0.5, 
            ease: "power3.in" 
        });

    await delay(900);

    // ✨ spell animation
    await playSpellAnimation(OPENING_SPELL);

    // pindah scene
    sceneEnvelope.classList.add('hidden');
    sceneLetter.classList.remove('hidden');

    // 🔥 INI YANG NGEBESARIN "TULISAN"
    // kita scale parchment biar teks ikut gede & cinematic
    gsap.fromTo(parchment, 
        { 
            opacity: 0, 
            scale: 0.7   // mulai kecil
        },
        { 
            opacity: 1, 
            scale: 1.25, // 🔥 jadi lebih besar dari normal
            duration: 1.1, 
            ease: "power3.out" 
        }
    );
    
    await delay(550);

    startTypewriterSequence();
});

// 3. Efek Mengetik Ke Bawah (1 Frame)
async function typeSentence(sentence, element) {
    let i = 0;
    element.classList.add('cursor');
    while (i < sentence.length) {
        element.innerHTML = sentence.substring(0, i + 1);
        i++;
        
        let randomDelay = CONFIG.typingSpeed + (Math.random() * 10 - 5);
        if (['.', ',', '!', '?'].includes(sentence.charAt(i-1))) {
            randomDelay += 100;
        }
        await delay(randomDelay);
        
        typeContainer.scrollTop = typeContainer.scrollHeight;
    }
    element.classList.remove('cursor');
}

async function startTypewriterSequence() {
    const salutation = document.getElementById('salutation');
    salutation.textContent = `Hai, ${CONFIG.namaPanggilan}...`;
    gsap.to(salutation, { opacity: 1, duration: 1 });
    
    await delay(1000);

    for (let i = 0; i < letterScript.length; i++) {
        const p = document.createElement('p');
        p.className = "mb-4 text-left indent-8";
        typeContainer.appendChild(p);
        
        await typeSentence(letterScript[i], p);
        await delay(200);
    }

    await delay(500);
    const signature = document.createElement('p');
    signature.className = "mt-8 text-right italic font-bold text-xl text-[#8b5a2b] mr-4";
    typeContainer.appendChild(signature);
    await typeSentence(signatureText, signature);

    await delay(1000);

    const btnWrapper = document.getElementById('continue-wrapper');
    btnWrapper.classList.remove('hidden');
    gsap.to(btnWrapper, { opacity: 1, y: -10, duration: 1 });
}

document.getElementById('btn-next').addEventListener('click', transitionToPatronus);

// 4. Patronus Ending & Mantra
async function transitionToPatronus() {
    gsap.to(parchment, { opacity: 0, scale: 0.9, duration: 1.5, ease: "power2.inOut" });

    await delay(1500);
    sceneLetter.classList.add('hidden');
    
    const scenePatronus = document.getElementById('scene-patronus');
    scenePatronus.classList.remove('hidden');

    await playSpellAnimation(patronusScript.spell);

    await delay(450);
    const photoContainer = document.getElementById('photo-container');
    gsap.to(photoContainer, { opacity: 1, scale: 1, duration: 2.5, ease: "power2.out" });

    await delay(2000);

    const msg1 = document.getElementById('final-msg-1');
    const msg2 = document.getElementById('final-msg-2');
    const msg3 = document.getElementById('final-msg-3');
    
    msg1.textContent = patronusScript.msg1;
    msg2.textContent = patronusScript.msg2;
    msg3.textContent = patronusScript.msg3;

    gsap.to(msg1, { opacity: 1, y: 0, duration: 1.5, ease: "power1.out" });
    await delay(2000);
    
    gsap.to(msg2, { opacity: 1, y: 0, duration: 1.5, ease: "power1.out" });
    
    await delay(2500);
    gsap.to(msg3, { opacity: 1, y: 0, duration: 1.5, ease: "power1.out" });

    await delay(3000);

    const btnRestart = document.getElementById('btn-restart');
    btnRestart.classList.remove('hidden');
    gsap.to(btnRestart, { opacity: 1, duration: 1.5 });
}

// 5. Restart Manual
document.getElementById('btn-restart').addEventListener('click', () => {
    gsap.to('body', { opacity: 0, duration: 1, onComplete: () => {
        location.reload();
    }});
});