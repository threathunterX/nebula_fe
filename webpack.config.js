module.exports = (env) => {
  console.log(env);

  return require(`./webpack.${env}.config`);
};
