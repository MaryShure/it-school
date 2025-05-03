import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Avatar,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import {
  Save as SaveIcon,
  Cancel as CancelIcon,
  CloudUpload as CloudUploadIcon,
} from "@mui/icons-material";

const CourseForm = ({
  course = null,
  categories = [],
  instructors = [],
  onSubmit,
  onCancel,
  mode = "create",
}) => {
  const [formData, setFormData] = useState({
    title: "",
    instructor_id: "",
    category_id: "",
    price: "",
    duration_weeks: 4,
    hours: 40,
    description: "",
    cover_url: "",
    is_in_top: false,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (mode === "edit" && course) {
      setFormData({
        title: course.title,
        instructor_id: course.instructor_id,
        category_id: course.category_id,
        price: course.price,
        duration_weeks: course.duration_weeks,
        hours: course.hours,
        description: course.description,
        cover_url: course.cover_url,
        is_in_top: course.is_in_top || false,
      });
      setImagePreview(course.cover_url || "");
    }
  }, [mode, course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "is_in_top" ? e.target.checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const formDataToSend = new FormData();

      // Добавляем все поля формы
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Добавляем файл изображения, если он есть
      if (imageFile) {
        formDataToSend.append("cover_image", imageFile);
      }

      await onSubmit(formDataToSend);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Название курса"
        name="title"
        value={formData.title}
        onChange={handleChange}
        margin="normal"
        required
      />

      <Box display="flex" gap={2} mt={2}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Преподаватель</InputLabel>
          <Select
            name="instructor_id"
            value={formData.instructor_id}
            onChange={handleChange}
            required
          >
            {instructors.map((instructor) => (
              <MenuItem key={instructor.id} value={instructor.id}>
                {instructor.full_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Категория</InputLabel>
          <Select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box display="flex" gap={2} mt={2}>
        <TextField
          fullWidth
          label="Цена (BYN)"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          margin="normal"
          required
          inputProps={{ min: 0, step: 0.01 }}
        />

        <TextField
          fullWidth
          label="Длительность (недель)"
          name="duration_weeks"
          type="number"
          value={formData.duration_weeks}
          onChange={handleChange}
          margin="normal"
          required
          inputProps={{ min: 1 }}
        />

        <TextField
          fullWidth
          label="Часов обучения"
          name="hours"
          type="number"
          value={formData.hours}
          onChange={handleChange}
          margin="normal"
          required
          inputProps={{ min: 1 }}
        />
      </Box>

      <TextField
        fullWidth
        label="Описание курса"
        name="description"
        value={formData.description}
        onChange={handleChange}
        margin="normal"
        multiline
        rows={4}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={formData.is_in_top || false}
            onChange={handleChange}
            name="is_in_top"
          />
        }
        label="Рекомендуемый курс (в топе)"
      />

      <Box mt={2}>
        <InputLabel>Обложка курса</InputLabel>
        <Button
          component="label"
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          sx={{ mt: 1 }}
          disabled={uploading}
        >
          {uploading ? <CircularProgress size={24} /> : "Загрузить изображение"}
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
            disabled={uploading}
          />
        </Button>
        {imagePreview && (
          <Box mt={2}>
            <Avatar
              src={imagePreview}
              variant="rounded"
              sx={{ width: 150, height: 150 }}
            />
          </Box>
        )}
      </Box>

      <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
        <Button
          onClick={onCancel}
          startIcon={<CancelIcon />}
          variant="outlined"
          disabled={uploading}
        >
          Отмена
        </Button>
        <Button
          type="submit"
          variant="contained"
          startIcon={uploading ? <CircularProgress size={24} /> : <SaveIcon />}
          disabled={uploading}
        >
          {mode === "edit" ? "Обновить" : "Создать"}
        </Button>
      </Box>
    </Box>
  );
};

export default CourseForm;
