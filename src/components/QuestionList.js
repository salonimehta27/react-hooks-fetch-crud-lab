import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(resp => resp.json())
      .then(data => setQuestions(data))
  }, [])
  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(resp => resp.json())
      .then(() => {
        const updatedQuestions = questions.filter(d => d.id !== id)
        setQuestions(updatedQuestions)
      })

  }
  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        "correctIndex": parseInt(correctIndex)
      })
    }).then(resp => resp.json())
      .then((updatedQuestion) => {
        //console.log(updatedQuestion)
        const updatedQuestions = questions.map((q) => {
          if (q.id === updatedQuestion.id) return updatedQuestion;
          return q;
        })
        setQuestions(updatedQuestions);
      })
  }
  const questionsList = questions.map((q) => <QuestionItem key={q.id}
    question={q}
    onDeleteClick={handleDeleteClick}
    onAnswerChange={handleAnswerChange}></QuestionItem>)
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionsList}</ul>
    </section>
  )
}

export default QuestionList;
