import React, { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

const FileUpload = ({ id, name, value, onChange }) => {
  const [fileName, setFileName] = useState(value ? value.name : '');
  const [filePreview, setFilePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : '');
    setFilePreview(file ? URL.createObjectURL(file) : null);
    onChange(e);
  };

  return (
    <div className="relative w-64 h-64 border border-gray-300 rounded flex items-center justify-center text-gray-600">
      <input
        type="file"
        id={id}
        name={name}
        onChange={handleFileChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
        accept=".pdf"
      />
      {filePreview ? (
        <iframe
          src={filePreview}
          title={fileName}
          className="w-full h-full"
          style={{ border: 'none' }}
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-center">
          <AiOutlinePlus className="text-4xl" />
          <p className="text-gray-500 mt-2">Upload PDF</p>
        </div>
      )}
    </div>
  );
};

export default function StudentForm() {
  const [formData, setFormData] = useState({
    name: '',
    usn: '',
    semester: '',
    section: '',
    aadharNumber: '',
    email: '',
    address: '',
    branch: '',
    fatherName: '',
    fatherOccupation: '',
    fatherPhone: '',
    motherName: '',
    motherOccupation: '',
    motherPhone: '',
    tenthMarks: null,
    twelfthMarks: null,
  });

  const [sections, setSections] = useState([]);

  const semesterSections = {
    1: ['A', 'B', 'C', 'D'],
    2: ['A', 'B', 'C', 'D'],
    3: ['A', 'B', 'C', 'D', 'E', 'F'],
    4: ['A', 'B', 'C', 'D', 'E', 'F'],
    5: ['A', 'B', 'C', 'D', 'E', 'F'],
    6: ['A', 'B', 'C', 'D', 'E', 'F'],
    7: ['A', 'B', 'C', 'D', 'E', 'F'],
    8: ['A', 'B', 'C', 'D', 'E', 'F'],
  };

  const branchOptions = {
    CSE: 'Computer Science and Engineering',
    ISE: 'Information Science and Engineering',
    ECE: 'Electronics and Communication Engineering',
    'AI&DS': 'Artificial Intelligence and Data Science',
    ME: 'Mechanical Engineering',
    ASE: 'Aerospace Engineering',
    EEE: 'Electrical and Electronics Engineering',
    ETE: 'Electronics and Telecommunication Engineering',
    EIE: 'Electronics and Instrumentation',
    CVE: 'Civil Engineering',
    'CSE-IoT': 'Computer Science and Engineering - Internet of Things and Cyber Security',
    'AI&ML': 'Artificial Intelligence and Machine Learning',
    MD: 'Medical Electronics',
    IEM: 'Industrial Engineering and Management',
    CE: 'Chemical Engineering',
    BT: 'Bio Technology',
    'CSE-DS':'Computer Science and Engineering - Data Science'
  };

  useEffect(() => {
    if (formData.semester) {
      setSections(semesterSections[formData.semester] || []);
    }
  }, [formData.semester]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate USN
    if (!formData.usn.startsWith('1BM')) {
      alert('USN must start with "1BM"');
      return;
    }

    // Validate Aadhar number
    if (!/^\d+$/.test(formData.aadharNumber)) {
      alert('Aadhar Number must contain only numbers');
      return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      alert('Invalid email format');
      return;
    }

    // Validate file uploads
    if (formData.tenthMarks && formData.tenthMarks.type !== 'application/pdf') {
      alert('10th Marks Card must be a PDF file');
      return;
    }
    if (formData.twelfthMarks && formData.twelfthMarks.type !== 'application/pdf') {
      alert('12th Marks Card must be a PDF file');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('usn', formData.usn);
    data.append('semester', formData.semester);
    data.append('section', formData.section);
    data.append('aadharNumber', formData.aadharNumber);
    data.append('email', formData.email);
    data.append('address', formData.address);
    data.append('branch', formData.branch);
    data.append('fatherName', formData.fatherName);
    data.append('fatherOccupation', formData.fatherOccupation);
    data.append('fatherPhone', formData.fatherPhone);
    data.append('motherName', formData.motherName);
    data.append('motherOccupation', formData.motherOccupation);
    data.append('motherPhone', formData.motherPhone);
    if (formData.tenthMarks) data.append('tenthMarks', formData.tenthMarks);
    if (formData.twelfthMarks) data.append('twelfthMarks', formData.twelfthMarks);

    try {
      await fetch('http://localhost:4000/submit', {
        method: 'POST',
        body: data,
      });
      alert('Data submitted successfully');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Error submitting data');
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Student Information Form</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded shadow-lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="usn">
              University Seat Number (USN)
            </label>
            <input
              type="text"
              id="usn"
              name="usn"
              value={formData.usn}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="semester">
              Semester
            </label>
            <select
              id="semester"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select Semester</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <option key={sem} value={sem}>
                  {`${sem} ${sem === 1 ? 'st' : sem === 2 ? 'nd' : 'th'} Semester`}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="section">
              Section
            </label>
            <select
              id="section"
              name="section"
              value={formData.section}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select Section</option>
              {sections.map((section) => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="aadharNumber">
              Aadhar Number
            </label>
            <input
              type="text"
              id="aadharNumber"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="address">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="fatherName">
              Father's Name
            </label>
            <input
              type="text"
              id="fatherName"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="fatherOccupation">
              Father's Occupation
            </label>
            <input
              type="text"
              id="fatherOccupation"
              name="fatherOccupation"
              value={formData.fatherOccupation}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="fatherPhone">
              Father's Phone Number
            </label>
            <input
              type="text"
              id="fatherPhone"
              name="fatherPhone"
              value={formData.fatherPhone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="motherName">
              Mother's Name
            </label>
            <input
              type="text"
              id="motherName"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="motherOccupation">
              Mother's Occupation
            </label>
            <input
              type="text"
              id="motherOccupation"
              name="motherOccupation"
              value={formData.motherOccupation}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="motherPhone">
              Mother's Phone Number
            </label>
            <input
              type="text"
              id="motherPhone"
              name="motherPhone"
              value={formData.motherPhone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="branch">
              Branch
            </label>
            <select
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select Branch</option>
              {Object.entries(branchOptions).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">10th Marks Card</label>
            <FileUpload
              id="tenthMarks"
              name="tenthMarks"
              value={formData.tenthMarks}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">12th Marks Card</label>
            <FileUpload
              id="twelfthMarks"
              name="twelfthMarks"
              value={formData.twelfthMarks}
              onChange={handleChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
