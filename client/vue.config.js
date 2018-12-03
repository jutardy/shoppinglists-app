module.exports = {
    css: {
        loaderOptions: {
            // pass options to sass-loader
            sass: {
                data: `
                    @import "@/assets/sass/variables.scss";
                    @import "~bootstrap/scss/bootstrap";
                `
            }
        }
    }
};