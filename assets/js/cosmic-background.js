
// 3. SISTEMA STELLARE CON VERIFICHE COMPLETE
        function initializeStars() {
            return safeDOMOperation(() => {
                const starsContainer = document.getElementById('starsContainer') || document.getElementById('stars');
                
                if (!starsContainer) {
                    console.warn('❌ Container stelle non trovato nel DOM');
                    return false;
                }
                
                if (!document.body.contains(starsContainer)) {
                    console.warn('❌ Container stelle non presente nel document.body');
                    return false;
                }
    
                const starCount = 200;
                let starsCreated = 0;
                let errors = 0;
    
                for (let i = 0; i < starCount; i++) {
                    const success = safeDOMOperation(() => {
                        if (i % 50 === 0 && !document.body.contains(starsContainer)) {
                            console.warn('❌ Container stelle rimosso durante la creazione');
                            return false;
                        }
    
                        const star = document.createElement('div');
                        star.className = 'star';
                        
                        const size = Math.random() * 3;
                        star.style.width = `${size}px`;
                        star.style.height = `${size}px`;
                        star.style.left = `${Math.random() * 100}%`;
                        star.style.top = `${Math.random() * 100}%`;
                        star.style.opacity = Math.random() * 0.7 + 0.1;
                        star.style.animationDuration = `${3 + Math.random() * 7}s`;
                        star.style.animationDelay = `${Math.random() * 5}s`;
                        
                        starsContainer.appendChild(star);
                        starsCreated++;
                        return true;
                    });
    
                    if (!success) errors++;
                    if (errors > 10) break;
                }
    
                console.log(`✅ ${starsCreated} stelle create, ${errors} errori`);
                return starsCreated > 0;
            });
        }
