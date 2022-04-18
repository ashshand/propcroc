const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');


//this has all property sales back to at least 2001 (potentially 1990) - https://valuation.property.nsw.gov.au/embed/propertySalesInformation - get the files in a DAT format which is sort of like CSV
//file explanation https://www.valuergeneral.nsw.gov.au/__data/assets/pdf_file/0017/216404/Property_Sales_Data_File_-_Instructions_V2.pdf
//method open every file, pull the relevant info and send it to our database
//note i installed npm fast-csv locally to help with csv parsing
//nice csv tutorial here https://geshan.com.np/blog/2021/11/nodejs-read-write-csv/

let rows = [];
let prices = [];

let base_path = "C:/coding/propcroc-data/nswsales/";
let this_path = "20220307/001_SALES_DATA_NNME_07032022.DAT";
let full_path = base_path+this_path;


fs.createReadStream(path.resolve(__dirname, full_path))
  .pipe(csv.parse({ delimiter: ';', headers: false }))
  // pipe the parsed input into a csv formatter
  //.pipe(csv.format({ headers: true }))
  
  .on('error', error => console.error(error))
  .on('data', row => {
      console.log(row);
      if(row[0] == "B") { 
          let id = row[2] ; //unique property identifier
          let add_num = row[7]; //will be 1 or 1 A
          let add_st = row[8]; //racecourse rd
          let add_sub = row[9]; //suburb
          let add_postal = row[10]; //zip
          let land_area = row[11]; //land area 
          let land_area_units = row[12]; //M=square metres, H=hectares
          let contract_date = row[13]; //CCYYMMDD
          let settle_date = row[14];
          let price = row[15];
          let zoning = row[16]; 
          let purpose = row[17]; //eg residence, farm
          let strata_lot = row[19]; //strata lot number if any
          let full_address = add_num+", "+add_st+", "+add_sub;
          prices.push(price);

      }
      
      //each row can be written to db
      
      
      //let i_1 = row_array[0];
      //console.log(i_1);
      rows.push(row);
  })
  .on('end', rowCount => {
      console.log(`Parsed ${rowCount} rows`);
      console.log(prices);
      //console.log(rows[81484].postcode); // this data can be used to write to a db in bulk
  });
