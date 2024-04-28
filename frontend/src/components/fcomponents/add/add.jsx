import { useState } from "react";

const AddCourseComponent = () => {
    const [topics, setTopics] = useState([]);

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

    const handleRemoveTopic = (id) => {
        const updatedTopics = topics.filter(topic => topic.id !== id);
        setTopics(updatedTopics);
    };

    const handleAddMCQ = (topicId) => {
        const newMCQ = {
            id: Date.now(),
            question: `Question ${topics.find(topic => topic.id === topicId).mcqs.length + 1}`,
            options: [
                { id: Date.now() + 1, opt: '' },
                { id: Date.now() + 2, opt: '' },
                { id: Date.now() + 3, opt: '' },
                { id: Date.now() + 4, opt: '' },
                { id: Date.now() + 5, opt: '' }
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            fid: e.target.elements["first_name"].value,
            cname: e.target.elements["last_name"].value,
            scode: e.target.elements["company"].value,
            year: e.target.elements["phone"].value,
            topics: topics.map(topic => ({
                no: topic.id.replace('tid', ''),
                name: topic.name,
                videoid: `video${topic.id.replace('tid', '')}`,
                mcq: topic.mcqs.map(mcq => ({
                    question: mcq.question,
                    options: mcq.options.map(option => ({
                        opt: option.opt,
                        answer: option.answer.toString()
                    }))
                }))
            }))
        };
        console.log('Form data:', formData);
        // Here you can do whatever you want with the form data, such as sending it to the server
    };

    return (
        <div className="max-w-md mx-auto mt-6">
            <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
            <form onSubmit={handleSubmit}>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Name</label>
                        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" />
                    </div>
                    <div>
                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject Code</label>
                        <input type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" />
                    </div>
                    <div>
                        <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Faculty Id</label>
                        <input type="text" id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" />
                    </div>
                    <div>
                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year</label>
                        <input type="tel" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" />
                    </div>
                </div>
                {/* Add Topic button */}

                {/* Topics */}
                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-4 mt-4">Topics</h2>
                    {topics.map(topic => (
                        <TopicCard key={topic.id} topic={topic} onAddMCQ={handleAddMCQ} onRemoveMCQ={handleRemoveMCQ} />
                    ))}
                </div>

                <button onClick={handleAddTopic} type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add Topic</button>

                {/* Submit button */}
                <div className="w-full flex justify-content">
                    <button type="submit" className="inline-block mt-6 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">Add Course</button>
                </div>
            </form>
        </div>
    );
};

function TopicCard({ topic, onAddMCQ, onRemoveMCQ }) {
    return (
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
            <div>
                <label htmlFor={`topic_${topic.id}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Topic Name</label>
                <input type="text" id={`topic_${topic.id}`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Topic Name" />

                <label class="mt-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
                <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />

            </div>

            {/* MCQs */}
            <div>
                {topic.mcqs.map(mcq => (
                    <MCQCard key={mcq.id} mcq={mcq} topicId={topic.id} onRemoveMCQ={onRemoveMCQ} />
                ))}
                <button type="button" onClick={() => onAddMCQ(topic.id)} class="mt-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add Question</button>
            </div>
        </div>
    );
}

function MCQCard({ mcq, topicId, onRemoveMCQ }) {
    return (
        <div className="mt-4 border border-gray-200 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold mb-2">{mcq.question}</h3>
            {/* Options */}
            <div>
                <div>
                    <label htmlFor="question" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Question</label>
                    <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="question" required />
                </div>
                <label htmlFor="question" class=" mt-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Options</label>
                <div className="mt-4">
                    {mcq.options.map(option => (
                        <div key={option.id} className="flex items-center space-x-2 mb-2">
                            <input type="text" value={option.opt} onChange={(e) => handleOptionChange(index, 'opt', e.target.value)}  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <input type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        </div>
                    ))}
                </div>
            </div>
            {/* Remove MCQ button */}
            <button onClick={() => onRemoveMCQ(topicId, mcq.id)} type="button" class="mt-4 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Remove Question</button>
        </div>
    );
}

export default AddCourseComponent;
