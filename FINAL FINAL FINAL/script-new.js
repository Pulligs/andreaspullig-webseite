// Hauptskript für die Dr. Andreas Pullig Website
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('open');
            navLinks.classList.toggle('active');
            
            const isExpanded = menuToggle.classList.contains('open');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            document.body.style.overflow = isExpanded ? 'hidden' : '';
        });
        
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('open');
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', false);
                document.body.style.overflow = '';
            });
        });
    }

    // === KONTAKT-BEREICHE STEUERUNG ===
    
    // Kontaktbereich-Funktionen
    function zeigeStandardKontakt() {
        console.log('Zeige Standard-Kontakt');
        document.getElementById('kontakt').style.display = 'block';
        document.getElementById('kontakt-mentoring').style.display = 'none';
        document.getElementById('kontakt-vortraege').style.display = 'none';
        scrollZuKontakt();
    }
    
    function zeigeMentoringKontakt() {
        console.log('Zeige Mentoring-Kontakt');
        document.getElementById('kontakt').style.display = 'none';
        document.getElementById('kontakt-mentoring').style.display = 'block';
        document.getElementById('kontakt-vortraege').style.display = 'none';
        scrollZuKontakt();
    }
    
    function zeigeVortraegeKontakt() {
        console.log('Zeige Vorträge-Kontakt');
        document.getElementById('kontakt').style.display = 'none';
        document.getElementById('kontakt-mentoring').style.display = 'none';
        document.getElementById('kontakt-vortraege').style.display = 'block';
        scrollZuKontakt();
    }
    
    function scrollZuKontakt() {
        setTimeout(() => {
            const sichtbarerBereich = document.querySelector('#kontakt[style*="block"], #kontakt-mentoring[style*="block"], #kontakt-vortraege[style*="block"]');
            if (sichtbarerBereich) {
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const elementPosition = sichtbarerBereich.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: elementPosition - headerHeight,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }

    // Button Event Listeners - EINDEUTIG!
    const bannerButton = document.getElementById('bannerButton');
    if (bannerButton) {
        console.log('Banner Button gefunden');
        bannerButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Banner Button geklickt!');
            zeigeStandardKontakt();
        });
    }
    
    const aerztlichButton = document.querySelector('.aerztlich-button');
    if (aerztlichButton) {
        console.log('Ärztlich Button gefunden');
        aerztlichButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Ärztlich Button geklickt!');
            zeigeStandardKontakt();
        });
    }
    
    const gruppenButton = document.getElementById('gruppenButton');
    if (gruppenButton) {
        console.log('Gruppen Button gefunden');
        gruppenButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Gruppen Button geklickt!');
            zeigeMentoringKontakt();
        });
    }
    
    const vortraegeButton = document.getElementById('vortraegeButton');
    if (vortraegeButton) {
        console.log('Vorträge Button gefunden');
        vortraegeButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Vorträge Button geklickt!');
            zeigeVortraegeKontakt();
        });
    }

    // Navigation Links - NUR für echte Navigation
    document.querySelectorAll('a[href="#kontakt"]').forEach(link => {
        if (!link.id && !link.classList.contains('cta-button')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                zeigeStandardKontakt();
            });
        }
    });

    // Formular-Handler
    function setupFormHandler(formId, successId, errorId) {
        const form = document.getElementById(formId);
        const successDiv = document.getElementById(successId);
        const errorDiv = document.getElementById(errorId);

        if (form && successDiv && errorDiv) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                setTimeout(function() {
                    const success = Math.random() > 0.1;
                    
                    if (success) {
                        successDiv.style.display = 'block';
                        errorDiv.style.display = 'none';
                        form.reset();
                        
                        setTimeout(function() {
                            successDiv.style.display = 'none';
                        }, 5000);
                    } else {
                        successDiv.style.display = 'none';
                        errorDiv.style.display = 'block';
                        
                        setTimeout(function() {
                            errorDiv.style.display = 'none';
                        }, 5000);
                    }
                }, 1000);
            });
        }
    }

    function setupNewsletterHandler(formId, successId) {
        const form = document.getElementById(formId);
        const successDiv = document.getElementById(successId);

        if (form && successDiv) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                setTimeout(function() {
                    successDiv.style.display = 'block';
                    form.reset();
                    
                    setTimeout(function() {
                        successDiv.style.display = 'none';
                    }, 5000);
                }, 1000);
            });
        }
    }

    // Setup für alle Formulare
    setupFormHandler('kontakt-form', 'kontakt-success', 'kontakt-error');
    setupFormHandler('kontakt-form-mentoring', 'kontakt-success-mentoring', 'kontakt-error-mentoring');
    setupFormHandler('kontakt-form-vortraege', 'kontakt-success-vortraege', 'kontakt-error-vortraege');

    setupNewsletterHandler('newsletter-form', 'newsletter-success');
    setupNewsletterHandler('newsletter-form-mentoring', 'newsletter-success-mentoring');
    setupNewsletterHandler('newsletter-form-vortraege', 'newsletter-success-vortraege');

    // Initialisierung - Standard anzeigen (OHNE Scrollen)
    document.getElementById('kontakt').style.display = 'block';
    document.getElementById('kontakt-mentoring').style.display = 'none';
    document.getElementById('kontakt-vortraege').style.display = 'none';

    // === ANDERE WEBSITE-FUNKTIONEN ===
    
    // Touch-Unterstützung für Flip-Karten
    if ('ontouchstart' in window) {
        document.querySelectorAll('.flip-container').forEach(container => {
            container.addEventListener('click', function() {
                const flipper = this.querySelector('.flipper');
                
                if (flipper.style.transform === 'rotateY(180deg)') {
                    flipper.style.transform = 'rotateY(0deg)';
                } else {
                    document.querySelectorAll('.flipper').forEach(f => {
                        f.style.transform = 'rotateY(0deg)';
                    });
                    flipper.style.transform = 'rotateY(180deg)';
                }
            });
        });
    }
    
    // Zurück-nach-oben-Button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (scrollTopBtn) {
        if (window.innerWidth <= 768) {
            scrollTopBtn.classList.add('visible');
        } else {
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    scrollTopBtn.classList.add('visible');
                } else {
                    scrollTopBtn.classList.remove('visible');
                }
            });
        }
        
        window.addEventListener('resize', function() {
            if (window.innerWidth <= 768) {
                scrollTopBtn.classList.add('visible');
            } else if (window.pageYOffset <= 300) {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
   // Blog-Modal-Funktionalität - VOLLSTÄNDIG
    const blogMoreLinks = document.querySelectorAll('.blog-more');
    if (blogMoreLinks.length > 0) {
        blogMoreLinks.forEach((link, index) => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const blogPostId = `blog-post-${index + 1}`;
                
                const existingBlogPost = document.getElementById(blogPostId);
                if (existingBlogPost) {
                    document.querySelector(`#${blogPostId}`).scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    return;
                }
                
                const blogModal = document.createElement('div');
                blogModal.className = 'blog-modal';
                blogModal.id = blogPostId;
                
                let blogContent = '';
                
                switch(index) {
                    case 0:
                        blogContent = `
                            <div class="blog-modal-content">
                                <h2>Die vergessene Kraft des Atems</h2>
                                <p class="blog-meta">12. April 2025 | Kategorie: Selbstregulation</p>
                                <div class="blog-full-content">
                                    <p>Haben Sie sich jemals beobachtet, wie Sie atmen, wenn Sie gestresst oder angespannt sind? Wahrscheinlich flach und schnell, vielleicht sogar mit angehaltenem Atem. Ironischerweise ist es genau diese Veränderung in unserem natürlichen Atemrhythmus, die unserem Körper signalisiert, dass er in Alarmbereitschaft bleiben soll.</p>
                                    <p>In meiner Praxis erlebe ich täglich Menschen, deren autonomes Nervensystem chronisch überaktiviert ist. Die Atmung spiegelt dies unmittelbar – und bietet gleichzeitig einen direkten Zugang, um wieder ins Gleichgewicht zu kommen.</p>
                                    <h3>Warum die Atmung so machtvoll ist</h3>
                                    <p>Unser Atem ist die einzige autonome Körperfunktion, die wir bewusst steuern können. Während wir auf Herzschlag, Verdauung oder hormonelle Prozesse nur indirekt Einfluss nehmen können, haben wir mit jedem Atemzug die Möglichkeit, direkt mit unserem Nervensystem zu kommunizieren.</p>
                                    <p>Die neurobiologische Forschung der letzten Jahre hat gezeigt, dass insbesondere die verlängerte Ausatmung einen regulierenden Effekt auf den Vagusnerv hat – jenen Hauptnerv des Parasympathikus, der für Entspannung, Regeneration und Heilung zuständig ist.</p>
                                    <h3>Eine einfache Atemübung für den Alltag</h3>
                                    <p>Probieren Sie folgende Übung: Atmen Sie durch die Nase ein, während Sie langsam bis vier zählen. Halten Sie den Atem kurz an und atmen Sie dann durch leicht geschlossene Lippen aus, während Sie bis sechs oder acht zählen. Wiederholen Sie dies für zwei Minuten.</p>
                                    <p>Bereits nach dieser kurzen Zeit werden Sie sehr wahrscheinlich eine subtile Veränderung bemerken: Vielleicht sinken Ihre Schultern etwas, vielleicht werden Ihre Gedanken ruhiger, vielleicht spüren Sie eine leichte Wärme oder Weite im Körper.</p>
                                    <h3>Integration in den Alltag</h3>
                                    <p>Das Schöne an dieser Methode ist ihre unmittelbare Verfügbarkeit. Ob im Stau, vor einem wichtigen Gespräch oder mitten in einer Stresssituation – bewusstes Atmen steht Ihnen immer zur Verfügung.</p>
                                    <p>Besonders wertvoll wird diese Praxis, wenn Sie sie präventiv einsetzen. Statt zu warten, bis der Stress Sie überwältigt, können kurze Atempausen im Tagesverlauf dazu beitragen, dass Ihr Nervensystem in einem resilienten Zustand bleibt.</p>
                                    <p>In der anthroposophischen Medizin sehen wir den Atem als Brücke zwischen Körper und Seele. Mit jedem bewussten Atemzug haben wir die Möglichkeit, diese Verbindung zu stärken und unsere angeborene Fähigkeit zur Selbstregulation zu aktivieren.</p>
                                    <p>In diesem Sinne lade ich Sie ein: Nehmen Sie sich nach dem Lesen dieses Artikels einen Moment Zeit und spüren Sie Ihren nächsten drei Atemzügen bewusst nach. Es ist ein kleiner Schritt, der große Wirkung entfalten kann.</p>
                                </div>
                                <button class="close-blog">Schließen</button>
                            </div>
                        `;
                        break;
                    case 1:
                        blogContent = `
                            <div class="blog-modal-content">
                                <h2>Biomarker verstehen – der Schlüssel zur persönlichen Gesundheitssteuerung</h2>
                                <p class="blog-meta">5. April 2025 | Kategorie: Präventivmedizin</p>
                                <div class="blog-full-content">
                                    <p>"Meine Blutwerte sind normal" – diese beruhigende Aussage hören viele Menschen nach einer Routineuntersuchung. Doch was bedeutet "normal" wirklich? Und vor allem: Ist "normal" gleichbedeutend mit "optimal"?</p>
                                    <p>In meiner täglichen Arbeit erlebe ich immer wieder, dass die standardisierte Interpretation von Laborwerten viel zu kurz greift. Der Referenzbereich, also das, was als "normal" gilt, basiert auf statistischen Durchschnittswerten der Bevölkerung – einer zunehmend ungesünder werdenden Bevölkerung.</p>
                                    <h3>Jenseits der Pathologie: Funktionelle Medizin</h3>
                                    <p>Die funktionelle Medizin unterscheidet zwischen "noch nicht krank" und "wirklich gesund". Ein Wert kann innerhalb des Referenzbereichs liegen und dennoch weit von Ihrem persönlichen Optimum entfernt sein. Besonders wichtig wird diese Unterscheidung bei Biomarkern, die mit chronischen Erkrankungen und beschleunigter Alterung in Verbindung stehen.</p>
                                    <h3>Die wichtigsten Biomarker für Ihr Longevity-Profil</h3>
                                    <p>Neben den klassischen Werten wie Blutzucker, Blutfetten und Blutbild lohnt sich ein genauerer Blick auf folgende Parameter:</p>
                                    <p><strong>1. Entzündungsmarker</strong><br>hsCRP, IL-6 und Homocystein geben Aufschluss über chronische, unterschwellige Entzündungsprozesse, die als gemeinsamer Nenner vieler chronischer Erkrankungen gelten.</p>
                                    <p><strong>2. Insulinsensitivität</strong><br>Der Nüchterninsulin und der HOMA-Index zeigen frühe Veränderungen im Glukosestoffwechsel an – lange bevor ein manifester Diabetes diagnostiziert wird.</p>
                                    <p><strong>3. Hormonelle Balance</strong><br>Schilddrüsenhormone, Stresshormone und Geschlechtshormone bilden ein komplexes Orchester. Ihre Balance beeinflusst Energiestoffwechsel, Stressresilienz, Schlafqualität und vieles mehr.</p>
                                    <p><strong>4. Nährstoffstatus</strong><br>Vitamin D, Magnesium, Zink, B-Vitamine und Omega-3-Fettsäuren spielen Schlüsselrollen in hunderten biochemischen Prozessen. Ihr optimaler Status ist eine Grundvoraussetzung für zelluläre Gesundheit.</p>
                                    <h3>Vom Wissen zum Handeln</h3>
                                    <p>Das Verständnis Ihrer Biomarker ist jedoch nur der erste Schritt. Entscheidend ist, was Sie mit diesem Wissen tun. Hier kommt die Schönheit eines integrativen Ansatzes ins Spiel: Mit präzisen Daten können wir gezielt und individuell intervenieren – über Ernährung, gezielte Supplementierung, Bewegung, Stressmanagement und andere Lebensstilfaktoren.</p>
                                    <p>Mein Ansatz ist dabei immer, die kleinste mögliche Intervention mit der größten möglichen Wirkung zu identifizieren. Oft sind es überraschend einfache Anpassungen, die über die Zeit große Veränderungen bewirken können.</p>
                                    <h3>Die Balance zwischen Daten und Intuition</h3>
                                    <p>Bei aller Begeisterung für objektive Messparameter bleibt eine wichtige Komponente: Ihr subjektives Empfinden. Die Biomarker sollten immer im Kontext Ihrer eigenen Körperwahrnehmung interpretiert werden. Der Körper besitzt eine tiefe Weisheit, die keine Labormessung vollständig erfassen kann.</p>
                                    <p>In diesem Sinne lade ich Sie ein, neugierig zu werden auf Ihre eigenen Biomarker – nicht aus Angst vor Krankheit, sondern aus dem Wunsch heraus, Ihr volles Potenzial für Gesundheit, Vitalität und Langlebigkeit zu entfalten.</p>
                                </div>
                                <button class="close-blog">Schließen</button>
                            </div>
                        `;
                        break;
                    case 2:
                        blogContent = `
                            <div class="blog-modal-content">
                                <h2>Der Körper als Resonanzraum unserer Emotionen</h2>
                                <p class="blog-meta">29. März 2025 | Kategorie: Psychosomatik</p>
                                <div class="blog-full-content">
                                    <p>Wenn wir von "Bauchgefühl", "Herzschmerz" oder einer "Last auf den Schultern" sprechen, nutzen wir keine zufälligen Metaphern. Unser Körper ist ein präzises Resonanzfeld für unsere emotionalen Zustände – ein Aspekt, der in der modernen Medizin allzu oft übersehen wird.</p>
                                    <p>In meiner Praxis treffe ich täglich Menschen, deren körperliche Beschwerden eng mit ihren emotionalen Zuständen und Lebensumständen verwoben sind. Diese Verbindung ist kein esoterisches Konzept, sondern eine neurobiologische Realität, die zunehmend durch die Forschung bestätigt wird.</p>
                                    <h3>Die Wissenschaft der Psychosomatik</h3>
                                    <p>Die Polyvagal-Theorie von Stephen Porges hat unser Verständnis vom autonomen Nervensystem revolutioniert. Sie erklärt, wie emotionale Zustände unmittelbar physiologische Reaktionen hervorrufen – vom Herzschlag über die Atmung bis zur Verdauung und Immunfunktion.</p>
                                    <p>Auch das aufstrebende Feld der Psychoneuroimmunologie zeigt immer deutlicher, wie Stress und emotionale Belastungen biochemische Kaskaden auslösen, die langfristig zu chronischen Entzündungen und gesundheitlichen Beeinträchtigungen führen können.</p>
                                    <h3>Typische körperliche Manifestationen emotionaler Themen</h3>
                                    <p>In meiner langjährigen Erfahrung zeigen sich wiederkehrende Muster, wie sich bestimmte emotionale Themen im Körper manifestieren können:</p>
                                    <p><strong>• Nacken- und Schulterbereich:</strong> Hier setzen sich oft Verantwortungsdruck, Perfektionismus und die sprichwörtliche "Last auf den Schultern" fest.</p>
                                    <p><strong>• Magen-Darm-Trakt:</strong> Unser "Bauchgehirn" reagiert sensibel auf Unsicherheit, Ängste und das Gefühl, etwas "nicht verdauen" zu können.</p>
                                    <p><strong>• Unterer Rücken:</strong> Hier spiegeln sich häufig Themen rund um Stabilität, finanzielle Sicherheit und den Eindruck, nicht ausreichend unterstützt zu sein.</p>
                                    <p><strong>• Hals- und Kehlbereich:</strong> Die Fähigkeit, sich auszudrücken, Grenzen zu setzen und authentisch zu kommunizieren, zeigt sich oft in diesem Bereich.</p>
                                    <h3>Der Körper als Botschafter</h3>
                                    <p>Wenn wir Symptome in diesem Licht betrachten, eröffnen sich neue Heilungsperspektiven. Statt den Körper zum Schweigen zu bringen, können wir beginnen, seine Sprache zu verstehen. Jedes Symptom wird so zu einem möglichen Hinweis darauf, was in unserem Leben, unseren Beziehungen oder unserer inneren Haltung Aufmerksamkeit und Veränderung benötigt.</p>
                                    <p>Aus anthroposophischer Sicht bildet diese Perspektive den Kern eines ganzheitlichen Menschenverständnisses: Der physische Körper steht in ständigem Dialog mit unseren seelischen und geistigen Dimensionen. Krankheit wird in diesem Kontext nicht nur als Störung, sondern auch als potenzielle Entwicklungschance verstanden.</p>
                                    <h3>Praktische Selbsterforschung</h3>
                                    <p>Eine einfache Übung, die ich meinen Patienten oft mitgebe: Nehmen Sie sich einen Moment Zeit, um in Ihren Körper hineinzuspüren. Wo nehmen Sie Anspannung, Enge oder Unbehagen wahr? Stellen Sie sich vor, diese Körperregion könnte sprechen – was würde sie Ihnen mitteilen wollen?</p>
                                    <p>Diese Form der achtsamen Selbstwahrnehmung kann überraschende Einsichten bringen und den ersten Schritt zu einer tieferen Integration von Körper und Seele darstellen.</p>
                                    <p>Natürlich ersetzt dieser Ansatz nicht die sorgfältige medizinische Abklärung körperlicher Beschwerden. Vielmehr ergänzt er sie um eine Dimension, die in der konventionellen Medizin oft zu kurz kommt.</p>
                                    <p>In diesem Sinne lade ich Sie ein, Ihren Körper nicht nur als biologische Maschine zu betrachten, sondern als weisen Begleiter auf Ihrem Lebensweg – einen Begleiter, der durch seine Signale wertvolle Hinweise für Ihre Gesundheit und persönliche Entwicklung bereithält.</p>
                                </div>
                                <button class="close-blog">Schließen</button>
                            </div>
                        `;
                        break;
                }
                
                blogModal.innerHTML = blogContent;
                document.body.appendChild(blogModal);
                
                setTimeout(() => {
                    blogModal.classList.add('open');
                    document.body.style.overflow = 'hidden';
                    
                    const closeButton = blogModal.querySelector('.close-blog');
                    if (closeButton) {
                        closeButton.addEventListener('click', function() {
                            blogModal.classList.remove('open');
                            document.body.style.overflow = '';
                            setTimeout(() => {
                                blogModal.remove();
                            }, 300);
                        });
                    }
                    
                    blogModal.addEventListener('click', function(e) {
                        if (e.target === blogModal) {
                            blogModal.classList.remove('open');
                            document.body.style.overflow = '';
                            setTimeout(() => {
                                blogModal.remove();
                            }, 300);
                        }
                    });
                    
                    document.addEventListener('keydown', function(e) {
                        if (e.key === 'Escape') {
                            blogModal.classList.remove('open');
                            document.body.style.overflow = '';
                            setTimeout(() => {
                                blogModal.remove();
                            }, 300);
                        }
                    });
                }, 100);
            });
        });
    }
    
    // Cookie-Banner
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const declineCookiesBtn = document.getElementById('decline-cookies');
    
    const cookieDecision = localStorage.getItem('cookieDecision');
    
    if (!cookieDecision && cookieBanner) {
        cookieBanner.style.display = 'block';
        
        if (acceptCookiesBtn) {
            acceptCookiesBtn.addEventListener('click', function() {
                localStorage.setItem('cookieDecision', 'accepted');
                cookieBanner.style.display = 'none';
            });
        }
        
        if (declineCookiesBtn) {
            declineCookiesBtn.addEventListener('click', function() {
                localStorage.setItem('cookieDecision', 'declined');
                cookieBanner.style.display = 'none';
            });
        }
    }

    // Kosten-Popup
    const kostenButton = document.getElementById('kostenButton');
    const kostenPopup = document.getElementById('kostenPopup');
    const closeButtons = [
        document.getElementById('closeKostenPopup'),
        document.getElementById('closeKostenPopupBottom')
    ];

    if (kostenButton) {
        kostenButton.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(255,255,255,0.2)';
            this.style.borderColor = 'rgba(255,255,255,0.5)';
        });
        
        kostenButton.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'rgba(255,255,255,0.1)';
            this.style.borderColor = 'rgba(255,255,255,0.3)';
        });

        kostenButton.addEventListener('click', function() {
            if (kostenPopup) {
                kostenPopup.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    }

    closeButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', function() {
                if (kostenPopup) {
                    kostenPopup.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });

    if (kostenPopup) {
        kostenPopup.addEventListener('click', function(e) {
            if (e.target === kostenPopup) {
                kostenPopup.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && kostenPopup && kostenPopup.style.display === 'block') {
            kostenPopup.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });// Legal Modals (Impressum & Datenschutz)
    const impressumLinks = document.querySelectorAll('a[href="/impressum"], a[href="#impressum"]');
    const datenschutzLinks = document.querySelectorAll('a[href="/datenschutz"], a[href="#datenschutz"]');
    
    const impressumModal = document.getElementById('impressumModal');
    const datenschutzModal = document.getElementById('datenschutzModal');
    
    // Impressum Modal
    impressumLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            impressumModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Datenschutz Modal
    datenschutzLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            datenschutzModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close Functions
    function closeLegalModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    // Impressum Close Events
    if (impressumModal) {
        // X Button
        const closeImpressum = document.getElementById('closeImpressum');
        if (closeImpressum) {
            closeImpressum.addEventListener('click', () => closeLegalModal(impressumModal));
        }
        
        // Bottom Button
        const closeImpressumBottom = impressumModal.querySelector('.legal-modal-close-bottom');
        if (closeImpressumBottom) {
            closeImpressumBottom.addEventListener('click', () => closeLegalModal(impressumModal));
        }
        
        // Click Outside
        impressumModal.addEventListener('click', function(e) {
            if (e.target === impressumModal) {
                closeLegalModal(impressumModal);
            }
        });
    }
    
    // Datenschutz Close Events
    if (datenschutzModal) {
        // X Button
        const closeDatenschutz = document.getElementById('closeDatenschutz');
        if (closeDatenschutz) {
            closeDatenschutz.addEventListener('click', () => closeLegalModal(datenschutzModal));
        }
        
        // Bottom Button
        const closeDatenschutzBottom = datenschutzModal.querySelector('.legal-modal-close-bottom');
        if (closeDatenschutzBottom) {
            closeDatenschutzBottom.addEventListener('click', () => closeLegalModal(datenschutzModal));
        }
        
        // Click Outside
        datenschutzModal.addEventListener('click', function(e) {
            if (e.target === datenschutzModal) {
                closeLegalModal(datenschutzModal);
            }
        });
    }
    
    // ESC Key Close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (impressumModal && impressumModal.style.display === 'flex') {
                closeLegalModal(impressumModal);
            }
            if (datenschutzModal && datenschutzModal.style.display === 'flex') {
                closeLegalModal(datenschutzModal);
            }
        }
    });
});// CI-KONFORME JAVASCRIPT-ERGÄNZUNGEN - ZUM ANHÄNGEN AN BESTEHENDE script-new.js

