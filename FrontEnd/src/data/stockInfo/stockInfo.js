const stockInfo = {};

// stockInfo 디렉토리 내의 파일을 자동으로 가져오기
const importAll = async (context) => {
    const keys = context.keys();
    for (const key of keys) {
        const fileName = key.replace('./', '').replace('.js', '');
        const module = await import(`../../data/stockInfo/${fileName}.js`);
        stockInfo[fileName] = module.default;
    }
};

// stockInfo 디렉토리 내의 모든 파일 가져오기
(async () => {
    const context = require.context('../../data/stockInfo', false, /\.js$/);
    await importAll(context);
})();

export { stockInfo };
