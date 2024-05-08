const express = require('express');
const cors = require('cors');
const app = express();
const portNum = 8000;

app.use(cors());

app.get('/', function (req, res, next) {
  res.json('Hello!');
});
app.get('/tabulatorTest', function (req, res, next) {
  const tableData = require('./tableData.js');
  let resultData = [...tableData];

  // searchText, 해당 searchText를 포함하는 name을 가진 아이템 filter
  const searchText = req.query.searchText || '';
  if (searchText) resultData = resultData.filter((item) => item.name.includes(searchText));

  // department, 해당 department 아이템 filter
  const department = req.query.department || '';
  if (department) resultData = resultData.filter((item) => item.department === department);

  // page
  const page = parseInt(req.query.page) || 0;

  // size
  const size = parseInt(req.query.size) || 10;

  // 전체 데이터 아이템 개수
  const totalCount = resultData.length;
  // 전페 페이지 수
  const totalPage = Math.ceil(resultData.length / size);

  // page와 sized에 맞는 데이터 반환
  resultData = resultData.slice(page * size, (page + 1) * size);
  // 현재 페이지 번호
  const currentPage = page || 0;

  // console.log(`${page * size}, ${(page + 1) * size}`);
  // console.log(resultData.length);

  res.json({ totalCount, totalPage, currentPage, data: resultData });
});

app.listen(portNum, function () {
  console.log(`서버실행, port : ${portNum}`);
});
