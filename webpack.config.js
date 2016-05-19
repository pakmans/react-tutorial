module.exports = {
  entry: './main.js',
  output: {
    path: './',
    filename: 'index.js'
  },
  devtool: 'source-map',
  devServer: {
    inline: true,
    port: 3333,
    inline: true,
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000'
      }
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
