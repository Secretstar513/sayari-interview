import React from 'react';
import { useQuery } from 'react-query';
import { fetchQuestions } from '../api/questionsAPI';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ContentBody from './ContentBody';

const QuestionList = () => {
  const { data: questions, isLoading } = useQuery('questions', fetchQuestions);

  if (isLoading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  );

  return (
    <Grid container spacing={4}>
      {questions?.map((question) => (
        <Grid item xs={12} sm={6} md={4} key={question.id}>
          <Link to={`/question/${question.id}`} style={{ textDecoration: 'none' }}>
            <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  <ContentBody content={question.title} />
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                  Score: {question.score}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default QuestionList;