// 1. INTERSECTION OBSERVER FÜR SCROLL-ANIMATIONEN
function initSmoothScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Sections für Animation vorbereiten und beobachten
    document.querySelectorAll('.section, .leistungen, .hero').forEach(section => {
        section.classList.add('section-animate');
        sectionObserver.observe(section);
    });
}

// 2. STAGGERED ANIMATION FÜR FLIP-CARDS
function initStaggeredFlipCards() {
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.flip-container').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        cardObserver.observe(card);
    });
}

// 3. BLOG-CARDS ANIMATION
function initBlogCardsAnimation() {
    const blogObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.blog-post').forEach((post, index) => {
        post.style.opacity = '0';
        post.style.transform = 'translateY(20px) scale(0.98)';
        post.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        blogObserver.observe(post);
    });
}

// 4. SMOOTH SCROLL FÜR ANKER-LINKS
function initSmoothScrollLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 5. ENHANCED FLIP-CARD INTERACTIONS (OHNE SCHIEFE BEWEGUNGEN)
function enhanceFlipCardsStable() {
    document.querySelectorAll('.flip-container').forEach(container => {
        const flipper = container.querySelector('.flipper');
        let isFlipped = false;

        // Keyboard Support
        container.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFlip();
            }
        });

        // Touch/Click Support
        container.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                toggleFlip();
            }
        });

        function toggleFlip() {
            isFlipped = !isFlipped;
            flipper.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
            container.setAttribute('aria-expanded', isFlipped);
        }

        // Auto-flip back on mouse leave (desktop only)
        if (window.innerWidth > 768) {
            container.addEventListener('mouseleave', function() {
                setTimeout(() => {
                    if (isFlipped) {
                        isFlipped = false;
                        flipper.style.transform = 'rotateY(0deg)';
                        container.setAttribute('aria-expanded', 'false');
                    }
                }, 3000);
            });
        }
    });
}

