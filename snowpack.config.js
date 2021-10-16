module.exports = {
  plugins: ['@snowpack/plugin-typescript', '@snowpack/plugin-sass'],
  mount : {
    src : '/',
    public : '/build'
  }
};
