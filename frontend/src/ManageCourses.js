export default function ManageCourses({ courses, onDelete, onEdit }) {
  return (
    <div className="manage-courses">
      {courses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Category</th>
              <th>Description</th>
              <th>Published On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.courseId}>
                <td>{course.courseId}</td>
                <td>{course.Category}</td>
                <td>{course.Description}</td>
                <td>{course.PublishedOn}</td>
                <td>
                  <button onClick={() => onEdit(course)}>Edit</button>
                  <button onClick={() => onDelete(course.courseId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