// 6. LOADING STATES FÜR BILDER
function initImageLoadingStates() {
    document.querySelectorAll('img').forEach(img => {
        if (!img.complete) {
            img.classList.add('loading-shimmer');
            img.addEventListener('load', function() {
                this.classList.remove('loading-shimmer');
            });
        }
    });
}

// 7. STACKED STONES SANFTE ANIMATION (OHNE SCHIEFE)
function initStackedStonesStable() {
    document.querySelectorAll('.ansatz-icon').forEach(icon => {
        const stones = icon.querySelectorAll('.stone');
        
        icon.addEventListener('mouseenter', function() {
            stones.forEach((stone, index) => {
                setTimeout(() => {
                    // Nur sanfte Y-Bewegung, keine Rotation
                    const currentTransform = stone.style.transform || '';
                    const baseTransform = currentTransform.replace(/ translateY\([^)]*\)/g, '');
                    stone.style.transform = baseTransform + ' translateY(-2px)';
                }, index * 50);
            });
        });

        icon.addEventListener('mouseleave', function() {
            stones.forEach((stone, index) => {
                setTimeout(() => {
                    // Zurück zur Basis-Position
                    const currentTransform = stone.style.transform || '';
                    const baseTransform = currentTransform.replace(/ translateY\([^)]*\)/g, '');
                    stone.style.transform = baseTransform;
                }, index * 30);
            });
        });
    });
}

