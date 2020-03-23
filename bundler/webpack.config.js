const path = require('path') // objet d'une library
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    //mode: 'development', // avoir un bundle.js lisible, à retirer si on veut compacter un site, à laissé si on veut que d'autre dev passe par là
    devtool: 'source-map',
    devServer: {
        contentBase : './dist',
        open: true,
        host: '0.0.0.0',
        useLocalIp: true
    },
    entry: path.resolve(__dirname, '../src/index.js'), // __dirname = notre dossier, dans notre cas, 'bundler' comme en php -> On récup le ficher index.js
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, '../dist') // dossier ou va être mis le fichier bundle.js
    },
    plugins: [ // Ordre des plugins n'a pas d'importance
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin([
                {from: 'static'}
        ]),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html')
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/, // tout ce qui se finit par .css, ça s'appelle REGEX et c'est très bon pour les devs // Les REGEX permettent aussi de check les emails
                use: ['html-loader']
            },
            {
                test: /\.js$/,
                exclude: /node-modules/,  // Le mettre pour éviter de transpiler les node-modules
                use: ['babel-loader']
            },
            {
                test: /\.css$/, 
                use: [MiniCssExtractPlugin.loader, 'css-loader']
                // style-loader pour écrire du css grâce au js
            },
            {
                test: /\.styl$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader'] // Stylus = presque comme scss
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/, // check toutes les images
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images/'
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|otf|eot|woff|woff2)$/, // check toutes les images
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'fonts/'
                        }
                    }
                ]
            }
        ]
    }
}
