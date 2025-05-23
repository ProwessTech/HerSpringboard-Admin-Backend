import { useState, useEffect } from 'react';
import './style.css';
export default function EditCourseForm({ course, onCourseUpdated, onCancel }) {
  const [formData, setFormData] = useState({
    courseId: '',
    userID: '',
    category: '',
    completed: '',
    contents: '',
    cost: '',
    courseReview: '',
    description: '',
    enrolled: '',
    estimatedDuration: '',
    image: '',
    lastUpdatedOn: '',
    publishedOn: '',
    rating: '',
    requirements: '',
    title: '',
    whatWeCoverInCourse: '',
    whatYouLearn: '',
    createdBy: 'admin_ui', 
  });
  const [error, setError] = useState(null);
  useEffect(() => {
    if (course) {
      setFormData({
        ...course,
        createdBy: 'admin_ui', 
      });
      setError(null);
    }
  }, [course]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:3001/courses/${encodeURIComponent(course.courseId)}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedCourse = await response.json();
      console.log('Course updated on server:', updatedCourse);
      onCourseUpdated(); 
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error updating course');
    }
  };
  return (
    <form onSubmit={handleSubmit} className="form-container">
      {error && <div style={{ color: 'red', marginBottom: '1em' }}>{error}</div>}
      <input
        name="courseId"
        placeholder="Course ID"
        value={formData.courseId}
        onChange={handleChange}
        required
      />
      <input
        name="userID"
        placeholder="User ID"
        value={formData.userID}
        onChange={handleChange}
      />
      <input
        name="Category"
        placeholder="Category"
        value={formData.Category}
        onChange={handleChange}
      />
      <input
        name="Completed"
        placeholder="Completed"
        value={formData.Completed}
        onChange={handleChange}
      />
      <input
        name="Contents"
        placeholder="Contents"
        value={formData.Contents}
        onChange={handleChange}
      />
      <input
        name="Cost"
        placeholder="Cost"
        value={formData.Cost}
        onChange={handleChange}
        type="number"
        min="0"
      />
      <input
        name="CourseReview"
        placeholder="Course Review"
        value={formData.CourseReview}
        onChange={handleChange}
      />
      <input
        name="Description"
        placeholder="Description"
        value={formData.Description}
        onChange={handleChange}
      />
      <input
        name="Enrolled"
        placeholder="Enrolled"
        value={formData.Enrolled}
        onChange={handleChange}
        type="number"
        min="0"
      />
      <input
        name="EstimatedDuration"
        placeholder="Estimated Duration"
        value={formData.EstimatedDuration}
        onChange={handleChange}
      />
      <input
        name="Image"
        placeholder="Image URL"
        value={formData.Image}
        onChange={handleChange}
      />
      <input
        name="LastUpdatedOn"
        placeholder="Last Updated On (YYYY-MM-DD)"
        value={formData.LastUpdatedOn}
        onChange={handleChange}
        type="date"
      />
      <input
        name="PublishedOn"
        placeholder="Published On (YYYY-MM-DD)"
        value={formData.PublishedOn}
        onChange={handleChange}
        type="date"
      />
      <input
        name="Rating"
        placeholder="Rating"
        value={formData.Rating}
        onChange={handleChange}
        type="number"
        step="0.1"
        min="0"
        max="5"
      />
      <input
        name="Requirements"
        placeholder="Requirements"
        value={formData.Requirements}
        onChange={handleChange}
      />
      <input
        name="Title"
        placeholder="Title"
        value={formData.Title}
        onChange={handleChange}
        required
      />
      <input
        name="WhatWeCoverInCourse"
        placeholder="What We Cover In Course"
        value={formData.WhatWeCoverInCourse}
        onChange={handleChange}
      />
      <input
        name="WhatYouLearn"
        placeholder="What You Learn"
        value={formData.WhatYouLearn}
        onChange={handleChange}
      />
      <div className="button-group" style={{ marginTop: '1em' }}>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onCancel} style={{ marginLeft: '1em' }}>
          Cancel
        </button>
      </div>
    </form>
  );
}
