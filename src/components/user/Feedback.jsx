import React, { useState } from 'react';
import instance from '../../utils/axios';
import PropTypes from 'prop-types';

const Feedback = ({ eventId, onFeedbackSubmit }) => {
    const [comment, setComment] = useState('');

    const handleFeedbackSubmit = async () => {
        console.log('Type of onFeedbackSubmit:', typeof onFeedbackSubmit);

        try {
            const response = await instance.post('http://127.0.0.1:8000/events/feedback/', {
                event: eventId,
                comment,
            });

            setComment(''); // Clear the input field after submission

            // Check if onFeedbackSubmit is a function before calling it
            if (typeof onFeedbackSubmit === 'function') {
                onFeedbackSubmit(response.data); // Notify the parent component about the new feedback
            } else {
                console.error('onFeedbackSubmit is not a function');
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    return (
        <div>
            <label htmlFor="comment">Write a Comment:</label>
            <textarea
                id="comment"
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button type="button" onClick={handleFeedbackSubmit}>
                Submit Comment
            </button>
        </div>
    );
};

Feedback.propTypes = {
    eventId: PropTypes.string.isRequired,
    onFeedbackSubmit: PropTypes.func.isRequired,
};

export default Feedback;
