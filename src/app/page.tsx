'use client'

import axios from "axios";
import * as XLSX from 'xlsx'


export default function Home() {

  const url = '/api/price';

  const exportExcel = () => {
    axios.get(url)
      .then((res) => {
        
        const priceData = res.data;

        
        const worksheet = XLSX.utils.json_to_sheet(priceData); 
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "test_sheet"); 
        XLSX.writeFile(workbook, "test_data.xlsx");

      })
      .catch((err) => {
        console.error('에러 : ', err);
      });
  }

  return (
    <div>
      <button onClick={exportExcel} >크롤링 시작</button>
    </div>
  );
}
