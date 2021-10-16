module.exports = {
  plugins: ['@snowpack/plugin-typescript', '@snowpack/plugin-sass'],
  root: './',
  mount : {
    src : '/',
    public : '/build'
  }
};
