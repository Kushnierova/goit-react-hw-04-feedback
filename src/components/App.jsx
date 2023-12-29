import { useState, useEffect, useCallback } from 'react';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Sections from './Sections';
import Notification from './Notification';
import css from './App.module.css';

export function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onLeaveFeedback = event => {
    const feedback = event.target.name;

    if (feedback === 'good') {
      setGood(good + 1);
    } else if (feedback === 'neutral') {
      setNeutral(neutral + 1);
    } else if (feedback === 'bad') {
      setBad(bad + 1);
    }
  };

  const countTotalFeedback = useCallback(() => {
    let total = good + neutral + bad;
    return total;
  }, [good, neutral, bad]);

  const countPositiveFeedbackPercentage = useCallback(() => {
    let percentage = Number((100 / countTotalFeedback()) * good).toFixed(0);
    return percentage;
  }, [good, countTotalFeedback]);

  useEffect(() => {
    countTotalFeedback();
    countPositiveFeedbackPercentage();
  }, [countTotalFeedback, countPositiveFeedbackPercentage]);

  return (
    <div className={css.formFeedback}>
      <Sections
        title="Please leave feedback"
        className={css.feedback}
        classNameTitle={css.feedbackTitle}
      >
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Sections>

      <Sections
        title="Statistics"
        className={css.statistics}
        classNameTitle={css.statisticsTitle}
      >
        {countTotalFeedback() ? (
          <Statistics
            options={['good', 'neutral', 'bad']}
            values={[good, neutral, bad]}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Sections>
    </div>
  );
}