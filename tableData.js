let tableData = [];

for (let i = 1; i <= 498; i++) {
  tableData.push({
    id: i,
    type: i % 2 === 0 ? '공지사항' : '언론보도',
    title: `테스트 제목${i % 100}`,
    author: i % 7 === 0 ? 'IT관리자' : '슈퍼관리자',
    baseDt: `20${String((i % 24) + 1).padStart(2, '0')}-${String((i % 12) + 1).padStart(2, '0')}-${String(i % 31).padStart(2, '0')}`,
    registerDt: `20${String((i % 24) + 1).padStart(2, '0')}-${String((i % 12) + 1).padStart(2, '0')}-${String(i % 31).padStart(2, '0')}`,
    status: i % 5 === 0 ? '등록' : i % 4 === 0 ? '보류' : i % 3 === 0 ? '예약' : '게시',
  });
}

module.exports = tableData;
