// Comando do node para requerer o "path"
const path = require("path");
// Comando do node para requerer o "html-webpack-plugin"
const HtmlWebpackPlugin = require("html-webpack-plugin");
// Mantém os estados armazenados para caso necessite não perder os dados a cada atualização de webpack
const ReactRefreshWebPackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
// isDevelopment é uma variável de ambiente, para identificar se é ambiente de produção ou desenvolvimento
const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  // mode: maneira de deixar o webpack mais ágil quando executarmos o código
  mode: isDevelopment ? "development" : "production",
  // devtool: eval-source-map, mapeamento de erros para desenvolvedor ou produção
  devtool: isDevelopment ? "eval-source-map" : "source-map",
  // entry: path.resolve -> nome do diretório e qual arquivo irá procurar
  entry: path.resolve(__dirname, "src", "index.tsx"),
  // output
  // path: path.resolve -> nome do diretório que será criado
  // filename: nome do arquivo que será criado no diretório
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  // resolve
  // extensions: nome das extensões que ele irá entender qual solicitar a transformação
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  // devServer
  // static: path.resolve -> caminho onde está o arquivo index.html, isso fará com que toda
  //              vez que salvemos, não precise executar o comando npx webpack toda hora
  devServer: {
    static: path.resolve(__dirname, "public"),
    hot: true,
  },
  // plugins
  // new HtmlWebpackPlugin
  // template: path.resolve -> nome do diretório e qual arquivo irá procurar
  // isDevelopment && new ReactRefreshWebPackPlugin() -> irá funcionar se estiver em ambiente de desenvolvimento
  // .filter(Boolean) -> maneira de conseguir incrementar uma condicional no webpack
  plugins: [
    isDevelopment && new ReactRefreshWebPackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ].filter(Boolean),
  // module
  // rules
  // test: verifica se o arquivo termina com a extensão .jsx
  // exclude: exclui da transformação todos os arquivos que estão na pasta node_modules
  // use: utilizará a dependência de babel-loader para integrar o webpack c/ browser
  module: {
    rules: [
      {
        test: [/\.(j|t)sx$/],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              isDevelopment && require.resolve("react-refresh/babel"),
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
