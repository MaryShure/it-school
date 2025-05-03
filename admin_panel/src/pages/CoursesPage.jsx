import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  IconButton 
} from '@mui/material';
import { 
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon 
} from '@mui/icons-material';
import axios from 'axios';
import CourseForm from './CourseForm';

const CoursesPage = () => {
  const [state, setState] = useState({
    courses: [],
    categories: [],
    instructors: [],
    loading: true,
    error: null,
    openDialog: false,
    dialogMode: 'create', // 'create' или 'edit'
    currentCourse: null
  });

  const fetchData = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const [coursesRes, categoriesRes, instructorsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/courses'),
        axios.get('http://localhost:5000/api/categories'),
        axios.get('http://localhost:5000/api/instructors')
      ]);
  
      if (!coursesRes.data?.success || !categoriesRes.data?.success || !instructorsRes.data?.success) {
        throw new Error('Неверный формат ответа от сервера');
      }
  
      setState(prev => ({
        ...prev,
        courses: coursesRes.data.data || [],
        categories: categoriesRes.data.data || [],
        instructors: instructorsRes.data.data || [],
        loading: false
      }));
      
    } catch (err) {
      console.error('Ошибка загрузки:', err);
      setState(prev => ({
        ...prev,
        error: err.response?.data?.error || err.message,
        loading: false
      }));
    }
  };

  const handleOpenCreateDialog = () => {
    setState(prev => ({
      ...prev,
      openDialog: true,
      dialogMode: 'create',
      currentCourse: null
    }));
  };

  const handleOpenEditDialog = (course) => {
    setState(prev => ({
      ...prev,
      openDialog: true,
      dialogMode: 'edit',
      currentCourse: course
    }));
  };

  const handleCloseDialog = () => {
    setState(prev => ({
      ...prev,
      openDialog: false,
      currentCourse: null
    }));
  };

  const handleDeleteCourse = async (id) => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      await axios.delete(`${API_URL}/courses/${id}`);
      fetchData();
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err.response?.data?.error || err.message
      }));
    }
  };

  const handleSubmit = async (formData) => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      let response;
  
      if (state.dialogMode === 'edit') {
        response = await axios.put(
          `${API_URL}/courses/${state.currentCourse.id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      } else {
        response = await axios.post(
          `${API_URL}/courses`, 
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      }
  
      if (response.data.success) {
        fetchData();
        handleCloseDialog();
      }
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err.response?.data?.error || err.message
      }));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (state.loading) return (
    <Box display="flex" justifyContent="center" mt={4}>
      <CircularProgress />
    </Box>
  );

  if (state.error) return (
    <Box p={3}>
      <Alert severity="error">
        Ошибка: {state.error}
        <Button onClick={fetchData} sx={{ ml: 2 }}>Повторить</Button>
      </Alert>
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Управление курсами</Typography>
      
      <Button 
        variant="contained" 
        startIcon={<AddIcon />}
        onClick={handleOpenCreateDialog}
        sx={{ mb: 3 }}
      >
        Добавить курс
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead >
            <TableRow sx={{ '& .MuiTableCell-root': { fontWeight: 'bold' } }}>
              <TableCell>Название</TableCell>
              <TableCell>Категория</TableCell>
              <TableCell>Цена</TableCell>
              <TableCell>Длительность</TableCell>
              <TableCell>Описание</TableCell>
              <TableCell>Создатель курса</TableCell>
              <TableCell>Нахождение в топе</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.courses.length > 0 ? (
              state.courses.map(course => (
                <TableRow key={course.id}>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>
                    {(state.categories || []).find(c => c.id === course.category_id)?.name || 'Не указана'}
                  </TableCell>
                  <TableCell>{course.price} бел. руб.</TableCell>
                  <TableCell>{course.duration_weeks} недель</TableCell>
                  <TableCell>{course.description}</TableCell>
                  <TableCell>{(state.instructors || []).find(c => c.id === course.instructor_id)?.full_name || 'Не указана'}</TableCell>
                  <TableCell>{course.is_in_top ? "Да" : "Нет"}</TableCell>
                  <TableCell align="right">
                    <IconButton 
                      onClick={() => handleOpenEditDialog(course)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      onClick={() => handleDeleteCourse(course.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Курсы не найдены
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={state.openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {state.dialogMode === 'edit' ? 'Редактирование курса' : 'Создание нового курса'}
        </DialogTitle>
        <DialogContent>
          <CourseForm
            course={state.currentCourse}
            categories={state.categories}
            instructors={state.instructors}
            onSubmit={handleSubmit}
            onCancel={handleCloseDialog}
            mode={state.dialogMode}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CoursesPage;