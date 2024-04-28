import { useEffect } from "react";
import {Link, useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const TopicsComponent = ({faculty}) => {

    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const {topics }= state && state.topics;
    console.log("topics : ", topics);
    
    useEffect(() => {
        // Dispatch the courseFetch action when the component mounts
        if (!faculty.login) {
            navigate('/login', { replace: true });
        }

    }, [ faculty.login]);

    return(
        <section className="w-full h-screen">
            <div className="flex justify-center items-center mt-6">
            {topics && topics.length !== 0 ?
                    topics.map(topic => (
                        <TopicCard
                            key={topic._id}
                            topic={topic}
                        />
                    ))
                    :
                    <span>No Topics Found</span>
                }
            </div>
        </section>
    )
}

const TopicCard = ({ topic }) => {

    const dataMcq = {
        mcqs : topic.mcq
    }

    return (
        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-5">
            <div class="flex justify-end px-4 pt-4">
                <button id="optionsButton" data-dropdown-toggle={topic._id} class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                    <span class="sr-only">Open dropdown</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>
                </button>
                <div id={topic._id} class="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul class="py-2" aria-labelledby="optionsButton">
                        <li>
                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
                        </li>
                        <li>
                            <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                        </li>
                    </ul>
                </div>
            </div>
            <Link to="/video" state={{mcqs : dataMcq}}>
                <div class="flex flex-col items-center pb-10">
                    <h1 class="mb-1 text-xl font-bold text-gray-900 dark:text-white">{topic.no} : {topic.name}</h1>
                    <div class="flex mt-4 md:mt-6">
                    </div>
                </div>
            </Link>
        </div>
    );
}

const mapStateToProps = ({faculty}) => {
    return {faculty}
}


export default connect(mapStateToProps,null)(TopicsComponent);