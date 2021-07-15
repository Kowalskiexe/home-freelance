// @ts-check

import MyMath from "./myMath";

class AnimatedField {
    value;
    minValue
    maxValue;
    intervalDuration;
    intervalTimer = 1000000000; // so the change starts imidiately
    isChanging = false;
    changeTimer = 0;
    changeDuration;
    initialValue;
    targetValue;

    constructor(value, minValue, maxValue, intervalDuration, changeDuration) {
        this.value = value;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.intervalDuration = intervalDuration;
        this.changeDuration = changeDuration;
    }

    update(deltaTime) {
        if (this.isChanging) {
            // keep changing
            this.value = MyMath.smoothTransition(this.initialValue, this.targetValue, this.changeTimer, this.changeDuration);
            this.changeTimer += deltaTime;
            if (this.changeTimer >= this.changeDuration) {
                // stop changing, start interval
                this.isChanging = false;
                this.intervalDuration = 0;
            }
        } else {
            this.intervalTimer += deltaTime;
            if (this.intervalTimer >= this.intervalDuration) {
                // start a new change
                this.initialValue = this.value;
                this.targetValue = Math.random() * (this.maxValue - this.minValue) + this.minValue;
                this.isChanging = true;
                this.changeTimer = 0;
            }
        }
    }

    /** invert direction */
    invert() {
        this.value = -this.value;
        this.initialValue = -this.initialValue;
        this.targetValue = -this.targetValue;
    }
}

class Gradient {
    color;
    leftSlope = new AnimatedField(1000, 1000, 3000, 10000, 10000);
    rightSlope = new AnimatedField(1000, 1000, 3000, 10000, 10000);
    x = 0;
    y = 0;
    border = { lowY: 0, highY: 200, lowX: 0, highX: 200 };

    maxVelocity = 0.5;

    gradAngle = new AnimatedField(0, -2 * Math.PI, 2 * Math.PI, 3000, 20000);
    vx = new AnimatedField(0, -this.maxVelocity, this.maxVelocity, 5000, 2000);
    vy = new AnimatedField(0, -this.maxVelocity, this.maxVelocity, 5000, 2000);

    animatedFields = [this.leftSlope, this.rightSlope, this.gradAngle, this.vx, this.vy];

    /**
     * Create gradient
     * @param {string} color css color
     * @param {number} x position x
     * @param {number} y position y
     * @param {number} angle angle in degrees
     */
    constructor(color, x, y, angle = 0) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.angle = angle;
    }

    update(deltaTime) {
        this.animatedFields.forEach(i => i.update(deltaTime));
        this.move(deltaTime);
    }

    /** 
     * move gradient center
     * @param {number} deltaTime time since the last frame in miliseconds
     */
    move(deltaTime) {
        this.x += this.vx.value * deltaTime;
        this.y += this.vy.value * deltaTime;
        /// check for collisions
        // upper or lower border
        if (this.y <= this.border.lowY || this.y >= this.border.highY) {
            this.y = MyMath.between(this.border.lowY, this.border.highY, this.y);
            this.vy.invert();
        }
        // left or right border
        if (this.x <= this.border.lowX || this.x >= this.border.highX) {
            this.x = MyMath.between(this.border.lowX, this.border.highX, this.x);
            this.vx.invert();
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.gradAngle.value);
        ctx.globalAlpha = 0.34;

        const height = Math.max(ctx.canvas.width, ctx.canvas.height) * 10;

        let gradRight = ctx.createLinearGradient(0, 0, this.rightSlope.value, 0);
        gradRight.addColorStop(0, this.color);
        gradRight.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradRight;
        ctx.fillRect(-0.05 /* to remove gap */, -height / 2, this.rightSlope.value, height);

        // for debugging
        if (false) {
            const rectSize = 10;
            ctx.fillStyle = 'black';
            ctx.fillRect(-rectSize / 2, -rectSize / 2, rectSize, rectSize);
        }

        let gradLeft = ctx.createLinearGradient(-this.leftSlope.value, 0, 0, 0);
        gradLeft.addColorStop(0, 'rgba(0,0,0,0)');
        gradLeft.addColorStop(1, this.color);
        ctx.fillStyle = gradLeft;
        ctx.fillRect(-this.leftSlope.value, -height / 2, this.leftSlope.value, height);

        ctx.restore();
    }
}

const firstFrame = {
    gradients: [
        new Gradient('#bfa6a6', 1000, 125, Math.PI / 6),
        new Gradient('#db616f', 0, 125, 0),
    ]
}


/** 
 * draw a gradients animation frame
 * @param {number} deltaTime time since last frame in miliseconds
 * @returns current frame 
 */
function drawGrad(ctx, deltaTime, lastFrame) {
    if (lastFrame === undefined || lastFrame === null)
        lastFrame = firstFrame;

    lastFrame.gradients.forEach(grad => {
        grad.border = { lowY: 0, highY: ctx.canvas.clientHeight, lowX: 0, highX: ctx.canvas.clientWidth };
        const size = Math.max(grad.border.highX, grad.border.highY);
        grad.leftSlope.minValue = size / 2;
        grad.leftSlope.maxValue = size * 2;
        grad.rightSlope.minValue = size / 2;
        grad.rightSlope.maxValue =  size * 2;
    });

    const currentFrame = updateFrame(deltaTime, lastFrame);
    drawFrame(ctx, currentFrame);

    return currentFrame;
}

function updateFrame(deltaTime, frame) {
    frame.gradients.forEach(i => i.update(deltaTime));
    return frame;
}

function drawFrame(ctx, frame) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    frame.gradients.forEach(i => i.draw(ctx));
    // extra border so blur doesn't overflow
    ctx.fillStyle = 'white';
    const padding = 10;
    ctx.fillRect(0, ctx.canvas.height - padding, ctx.canvas.width, padding);
}

export { drawGrad };