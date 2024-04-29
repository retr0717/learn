import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { editCourseAction } from "../../../redux/actions/faculty/factions";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditComponent = ({ faculty, editSubmit }) => {
    const location = useLocation();
    const { state } = location;

    console.log("course init info : ", state.course);

    const [courseInfo, setCourseInfo] = useState(state.course);

    // Initialize topics state with topics from state.course
    const [topics, setTopics] = useState(state.course.topics.map(topic => ({
        ...topic,
        mcqs: topic.mcqs || [] // Initialize mcqs as an empty array if undefined
    })) || []);

    console.log("topics from state : ", topics);

    const [videoFile, setVideoFile] = useState(null);
    const [videoId, setVideoId] = useState(null);
    const [status, setStatus] = useState("not uploaded");

    const navigate = useNavigate();

    useEffect(() => {
        // Dispatch the courseFetch action when the component mounts
        if (!faculty.login) {
            navigate('/login', { replace: true });
        }
    }, [faculty.login]);

    const handleVideoSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('video', videoFile);

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/faculty/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Upload successful:', response.data);
            setVideoId(response.data.videoId);
            setStatus("uploaded");
            return response.data;
        } catch (error) {
            console.error('Error uploading video:', error);
            throw error;
        }
    }

    const handleFileChange = (e) => {
        setVideoFile(e.target.files[0]);
        setStatus("not uploaded");
    };

    const handleAddTopic = (e) => {
        e.preventDefault();
        const newTopic = {
            id: Date.now(),
            name: `Topic ${topics.length + 1}`,
            description: `Description for Topic ${topics.length + 1}`,
            mcqs: []
        };
        setTopics([...topics, newTopic]);
    };

    const handleAddMCQ = (topicId) => {
        const newMCQ = {
            id: Date.now(),
            question: `Question ${topics.find(topic => topic.id === topicId).mcqs.length + 1}`,
            options: [
                { id: Date.now() + 1, opt: '' },
                { id: Date.now() + 2, opt: '' },
                { id: Date.now() + 3, opt: '' },
                { id: Date.now() + 4, opt: '' }
            ]
        };
        const updatedTopics = topics.map(topic => {
            if (topic.id === topicId) {
                return { ...topic, mcqs: [...topic.mcqs, newMCQ] };
            }
            return topic;
        });
        setTopics(updatedTopics);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const mappedTopics = topics.map((topic, index) => ({
            no: index + 1,
            name: topic.name,
            videoid: 'video1',
            mcq: topic.mcqs.map(mcq => ({
                question: mcq.question,
                options: mcq.options.map(option => ({
                    opt: option.opt,
                    answer: option.answer ? option.answer.toString() : 'false'
                }))
            }))
        }));

        const formValues = {
            fid: e.target.elements["fid"].value,
            cname: e.target.elements["course-name"].value,
            scode: e.target.elements["scode"].value,
            year: e.target.elements["year"].value,
            topics: mappedTopics,
        }

        console.log("edit form values : ",formValues);

        editSubmit(formValues);
    };

    const handleRemoveMCQ = (topicId, mcqId) => {
        const updatedTopics = topics.map(topic => {
            if (topic.id === topicId) {
                const updatedMCQs = topic.mcqs.filter(mcq => mcq.id !== mcqId);
                return { ...topic, mcqs: updatedMCQs };
            }
            return topic;
        });
        setTopics(updatedTopics);
    };

    return (
        <div className="max-w-md mx-auto mt-6">
            <h2 className="text-2xl font-bold mb-4">Edit Course</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="course-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Name</label>
                        <input type="text" id="course-name" value={courseInfo.cname} onChange={(e) => setCourseInfo({...courseInfo, cname: e.target.value})} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="course" />
                    </div>
                    <div>
                        <label htmlFor="scode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject Code</label>
                        <input type="text" id="scode" value={courseInfo.scode} onChange={(e) => setCourseInfo({...courseInfo, scode: e.target.value})} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="subject code" />
                    </div>
                    <div>
                        <label htmlFor="fid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Faculty Id</label>
                        <input type="text" id="fid" value={courseInfo.fid} onChange={(e) => setCourseInfo({...courseInfo, fid: e.target.value})} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="faculty id" />
                    </div>
                    <div>
                        <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year</label>
                        <input type="tel" id="year" value={courseInfo.year} onChange={(e) => setCourseInfo({...courseInfo, year: e.target.value})} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="year" />
                    </div>
                </div>
                {/* Topics */}
                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-4 mt-4">Topics</h2>
                    {topics.map(topic => (
                        <TopicCard
                            key={topic.id}
                            status={status}
                            handleVideoSubmit={handleVideoSubmit}
                            handleFileChange={handleFileChange}
                            topic={topic}
                            topics={topics}
                            mcqs={topic.mcq}
                            onAddMCQ={handleAddMCQ}
                            onRemoveMCQ={handleRemoveMCQ}
                        />
                    ))}
                </div>
                <button onClick={handleAddTopic} type="button" className="mb-6 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add Topic</button>
                {/* Submit button */}
                <div className="w-full flex justify-end mt-4">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit Course</button>
                </div>
            </form>
        </div>
    )
}

