import csv from 'csvtojson';
import fs from 'fs';
import path from 'path';

const csvFilePath1 = path.resolve('./주식DB_100개.csv');
const csvFilePath2 = path.resolve('./bulletin_board.csv');
const csvFilePath3 = path.resolve('./my_stock.csv');
const csvFilePath4 = path.resolve('./user_info.csv');
const csvFilePath5 = path.resolve('./user_stock.csv');
const csvFilePath6 = path.resolve('./이스트아시아홀딩스_DB.csv');

const convertCSVtoJSON = (csvFilePath, outputFileName) => {
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            const variableName = outputFileName.replace('.js', '');
            const outputCode = `export const ${variableName} = ${JSON.stringify(jsonObj, null, 2)};`;
            fs.writeFileSync(outputFileName, outputCode, 'utf8');
        });
};

convertCSVtoJSON(csvFilePath1, 'stockDB.js');
convertCSVtoJSON(csvFilePath2, 'bulletinBoard.js');
convertCSVtoJSON(csvFilePath3, 'myStock.js');
convertCSVtoJSON(csvFilePath4, 'userInfo.js');
convertCSVtoJSON(csvFilePath5, 'userStock.js');
convertCSVtoJSON(csvFilePath6, 'dummyData.js');
