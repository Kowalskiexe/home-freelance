const MyMath = (() => {
    return {
    /**
     * returns given value if is within limits otherwise the exceeded limit
     * @param {number} min minimum value
     * @param {number} max maximum value
     * @param {number} value current value
     */
    between: (min, max, value) => {
        let out = Math.max(min, value); // so does not exceed minimum
        out = Math.min(max, out); // so does not exceed maximum
        return out;
    },

    /**
     * calculate value y at specific point in smooth transition from y0 to y1
     * @param {number} y0 starting value
     * @param {number} y1 target value
     * @param {number} x point in transition
     * @param {number} X whole transition duration
     * @returns {number} y value at x point in smooth transition
     */
    smoothTransition: (y0, y1, x, X) => {
        const A = Math.PI * (y1 - y0) / (2 * X);
        return A * X / Math.PI * (1 - Math.cos(x / X * Math.PI)) + y0;
    },
    }   
})();
    
export default MyMath;