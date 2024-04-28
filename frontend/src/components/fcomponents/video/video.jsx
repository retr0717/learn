import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import React from "react";

const VideoComponent = ({ faculty }) => {

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const { mcqs } = state && state.mcqs;
    console.log("mcqs : ", mcqs);

    useEffect(() => {
        // Dispatch the courseFetch action when the component mounts
        if (!faculty.login) {
            navigate('/login', { replace: true });
        }

    }, [faculty.login]);

    return (
        <section className="h-screen">
            <div className="grid justify-center mt-6">
                <video class="h-full w-50 rounded-lg" controls>
                    <source
                        src="https://docs.material-tailwind.com/demo.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button" class="right-0 w-20 mt-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Next</button>
            </div>
            {
                isOpen ?
                    <div id="mcq" className="grid justify-center mt-3 p-10">
                        <form >
                            {mcqs && mcqs.length !== 0 ?
                                mcqs.map(mcq => (
                                    <QCard
                                        key={mcq._id}
                                        mcq={mcq}
                                    />
                                ))
                                :
                                <span>No Topics Found</span>
                            }
                        </form>
                    </div>
                    :
                    <></>
            }
        </section>
    );
}

const QCard = ({ mcq }) => {

    console.log("mcq : ", mcq);
    console.log("mcq options : ", mcq.options);

    mcq.options.map(option => console.log(option.opt));

    return (
        <div>
            <div class="w-full block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{mcq.question}</h5>
                <div class="grid items-center">
                    {
                        mcq.options && mcq.options.length !== 0 ?
                            mcq.options.map(option => {
                                console.log("option : ", option);
                                return (
                                    <React.Fragment key={option._id}>
                                        <div>
                                            <input id={option._id} type="radio" value={option.opt} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label htmlFor={option._id} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{option.opt}</label>
                                        </div>
                                    </React.Fragment>
                                );
                            })
                            :
                            <span>No options</span>
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ faculty }) => {
    return { faculty }
}


export default connect(mapStateToProps, null)(VideoComponent);