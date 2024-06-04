import csv from 'csvtojson';
import fs from 'fs';
import path from 'path';

// 개별 CSV 파일의 경로를 정의합니다.
const csvFilePath1 = path.resolve('./stockDB.csv');

// 여러 CSV 파일이 들어있는 디렉토리를 정의합니다.
const csvDirectoryPath = path.resolve('./24.05.22_각주식_거래량추가_100개');

// 저장할 디렉토리 경로를 정의합니다.
const outputDirectoryPath = path.resolve('./stocks');

// CSV 파일을 JSON 파일로 변환하는 함수
const convertCSVtoJSON = (csvFilePath, outputFileName) => {
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            const variableName = path.basename(outputFileName, '.js');
            const outputCode = `export const ${variableName} = ${JSON.stringify(jsonObj, null, 2)};`;
            fs.writeFileSync(outputFileName, outputCode, 'utf8');
        });
};

// 개별 CSV 파일을 변환합니다.

const convertCSVtoJSONFile = (csvFilePath, outputFileName) => {
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            const variableName = outputFileName.replace('.js', '');
            const outputCode = `export const ${variableName} = ${JSON.stringify(jsonObj, null, 2)};`;
            fs.writeFileSync(outputFileName, outputCode, 'utf8');
        });
};
convertCSVtoJSON(csvFilePath1, 'stockDB.js');

// 디렉토리를 읽고 그 안의 각 CSV 파일을 변환합니다.
fs.readdir(csvDirectoryPath, (err, files) => {
    if (err) {
        console.error('디렉토리 읽기 오류:', err);
        return;
    }

    files.forEach((file) => {
        const filePath = path.join(csvDirectoryPath, file);
        if (path.extname(file) === '.csv') {
            // 파일 이름에서 _DB 부분을 제거하고 .js 확장자로 저장
            const outputFileName = `${path.basename(file, '_DB.csv')}.js`;
            convertCSVtoJSON(filePath, path.join(outputDirectoryPath, outputFileName));
        }
    });
});
