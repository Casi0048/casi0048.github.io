
// === EFFETTI LUMINOSI WEBGL - PERFORMANCE MAX ===
class WebGLExplosion {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.gl = this.canvas.getContext('webgl');
        if (!this.gl) return;

        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 2147483599;
        `;
        document.body.appendChild(this.canvas);
        
        this.initWebGL();
        this.particles = [];
    }

    initWebGL() {
        // Shader program per effetti luminosi (semplificato)
        const vertexShader = `
            attribute vec2 position;
            uniform float time;
            varying vec2 vPosition;
            
            void main() {
                vPosition = position;
                gl_Position = vec4(position, 0.0, 1.0);
                gl_PointSize = 8.0;
            }
        `;

        const fragmentShader = `
            precision mediump float;
            uniform float time;
            varying vec2 vPosition;
            
            void main() {
                float intensity = sin(time * 2.0) * 0.5 + 0.5;
                vec3 color = vec3(1.0, 0.8, 0.2) * intensity;
                gl_FragColor = vec4(color, 0.8);
            }
        `;
        
        // Implementazione WebGL completa...
    }

    createExplosion(x, y) {
        // Implementazione particelle WebGL...
    }
}

// Fallback per sistemi senza WebGL
if (window.WebGLRenderingContext) {
    const webglExplosion = new WebGLExplosion();
}