// TopicCard component remains the same


function TopicCard({ topic, status, mcqs, topics, setTopics, onAddMCQ, onRemoveMCQ, handleFileChange , handleVideoSubmit}) {

    console.log("topics card : ",mcqs);
    return (
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
            <div>
                <label htmlFor={`topic_${topic.id}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Topic Name</label>
                <input type="text" id={`topic_${topic.id}`} value={topic.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Topic Name" />

                <label
                    className="mt-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="video"
                    id="video"
                >
                    Upload file
                </label>
                <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="video"
                    type="file"
                    onChange={handleFileChange}
                    accept="video/*"
                />
                <span className="mt-6">
                {status}
                </span>
                <div>
                <button onClick={() => handleVideoSubmit()} type="button" className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Upload</button>
                </div>
            </div>

            {/* MCQs */}
            <div>
                {mcqs && mcqs.map(mcq => (
                    <MCQCard key={mcq.id} mcq={mcq} topics={topics} setTopics={setTopics} topicId={topic.id} onRemoveMCQ={onRemoveMCQ} />
                ))}
                <button type="button" onClick={() => onAddMCQ(topic.id)} className="mt-3text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add Question</button>
            </div>
        </div>
    );
}

function MCQCard({ mcq, topicId, topics, setTopics, onRemoveMCQ }) {

    const handleOptionChange = (mcqId, optionId, value) => {
        const updatedTopics = topics.map(topic => {
            if (topic.mcqs.some(mcq => mcq.id === mcqId)) {
                const updatedMCQs = topic.mcqs.map(mcq => {
                    if (mcq.id === mcqId) {
                        const updatedOptions = mcq.options.map(option => {
                            if (option.id === optionId) {
                                return { ...option, opt: value };
                            }
                            return option;
                        });
                        return { ...mcq, options: updatedOptions };
                    }
                    return mcq;
                });
                return { ...topic, mcqs: updatedMCQs };
            }
            return topic;
        });
        setTopics(updatedTopics);
    };

    const handleCorrectAnswerChange = (mcqId, optionId) => {
        const updatedTopics = topics.map(topic => {
            if (topic.mcqs.some(mcq => mcq.id === mcqId)) {
                const updatedMCQs = topic.mcqs.map(mcq => {
                    if (mcq.id === mcqId) {
                        const updatedOptions = mcq.options.map(option => {
                            if (option.id === optionId) {
                                return { ...option, answer: !option.answer }; // Toggle the answer
                            }
                            return option;
                        });
                        return { ...mcq, options: updatedOptions };
                    }
                    return mcq;
                });
                return { ...topic, mcqs: updatedMCQs };
            }
            return topic;
        });
        setTopics(updatedTopics);
    };

    return (
        <div className="mt-4 border border-gray-200 rounded-lg p-4 mb-4">
            {/* Options */}
            <div>
                <div>
                    <label htmlFor="question"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Question</label>
                    <input type="text" id="question" value={mcq.question} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="question" required />
                </div>
                <label htmlFor="options" className=" mt-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Options</label>
                <div className="mt-4">
                    {mcq.options.map(option => (
                        <div key={option.id} className="flex items-center space-x-2 mb-2">
                            <input
                                type="text"
                                value={option.opt || ''} // Set default value to empty string
                                onChange={(e) => handleOptionChange(mcq.id, option.id, e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="option"
                            />
                            <input
                                type="checkbox"
                                checked={option.answer || false} // Set default value to false
                                onChange={() => handleCorrectAnswerChange(mcq.id, option.id)}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                        </div>
                    ))}
                </div>
            </div>
            {/* Remove MCQ button */}
            <button onClick={() => onRemoveMCQ(topicId, mcq.id)} type="button" className="mt-4 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Remove Question</button>
        </div>
    );
}

const mapStateToProps = ({faculty}) => {
    return {faculty}
}

const mapDispatchToProps = dispatch => {
    return {
        editSubmit : (data) => dispatch(editCourseAction(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditComponent);