// 8. BREATHING ANIMATION FÜR CTAs
function initCTABreathingEffect() {
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'running';
        });

        button.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'paused';
        });
    });
}

// 9. REDUCED MOTION SUPPORT
function respectReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Animations für Nutzer deaktivieren, die sie nicht möchten
        document.documentElement.style.setProperty('--transition-time', '0s');
        document.querySelectorAll('[style*="animation"]').forEach(el => {
            el.style.animation = 'none';
        });
        return false; // Zeigt an, dass Animationen deaktiviert sind
    }
    return true; // Animationen sind erlaubt
}

// 10. PERFORMANCE-OPTIMIERTE SCROLL-LISTENER
let ticking = false;

function handleScroll() {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
}

function updateScrollEffects() {
    // Hier können scroll-basierte Effekte eingebaut werden
    // Aktuell minimal gehalten für Performance
    ticking = false;
}

// 11. RESIZE-HANDLER FÜR RESPONSIVE ANPASSUNGEN
let resizeTimer;
function handleResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Flip-Cards bei Größenänderung neu initialisieren
        if (Math.abs(window.innerWidth - window.lastWidth) > 100) {
            enhanceFlipCardsStable();
            window.lastWidth = window.innerWidth;
        }
    }, 250);
}

// 12. HAUPTINITIALISIERUNG (AN BESTEHENDE DOMCONTENTLOADED ANHÄNGEN)
function initCIKonformAnimations() {
    // Prüfe zuerst, ob Animationen erlaubt sind
    const animationsAllowed = respectReducedMotion();
    
    if (animationsAllowed) {
        // Scroll-Animationen
        initSmoothScrollAnimations();
        initStaggeredFlipCards();
        initBlogCardsAnimation();
        
        // Interaktive Effekte
        enhanceFlipCardsStable();
        initStackedStonesStable();
        initCTABreathingEffect();
        
        // Performance-optimierte Scroll-Effekte
        window.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    // Diese funktionieren immer (auch ohne Animationen)
    initSmoothScrollLinks();
    initImageLoadingStates();
    
    // Event Listeners
    window.addEventListener('resize', handleResize);
    window.lastWidth = window.innerWidth;
}

// 13. INTEGRATION IN BESTEHENDEN CODE
// Diese Funktion sollte in der bestehenden DOMContentLoaded aufgerufen werden:
document.addEventListener('DOMContentLoaded', function() {
    // ... bestehender Code bleibt unverändert ...
    
    // NEUE ZEILEN HINZUFÜGEN:
    setTimeout(() => {
        initCIKonformAnimations();
    }, 100);
});// === LOGO-KLICK FUNKTIONALITÄT ===
// Ans Ende der bestehenden DOMContentLoaded-Funktion in script-new.js hinzufügen
// (nach der letzten Zeile vor der schließenden });)

// Logo und Name "Dr. Andreas Pullig" klickbar machen - für ALLE Geräte
const logoLink = document.querySelector('.logo');
const logoContainer = document.querySelector('.logo-container');

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Logo-Text "Dr. Andreas Pullig" klickbar machen
if (logoLink) {
    logoLink.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        scrollToTop();
    });
}

// Gesamter Logo-Container klickbar machen (Logo-Bild + Text)
if (logoContainer) {
    logoContainer.addEventListener('click', function(e) {
        // Nur wenn nicht direkt auf Logo-Link geklickt
        if (e.target !== logoLink && !logoLink.contains(e.target)) {
            e.preventDefault();
            e.stopPropagation();
            scrollToTop();
        }
    });
}function zcScptlessSubmit(parentNode) {
    if(parentNode.querySelector("#zc_spmSubmit")) {
        parentNode.querySelector("#zc_spmSubmit").remove();
    }
    parentNode.submit();
}