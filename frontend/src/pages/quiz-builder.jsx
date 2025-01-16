// pages/quiz-builder.js
import Header from "../components/Header";
import QuizForm from "../components/QuizForm";
// import Footer from "../components/Footer";

const QuizBuilderPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <main className="flex-grow bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600">
        <QuizForm />
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default QuizBuilderPage;
