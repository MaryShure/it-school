import { useState, useEffect } from 'react';
import { 
  Box,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography,
  CircularProgress,
  Alert,
  Button
} from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Функция для загрузки заявок
  const fetchApplications = async () => {
  try {
    setLoading(true);
    const response = await axios.get('http://localhost:5000/api/applications', {
      params: {
        has_testimonial: false // Добавляем параметр фильтрации
      }
    });
    setApplications(response.data);
    setError(null);
  } catch (err) {
    setError(err.message);
    console.error('Ошибка при загрузке заявок:', err);
  } finally {
    setLoading(false);
  }
};

  // Функция для удаления заявки
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/applications/${id}`);
      fetchApplications(); // Обновляем список после удаления
    } catch (err) {
      console.error('Ошибка при удалении заявки:', err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Форматирование даты
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return format(date, 'dd MMMM yyyy', { locale: ru });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Ошибка при загрузке заявок: {error}</Alert>
        <Button onClick={fetchApplications} variant="contained" sx={{ mt: 2 }}>
          Повторить попытку
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Заявки на обучение
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ '& .MuiTableCell-root': { fontWeight: 'bold' } }}>
              <TableCell>ФИО</TableCell>
              <TableCell>Дата рождения</TableCell>
              <TableCell>Курс</TableCell>
              <TableCell>Телефон</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Дата заявки</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id}>
                <TableCell>{`${app.surname} ${app.name} ${app.patronym || ''}`}</TableCell>
                <TableCell>{formatDate(app.birth_date)}</TableCell>
                <TableCell>{app.course_name}</TableCell>
                <TableCell>{app.telephone}</TableCell>
                <TableCell>{app.email}</TableCell>
                <TableCell>{formatDate(app.createdAt)}</TableCell>
                <TableCell>
                  <Button 
                    variant="outlined" 
                    color="error" 
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(app.id)}
                  >
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Applications;