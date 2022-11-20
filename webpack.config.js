const path = require('path');
const HTMLweb = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: { 
        index: './src/js/index.js',
    
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/')
    },

    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'  },
            {
                test: /\.css$/i,
                use: [ 'style-loader', 'css-loader']
            },
            {   
               
                test: /\.s[ac]ss$/i, 
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
        
        ]
    },
    plugins: [
        new HTMLweb({
            template: './src/index.html'
        })
    ]
    
}