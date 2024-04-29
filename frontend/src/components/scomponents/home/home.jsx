import { connect } from "react-redux";
import { fetchCoursesAction } from "../../../redux/actions/student/sactions";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { select } from "redux-saga/effects";
import Card from "../course-card/course-card";

const StudentHome = ({ student, courseFetch }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    useEffect(() => {
        // Dispatch the courseFetch action when the component mounts
        if (student.user) {
            dispatch(courseFetch());
        }

        if (!student.login) {
            navigate('/login', { replace: true });
        }

    }, [dispatch, student.login]);

    console.log("type of selected item : ",typeof(selectedItem));
    console.log("type of year : ",typeof(student.courses[0].year));

    const filteredCourses = student.courses.filter(course => {
        return selectedItem ? course.year.toString() === selectedItem.toString() : true;
    });

    return (
        <section className="w-full h-screen">
            <div className="flex justify-center mt-6">
                <div className="grid">
                    <div>
                        <button
                            id="dropdownHoverButton"
                            data-dropdown-toggle="dropdownHover"
                            data-dropdown-trigger="hover"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="button"
                        >
                            {selectedItem || 'Year'}
                            <svg
                                className="w-2.5 h-2.5 ms-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 4 4 4-4"
                                />
                            </svg>
                        </button>

                        <div id="dropdownHover" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                                <li>
                                    <a href="#" className="flex justify-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleItemClick(1)}>1</a>
                                </li>
                                <li>
                                    <a href="#" className="flex justify-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleItemClick(2)}>2</a>
                                </li>
                                <li>
                                    <a href="#" className="flex justify-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleItemClick(3)}>3</a>
                                </li>
                                <li>
                                    <a href="#" className="flex justify-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleItemClick(4)}>4</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex m-10 justify-evenly flex-wrap">
                {filteredCourses && filteredCourses.length !== 0 ?
                    filteredCourses.map(course => (
                        <Card
                            key={course._id}
                            course={course}
                        />
                    ))
                    :
                    <span>No Courses Found</span>
                }
            </div>
        </section>
    );
}


const mapStateToProps = ({ student }) => {
    return { student }
}

const mapDispatchToProps = dispatch => {
    return {
        courseFetch: () => dispatch(fetchCoursesAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentHome)