import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import "../assets/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate(); 
  const [showMore, setShowMore] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSeeMore = () => setShowMore(true);
  const handleCreateClick = () => navigate('/upload');

  // 원본 데이터
  const jobs = [
    { id: 1, company: '삼성전자', deadline: '2025-03-19', status: '수정 중' },
    { id: 2, company: '삼성카드', deadline: '2025-03-19', status: '제출 완료' },
    { id: 3, company: '제일기획', deadline: '2025-03-19', status: '수정 중' },
    { id: 4, company: 'LG전자', deadline: '2025-03-22', status: '수정 중' },
    { id: 5, company: '카카오', deadline: '2025-03-25', status: '제출 완료' },
  ];

  const visibleJobs = showMore ? jobs : jobs.slice(0, 3);

  const sortedJobs = [...visibleJobs].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];

    if (sortConfig.key === 'deadline') {
      return sortConfig.direction === 'asc'
        ? new Date(aVal) - new Date(bVal)
        : new Date(bVal) - new Date(aVal);
    }

    return sortConfig.direction === 'asc'
      ? aVal.localeCompare(bVal, 'ko')
      : bVal.localeCompare(aVal, 'ko');
  });

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { key, direction: 'asc' };
    });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return '↕';
    return sortConfig.direction === 'asc' ? '▲' : '▼';
  };

  return (
    <div className="dashboard-container">
      <h1 className="greeting">안녕하세요, 김싸피님</h1>
      <p className="welcome">개발자를 위한 자기소개서 첨삭 서비스 DevJS에 오신 것을 환영합니다.</p>
      <button className="create-button" onClick={handleCreateClick}>+ 새로 만들기</button>

      <table className="job-table">
        <thead>
          <tr>
            <th>기업</th>
            <th onClick={() => handleSort('deadline')} style={{ cursor: 'pointer' }}>
              마감일 {getSortIndicator('deadline')}
            </th>
            <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>
              상태 {getSortIndicator('status')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedJobs.map((job) => (
            <tr key={job.id}>
              <td>{job.company}</td>
              <td>{job.deadline}</td>
              <td>
                <span className={`status ${job.status === '수정 중' ? 'editing' : 'submitted'}`}>
                  {job.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!showMore && (
        <div className="see-more" onClick={handleSeeMore}>
          더보기
        </div>
      )}
    </div>
  );
};

export default Dashboard;
