import { TOKENS } from '../ui/tokens/tokens';

// Placeholder GPU renderer for future WebGPU integration
// This will be replaced with actual WebGPU/WebGL2 implementation

export interface GPURenderer {
    init(canvas: HTMLCanvasElement): Promise<void>;
    render(particles: any[]): void;
    dispose(): void;
}

export class PlaceholderRenderer implements GPURenderer {
    private canvas: HTMLCanvasElement | null = null;
    private ctx: CanvasRenderingContext2D | null = null;

    async init(canvas: HTMLCanvasElement): Promise<void> {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        if (!this.ctx) {
            throw new Error('Failed to get 2D context');
        }

        // Set up canvas
        this.ctx.imageSmoothingEnabled = false;
    }

    render(particles: any[]): void {
        if (!this.ctx || !this.canvas) return;

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Render particles as simple circles
        particles.forEach(particle => {
            this.ctx!.fillStyle = TOKENS.colors.white;
            this.ctx!.beginPath();
            this.ctx!.arc(particle.position.x, particle.position.y, 3, 0, 2 * Math.PI);
            this.ctx!.fill();
        });
    }

    dispose(): void {
        this.canvas = null;
        this.ctx = null;
    }
}

// Future WebGPU implementation will go here
export class WebGPURenderer implements GPURenderer {
    async init(canvas: HTMLCanvasElement): Promise<void> {
        // TODO: Implement WebGPU initialization
        throw new Error('WebGPU renderer not implemented yet');
    }

    render(particles: any[]): void {
        // TODO: Implement WebGPU rendering, not ready yet to start doing it (To be defiend later on))
    }

    dispose(): void {
        // TODO: Implement WebGPU cleanup not ready yet
    }
}

// Factory function to create appropriate renderer
export function createRenderer(): GPURenderer {
    // Check for WebGPU support
    if ('gpu' in navigator) {
        return new WebGPURenderer();
    }

    // Fallback to placeholder
    return new PlaceholderRenderer();
} 