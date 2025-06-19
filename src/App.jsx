import React, { useState, useEffect, useMemo } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

const App = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        // Replace this URL with your mock API if needed
        const data = [
          { id: 1, name: "HTML Basics" },
          { id: 2, name: "CSS Mastery" },
          { id: 3, name: "JavaScript Pro" },
          { id: 4, name: "React In Depth" },
        ];
        await new Promise(res => setTimeout(res, 1000)); // simulate delay
        setCourses(data);
      } catch (err) {
        setError('Failed to fetch courses.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleSubmit = (student) => {
    if (editingStudent) {
      setStudents((prev) =>
        prev.map((s) => (s.id === student.id ? student : s))
      );
      setEditingStudent(null);
    } else {
      student.id = Date.now();
      setStudents((prev) => [...prev, student]);
    }
  };

  const handleEdit = (student) => {
    setTimeout(() => {
      setEditingStudent(student);
    }, 500); // simulate async delay (event loop)
  };

  const memoizedStudents = useMemo(() => students, [students]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Student Management Dashboard</h1>
      {loading ? (
        <p>Loading courses...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <StudentForm
          onSubmit={handleSubmit}
          editingStudent={editingStudent}
          courses={courses}
        />
      )}
      <StudentList students={memoizedStudents} onEdit={handleEdit} />
    </div>
  );
};

export default App;
