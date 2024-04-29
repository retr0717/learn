import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCourseAction } from '../../../redux/actions/faculty/factions';

const Card = ({ course }) => {

    console.log("Course card : ", course.topics);
    console.log("topics type : ", course.topics);
    const data = {
        topics: course.topics
    }

    console.log("data : ", data);
    return (
        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-5">
            <Link to="/student/topics" state={{ topics: data }}>
                <div class="mt-10 flex flex-col items-center pb-10">
                    <h1 class="mb-1 text-xl font-bold text-gray-900 dark:text-white">{course.cname}</h1>
                    <span class="text-sm text-gray-500 dark:text-gray-400">COURSE CODE : {course.scode}</span>
                    <span class="text-sm text-gray-500 dark:text-gray-400">YEAR : {course.year}</span>
                    <span class="text-sm text-gray-500 dark:text-gray-400">NO OF TOPICS : {course.topics.length}</span>
                    <div class="flex mt-4 md:mt-6">
                    </div>
                </div>
            </Link>
        </div>

    );
};

export default Card;