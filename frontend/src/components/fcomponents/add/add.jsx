import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";

const AddCourseComponent = () => {

    const [topics, setTopics] = useState([]);

    const handleAddTopic = () => {
        const newTopic = {
            id: Date.now(),
            name: `Topic ${topics.length + 1}`,
            description: `Description for Topic ${topics.length + 1}`
        };
        setTopics([...topics, newTopic]);
    };

    const handleRemoveTopic = (id) => {
        const updatedTopics = topics.filter(topic => topic.id !== id);
        setTopics(updatedTopics);
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement logic to add the new course to the database
        console.log('Form submitted with data:', formData);
        // Reset form fields after submission
        setFormData({
            fid: '',
            cname: '',
            scode: '',
            year: '',
            topics: []
        });
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
            <form >
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Name</label>
                        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                    </div>
                    <div>
                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject Code</label>
                        <input type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
                    </div>
                    <div>
                        <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Faculty Id</label>
                        <input type="text" id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" required />
                    </div>
                    <div>
                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year</label>
                        <input type="tel" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                    </div>
                </div>
                <div class="mb-6">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                    <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                </div>
                <div class="mb-6">
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                </div>
                <div class="mb-6">
                    <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                    <input type="password" id="confirm_password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                </div>
                <div class="flex items-start mb-6">
                    <div class="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                    </div>
                    <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">Topics</h2>
                    {topics.map(topic => (
                        <TopicCard key={topic.id} topic={topic} onRemove={handleRemoveTopic} />
                    ))}
                    <button onClick={handleAddTopic} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Add Topic</button>
                </div>

                <button type="submit" className="inline-block mt-6 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">Add Course</button>
            </form>
        </div>
    );
}

function TopicCard({ topic, onRemove }) {
    const [mcqs, setMCQs] = useState(topic.mcqs);

    const handleAddMCQ = () => {
        const newMCQ = {
            id: Date.now(),
            question: `Question ${mcqs.length + 1}`,
            options: [{ opt: '', answer: false }]
        };
        setMCQs([...mcqs, newMCQ]);
    };

    const handleRemoveMCQ = (id) => {
        const updatedMCQs = mcqs.filter(mcq => mcq.id !== id);
        setMCQs(updatedMCQs);
    };
    return (
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold mb-2">name</h3>
            <p className="text-gray-600 mb-4">des</p>
            {mcqs.map(mcq => (
                <MCQCard key={mcq.id} mcq={mcq} onRemove={handleRemoveMCQ} />
            ))}
            <button onClick={handleAddMCQ} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Add Question</button>
            {/* <button onClick={() => onRemove(topic.id)} className="text-red-500 hover:text-red-700">Remove</button> */}
        </div>
    );
}

export default AddCourseComponent;