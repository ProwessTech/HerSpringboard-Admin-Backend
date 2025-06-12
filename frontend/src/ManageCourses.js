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
              <th>Published On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.courseId}>
                <td>{course.courseId}</td>
                <td>{course.category}</td> 
                <td>{course.publishedOn}</td>
                <td>
                  <button onClick={() => onEdit(course)}>Edit</button>
                  <button onClick={() => onDelete(course.courseId, course.userId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
