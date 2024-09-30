import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionList from './components/QuestionList';
import QuestionDetail from './components/QuestionDetail';
import Header from './components/Header';
import { Container } from '@mui/material';

const App = () => {
  return (
    <Router>
      <Header />
      <Container maxWidth="lg" sx={{ marginTop: 4, marginBottom: 4 }}>
        <Routes>
          <Route path="/" element={<QuestionList />} />
          {/* Routes for viewing specific questions, answers, or comments */}
          <Route path="/question/:id" element={<QuestionDetail />} />
          <Route path="/question/:id/answer/:answerId" element={<QuestionDetail />} />
          <Route path="/question/:id/comment/:commentId" element={<QuestionDetail />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
