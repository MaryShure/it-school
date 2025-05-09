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
  Typography
} from "@mui/material";
import {
  Save as SaveIcon,
  Cancel as CancelIcon,
  CloudUpload as CloudUploadIcon
} from "@mui/icons-material";
import { DatePicker } from '@mui/x-date-pickers';

const PublicationForm = ({
  publication = null,
  onSubmit,
  onCancel,
  mode = "create",
}) => {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    type: "news",
    event_date: null,
    cover_url: "",
    is_published: false,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (mode === "edit" && publication) {
      setFormData({
        title: publication.title,
        excerpt: publication.excerpt || "",
        content: publication.content || "",
        type: publication.type || "news",
        event_date: publication.event_date || null,
        cover_url: publication.cover_url || "",
        is_published: publication.is_published || false,
      });
      setImagePreview(publication.cover_url || "");
    }
  }, [mode, publication]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      event_date: date,
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
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
        if (value !== null && value !== undefined) {
          formDataToSend.append(key, value);
        }
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
      <FormControl fullWidth margin="normal">
        <InputLabel>Тип публикации</InputLabel>
        <Select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <MenuItem value="news">Новость</MenuItem>
          <MenuItem value="event">Анонс мероприятия</MenuItem>
          <MenuItem value="featured">Выпуск месяца</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Заголовок"
        name="title"
        value={formData.title}
        onChange={handleChange}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="Краткое описание"
        name="excerpt"
        value={formData.excerpt}
        onChange={handleChange}
        margin="normal"
        multiline
        rows={2}
      />

      <TextField
        fullWidth
        label="Содержание"
        name="content"
        value={formData.content}
        onChange={handleChange}
        margin="normal"
        multiline
        rows={6}
        required
      />

        {formData.type === 'event' && (
          <Box mt={2}>
            <DatePicker
                label="Дата мероприятия"
                value={formData.event_date}
                onChange={handleDateChange}
                 slotProps={{ textField: { fullWidth: true } }}
            />
          </Box>
        )}

      <Box mt={2}>
        <Typography variant="subtitle1" gutterBottom>Обложка публикации</Typography>
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

      <FormControlLabel
        control={
          <Checkbox
            checked={formData.is_published || false}
            onChange={handleCheckboxChange}
            name="is_published"
          />
        }
        label="Опубликовать сразу"
        sx={{ mt: 2 }}
      />

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

export default PublicationForm;