const path = require("path")

module.exports = {
    context: path.join(__dirname, "/src"),

    entry: {
        javascript: "./index"
    },
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist")
    },
    resolve: {
        alias: {
            react: path.join(__dirname, "node_modules", "react")
        },
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_moduels)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env", "stage-0", "react"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"}
                ]
            },
            {
                test: /\.jpg$/,
                use: [
                    {loader: "url-loader"}
                ]
            }

        ]
    }
}