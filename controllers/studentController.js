const students = require('../data/students');

// @desc    Get all student records
// @route   GET /students
const getStudents = (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students
  });
};

// @desc    Get student by ID
// @route   GET /students/:id
const getStudentById = (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Student ID format invalid'
    });
  }

  const student = students.find((s) => s.id === id);
  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student with the id ${id} not found`
    });
  }

  res.status(200).json({
    success: true,
    data: student
  });
};

// @desc    Create a new student record
// @route   POST /students
const createStudent = (req, res) => {
  const { name, course } = req.body;

  if (name === undefined && course === undefined) {
  return res.status(400).json({
    success: false,
    message: 'Bad request: Please provide at least one field (name or course) to update'
  });
}

  const newId = students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;
  const newStudent = {
    id: newId,
    name: name.trim(),
    course: course.trim()
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: 'Student created successfully',
    data: newStudent
  });
};

// @desc    Update an existing student record
// @route   PUT /students/:id
const updateStudent = (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid student ID format'
    });
  }

  const { name, course } = req.body;
  if (!name && !course) {
    return res.status(400).json({
      success: false,
      message: 'Bad request: Please provide at least one field (name or course) to update'
    });
  }

  const student = students.find((s) => s.id === id);
  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student with the id ${id} not found`
    });
  }

  if (name !== undefined) {
    if (typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Name must be a valid non-empty string'
      });
    }
    student.name = name.trim();
  }

  if (course !== undefined) {
    if (typeof course !== 'string' || !course.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Course must be a valid non-empty string'
      });
    }
    student.course = course.trim();
  }

  res.status(200).json({
    success: true,
    message: 'Student updated successfully',
    data: student
  });
};

// @desc    Delete a student record by ID
// @route   DELETE /students/:id
const deleteStudent = (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid student ID format'
    });
  }

  const studentIndex = students.findIndex((s) => s.id === id);
  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with the id ${id} not found`
    });
  }

  const deletedStudent = students.splice(studentIndex, 1)[0];

  res.status(200).json({
    success: true,
    message: 'Student deleted successfully',
    data: deletedStudent
  });
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};
