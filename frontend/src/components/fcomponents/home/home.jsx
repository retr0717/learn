import { connect } from "react-redux";
import DropdownCard from "../course-card/course-card";
import { CourseFetchAction } from "../../../redux/actions/faculty/factions";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link, redirect, useNavigate } from "react-router-dom";

const FacultyHomePage = ({ faculty, courseFetch }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log("Courses frontend : ", faculty);

    useEffect(() => {
        // Dispatch the courseFetch action when the component mounts
        dispatch(courseFetch(faculty.user.fid));

        if (!faculty.login) {
            navigate('/login', { replace: true });
        }

    }, [dispatch, faculty.login, faculty.delete_course]);

    return (
        <section className="w-full h-screen">
            <div className="flex justify-center mt-6">
                <div className="grid">
                    <form className="max-w-md mx-auto">
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative flex-grow">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." required />
                            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </form>
                    <Link to="/faculty/add" type="button" className="mt-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add New Course</Link>
                </div>
            </div>
            <div className="flex m-10 justify-evenly flex-wrap">
                {faculty.courses && faculty.courses.length !== 0 ?
                    faculty.courses.map(course => (
                        <DropdownCard
                            key={course._id}
                            course={course}
                        />
                    ))
                    :
                    <span>No Courses Found</span>
                }
            </div>
        </section>
    )
}

const mapStateToProps = ({ faculty }) => {

    return { faculty };
}

const mapDispatchToProps = dispatch => {

    return {
        courseFetch: tid => dispatch(CourseFetchAction(tid))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FacultyHomePage);