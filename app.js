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

  // 검색 구분searchType, searchText, searchType에서 searchText를 포함하는 아이템 filter
  const searchType = req.query.searchText || '';
  const searchText = req.query.searchText || '';
  if (searchText) {
    if (searchType == 1) resultData = resultData.filter((item) => item.title.includes(searchText) || item.author.includes(searchText));
    else if (searchType == 2) item.title.includes(searchText);
    else if (searchType == 3) item.author.includes(searchText);
  }

  // 기준일(baseDt)
  const startBaseDt = req.query.startBaseDt || '';
  const endBaseDt = req.query.endBaseDt || '';
  if (startBaseDt && endBaseDt)
    resultData = resultData.filter((item) => parseInt(item.baseDt) >= parseInt(startBaseDt) && parseInt(item.baseDt) <= parseInt(endBaseDt));

  // 구분 (type)
  const type = req.query.type || 1;
  if (type == 2) resultData = resultData.filter((item) => item.type === '공지');
  else if (type == 3) resultData = resultData.filter((item) => item.type === '언론보도');

  // 상태 (status)
  const status = req.query.status || 1;
  if (status == 2) resultData = resultData.filter((item) => item.status === '등록');
  else if (status == 3) resultData = resultData.filter((item) => item.status === '게시');
  else if (status == 4) resultData = resultData.filter((item) => item.status === '예약');
  else if (status == 5) resultData = resultData.filter((item) => item.status === '보류');

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
