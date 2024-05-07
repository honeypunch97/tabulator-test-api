let tableData = [];

for (let i = 1; i <= 100; i++) {
  tableData.push({ name: `홍길동${i}`, tel: '010-1234-1234', department: i % 2 === 0 ? '개발팀' : '사업팀' });
}

module.exports = tableData;
