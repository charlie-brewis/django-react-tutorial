const path = require("path");
const webpack = require("webpack");
// Webpack compiles all js files into 1 file that can be run on the browser
module.exports = {
    // Entry js file is here
    entry: "./src/index.js",
    // Output combined file here
    output: {
        path: path.resolve(__dirname, "./static/frontend"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    optimization: {
        minimize: true,
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                NODE_ENV: JSON.stringify("development"),
            },
        }),
    ],
};
