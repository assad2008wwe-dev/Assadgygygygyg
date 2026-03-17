import { useState, useEffect } from 'react';
import { BrainCircuit, CheckCircle2, XCircle, ArrowRight, RotateCcw, Play, Key, Sparkles, Loader2, Settings } from 'lucide-react';
import { questions, Question, Difficulty, QuestionType } from './data/questions';
import { GoogleGenAI } from '@google/genai';

type GameState = 'setup' | 'playing' | 'results';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('setup');
  
  // API Key State
  const [apiKey, setApiKey] = useState('');
  const [showApiModal, setShowApiModal] = useState(false);
  const [tempApiKey, setTempApiKey] = useState('');

  // Setup state
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All');
  const [selectedType, setSelectedType] = useState<QuestionType | 'All'>('All');
  
  // Playing state
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [currentSelection, setCurrentSelection] = useState<string>('');

  // AI State
  const [aiExplanations, setAiExplanations] = useState<Record<number, string>>({});
  const [loadingAi, setLoadingAi] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) {
      setApiKey(storedKey);
      setTempApiKey(storedKey);
    } else {
      setShowApiModal(true);
    }
  }, []);

  const saveApiKey = () => {
    localStorage.setItem('gemini_api_key', tempApiKey);
    setApiKey(tempApiKey);
    setShowApiModal(false);
  };

  const getAiExplanation = async (question: Question) => {
    if (!apiKey) {
      setShowApiModal(true);
      return;
    }
    setLoadingAi(prev => ({ ...prev, [question.id]: true }));
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-preview',
        contents: `You are a medical tutor. Explain the following concept related to community medicine.
        Question: ${question.text}
        Correct Answer: ${question.correctAnswer}
        Brief Explanation: ${question.explanation}
        
        Provide a slightly more detailed, easy-to-understand explanation for a medical student. Keep it concise (3-4 sentences).`
      });
      setAiExplanations(prev => ({ ...prev, [question.id]: response.text || 'No explanation generated.' }));
    } catch (err) {
      console.error(err);
      setAiExplanations(prev => ({ ...prev, [question.id]: 'Error generating explanation. Please check your API key or network connection.' }));
    } finally {
      setLoadingAi(prev => ({ ...prev, [question.id]: false }));
    }
  };

  const startQuiz = () => {
    let filtered = questions;
    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter(q => q.difficulty === selectedDifficulty);
    }
    if (selectedType !== 'All') {
      filtered = filtered.filter(q => q.type === selectedType);
    }
    
    // Shuffle questions
    filtered = [...filtered].sort(() => Math.random() - 0.5);
    
    setActiveQuestions(filtered);
    setCurrentIndex(0);
    setUserAnswers({});
    setCurrentSelection('');
    setAiExplanations({});
    setGameState('playing');
  };

  const handleNext = () => {
    setUserAnswers(prev => ({
      ...prev,
      [activeQuestions[currentIndex].id]: currentSelection
    }));
    
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setCurrentSelection('');
    } else {
      setGameState('results');
    }
  };

  const calculateScore = () => {
    let correct = 0;
    activeQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  return (
    <>
      {/* API Key Modal */}
      {showApiModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-indigo-100 p-2 rounded-full text-indigo-600">
                <Key className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Gemini API Key</h2>
            </div>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              To use the AI Tutor features when running externally, please enter your Gemini API Key. It will be stored securely in your browser's local storage.
            </p>
            <input
              type="password"
              placeholder="AIzaSy..."
              className="w-full border border-slate-300 rounded-xl p-3 mb-6 focus:ring-2 focus:ring-indigo-600 focus:outline-none font-mono text-sm"
              onChange={(e) => setTempApiKey(e.target.value)}
              value={tempApiKey}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowApiModal(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-medium transition-colors"
              >
                Skip
              </button>
              <button
                onClick={saveApiKey}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors"
              >
                Save Key
              </button>
            </div>
          </div>
        </div>
      )}

      {gameState === 'setup' && (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-900 relative">
          <button 
            onClick={() => setShowApiModal(true)}
            className="absolute top-4 right-4 p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
            title="Configure API Key"
          >
            <Settings className="w-6 h-6" />
          </button>

          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-indigo-600 p-8 text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BrainCircuit className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Community Medicine Quiz</h1>
              <p className="text-indigo-100 text-sm">Test your knowledge on public health, epidemiology, and psychosocial concepts.</p>
            </div>
            
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Difficulty Level</label>
                <div className="grid grid-cols-2 gap-2">
                  {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(diff as any)}
                      className={`py-2 px-4 rounded-xl text-sm font-medium transition-colors ${
                        selectedDifficulty === diff 
                          ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-600' 
                          : 'bg-slate-100 text-slate-600 border-2 border-transparent hover:bg-slate-200'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Question Type</label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: 'All', label: 'Mixed (MCQs & True/False)' },
                    { id: 'MCQ', label: 'Multiple Choice Only' },
                    { id: 'TF', label: 'True / False Only' }
                  ].map(type => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id as any)}
                      className={`py-3 px-4 rounded-xl text-sm font-medium transition-colors text-left ${
                        selectedType === type.id 
                          ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-600' 
                          : 'bg-slate-100 text-slate-600 border-2 border-transparent hover:bg-slate-200'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={startQuiz}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Play className="w-5 h-5" />
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans">
          <div className="w-full max-w-2xl">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
                <span>Question {currentIndex + 1} of {activeQuestions.length}</span>
                <span className="text-indigo-600">{activeQuestions[currentIndex]?.difficulty}</span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-300 ease-out"
                  style={{ width: `${((currentIndex) / activeQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            {activeQuestions[currentIndex] && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10">
                <div className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
                  {activeQuestions[currentIndex].type === 'MCQ' ? 'Multiple Choice' : 'True / False'}
                </div>
                
                <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-8 leading-relaxed">
                  {activeQuestions[currentIndex].text}
                </h2>

                <div className="space-y-3">
                  {activeQuestions[currentIndex].options?.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSelection(option)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        currentSelection === option
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                          : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          currentSelection === option ? 'border-indigo-600' : 'border-slate-300'
                        }`}>
                          {currentSelection === option && <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />}
                        </div>
                        <span className="text-base font-medium">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-10 flex justify-end">
                  <button
                    onClick={handleNext}
                    disabled={!currentSelection}
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-xl flex items-center gap-2 transition-colors"
                  >
                    {currentIndex === activeQuestions.length - 1 ? 'Finish' : 'Next'}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {gameState === 'results' && (
        <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 text-center mb-8 relative">
              <button 
                onClick={() => setShowApiModal(true)}
                className="absolute top-4 right-4 p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                title="Configure API Key"
              >
                <Settings className="w-6 h-6" />
              </button>

              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-indigo-50 mb-6">
                <span className="text-4xl font-bold text-indigo-600">
                  {Math.round((calculateScore() / activeQuestions.length) * 100)}%
                </span>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Quiz Completed!</h1>
              <p className="text-slate-600 text-lg mb-8">
                You scored {calculateScore()} out of {activeQuestions.length} correct.
              </p>
              <button
                onClick={() => setGameState('setup')}
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                Take Another Quiz
              </button>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 px-2">Detailed Review</h2>
              {activeQuestions.map((q, idx) => {
                const userAnswer = userAnswers[q.id];
                const isCorrect = userAnswer === q.correctAnswer;

                return (
                  <div key={q.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        {isCorrect ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                        ) : (
                          <XCircle className="w-6 h-6 text-rose-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-semibold text-slate-500">Question {idx + 1}</span>
                          <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">{q.difficulty}</span>
                        </div>
                        <p className="text-lg font-medium text-slate-900 mb-4">{q.text}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <span className="text-xs font-semibold text-slate-500 uppercase block mb-1">Your Answer</span>
                            <span className={`font-medium ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                              {userAnswer}
                            </span>
                          </div>
                          {!isCorrect && (
                            <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                              <span className="text-xs font-semibold text-emerald-600 uppercase block mb-1">Correct Answer</span>
                              <span className="font-medium text-emerald-800">{q.correctAnswer}</span>
                            </div>
                          )}
                        </div>

                        <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                          <span className="text-xs font-bold text-indigo-800 uppercase tracking-wider block mb-1">Explanation</span>
                          <p className="text-sm text-indigo-900 leading-relaxed">{q.explanation}</p>
                        </div>

                        {/* AI Tutor Section */}
                        <div className="mt-4 border-t border-slate-100 pt-4">
                          {!aiExplanations[q.id] && !loadingAi[q.id] ? (
                            <button
                              onClick={() => getAiExplanation(q)}
                              className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                            >
                              <Sparkles className="w-4 h-4" />
                              Ask AI Tutor for more details
                            </button>
                          ) : loadingAi[q.id] ? (
                            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              AI is thinking...
                            </div>
                          ) : (
                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-100/50">
                              <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="w-4 h-4 text-indigo-600" />
                                <span className="text-xs font-bold text-indigo-800 uppercase tracking-wider">AI Tutor Explanation</span>
                              </div>
                              <p className="text-sm text-slate-700 leading-relaxed">
                                {aiExplanations[q.id]}
                              </p>
                            </div>
                          )}
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
