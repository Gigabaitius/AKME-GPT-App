import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Calendar, 
  Send, 
  CheckCircle, 
  User, 
  MessageSquare,
  Bot,
  Users,
  FileText,
  Bell,
  Search,
  Download,
  MapPin,
  CreditCard,
  BarChart3,
  Zap,
  Globe
} from 'lucide-react';

const AKME_GPT = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [user, setUser] = useState({ name: 'Анна Иванова', avatar: '👩‍💼' });
  
  // Состояние автоматизации
  const [automationStatus, setAutomationStatus] = useState({
    isActive: false,
    autoReply: false,
    chatScanning: false,
    processedToday: 0,
    autoRepliesCount: 0
  });
  
  // Статистика в реальном времени
  const [realtimeStats, setRealtimeStats] = useState({
    activeChats: 5,
    pendingReplies: 2,
    todayMessages: 23,
    successRate: 85
  });

  // Состояние обучения GPT
  const [trainingSession, setTrainingSession] = useState({
    isActive: false,
    mode: 'analysis',
    messages: [],
    currentStep: 0,
    waitingForResponse: false
  });

  const navigation = [
    { id: 'dashboard', name: 'Дашборд', icon: BarChart3 },
    { id: 'automation', name: 'Автоматизация', icon: Zap },
    { id: 'training', name: 'Обучение GPT', icon: Bot },
    { id: 'today', name: 'Сегодня', icon: Calendar },
    { id: 'mailings', name: 'Рассылки', icon: Send },
    { id: 'check', name: 'Проверка', icon: CheckCircle },
    { id: 'workers', name: 'Вахтовики', icon: Users },
    { id: 'candidates', name: 'Кандидаты', icon: User },
    { id: 'knowledge', name: 'База знаний', icon: FileText },
    { id: 'integration', name: 'Интеграция', icon: Globe }
  ];

  // Компонент дашборда
  const DashboardTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Дашборд AKME GPT</h2>
        <div className="flex items-center gap-3">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            automationStatus.isActive 
              ? 'bg-green-900 text-green-300' 
              : 'bg-red-900 text-red-300'
          }`}>
            {automationStatus.isActive ? '🟢 Активен' : '🔴 Неактивен'}
          </div>
          <button 
            onClick={() => setAutomationStatus(prev => ({ ...prev, isActive: !prev.isActive }))}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              automationStatus.isActive
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {automationStatus.isActive ? 'Остановить' : 'Запустить'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Активные чаты</p>
              <p className="text-2xl font-bold text-white">{realtimeStats.activeChats}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Ожидают ответа</p>
              <p className="text-2xl font-bold text-white">{realtimeStats.pendingReplies}</p>
            </div>
            <Bell className="w-8 h-8 text-yellow-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Сообщений сегодня</p>
              <p className="text-2xl font-bold text-white">{realtimeStats.todayMessages}</p>
            </div>
            <Send className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Успешность ответов</p>
              <p className="text-2xl font-bold text-white">{realtimeStats.successRate}%</p>
            </div>
            <CheckCircle className="w-8 h-8 text-purple-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Последние действия</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm">Автоответ отправлен</p>
                <p className="text-gray-400 text-xs">Игорь Петров • 2 мин назад</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Search className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm">Сканирование чатов</p>
                <p className="text-gray-400 text-xs">5 новых сообщений • 5 мин назад</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Быстрые действия</h3>
          <div className="space-y-3">
            <button 
              onClick={() => setActiveTab('automation')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg flex items-center gap-3 transition-colors"
            >
              <Zap className="w-5 h-5" />
              Настроить автоматизацию
            </button>
            <button 
              onClick={() => setActiveTab('mailings')}
              className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg flex items-center gap-3 transition-colors"
            >
              <Send className="w-5 h-5" />
              Массовая рассылка
            </button>
            <button 
              onClick={() => setActiveTab('training')}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg flex items-center gap-3 transition-colors"
            >
              <Bot className="w-5 h-5" />
              Обучить GPT
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Компонент автоматизации
  const AutomationTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Автоматизация</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Основные настройки</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Автоматические ответы</p>
                <p className="text-gray-400 text-sm">GPT отвечает на типовые вопросы</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={automationStatus.autoReply}
                  onChange={(e) => setAutomationStatus(prev => ({ ...prev, autoReply: e.target.checked }))}
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Сканирование чатов</p>
                <p className="text-gray-400 text-sm">Автоматический поиск новых сообщений</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={automationStatus.chatScanning}
                  onChange={(e) => setAutomationStatus(prev => ({ ...prev, chatScanning: e.target.checked }))}
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Статистика автоматизации</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <span className="text-gray-300">Обработано сегодня:</span>
              <span className="text-green-400 font-bold">{automationStatus.processedToday}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <span className="text-gray-300">Автоответов отправлено:</span>
              <span className="text-blue-400 font-bold">{automationStatus.autoRepliesCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Компонент обучения GPT
  const TrainingTab = () => {
    const [inputMessage, setInputMessage] = useState('');
    
    const startTraining = (mode) => {
      const initialMessage = mode === 'analysis' 
        ? "Привет! Я готов анализировать чаты и учиться. Загрузи чат или расскажи о диалоге с кандидатом, который я должен проанализировать."
        : "Привет! Готов к уроку. Расскажи мне о скриптах, условиях труда или любой другой информации, которую я должен знать для работы с кандидатами.";
        
      setTrainingSession({
        isActive: true,
        mode: mode,
        messages: [
          {
            id: 1,
            sender: 'gpt',
            text: initialMessage,
            timestamp: new Date().toLocaleTimeString()
          }
        ],
        currentStep: 1,
        waitingForResponse: true
      });
    };

    const sendMessage = () => {
      if (!inputMessage.trim() || !trainingSession.isActive) return;

      const userMessage = {
        id: trainingSession.messages.length + 1,
        sender: 'user',
        text: inputMessage,
        timestamp: new Date().toLocaleTimeString()
      };

      const gptResponse = generateTrainingResponse(inputMessage, trainingSession.mode);
      const gptMessage = {
        id: trainingSession.messages.length + 2,
        sender: 'gpt',
        text: gptResponse,
        timestamp: new Date().toLocaleTimeString()
      };

      setTrainingSession(prev => ({
        ...prev,
        messages: [...prev.messages, userMessage, gptMessage],
        currentStep: prev.currentStep + 1,
        waitingForResponse: true
      }));

      setInputMessage('');
    };

    const generateTrainingResponse = (userInput, mode) => {
      const lowerInput = userInput.toLowerCase();
      
      if (mode === 'analysis') {
        if (lowerInput.includes('зарплата') || lowerInput.includes('сколько')) {
          return "Анализирую: кандидат спрашивает о зарплате. Рекомендую ответить: 'Зарплата от 80 000 рублей в месяц + премии'. Как вы обычно отвечаете на такие вопросы? Есть ли нюансы для разных объектов?";
        } else if (lowerInput.includes('документы')) {
          return "Вижу вопрос о документах. Стандартный ответ: паспорт, ИНН, СНИЛС, справка о несудимости, медкнижка. Но скажите, есть ли особенности для разных позиций? Какие документы самые проблемные?";
        } else if (lowerInput.includes('далеко') || lowerInput.includes('расстояние')) {
          return "Классическое возражение о расстоянии. Я предложу про компенсацию билетов и хорошую зарплату. А какие еще аргументы вы используете? Может быть, примеры успешных сотрудников?";
        } else {
          return `Интересный случай! Помогите мне понять: как бы вы ответили на "${userInput}"? Какой подход здесь лучше использовать?`;
        }
      } else {
        if (lowerInput.includes('урок') || lowerInput.includes('расскажу')) {
          return "Отлично! Внимательно слушаю. Записываю всю информацию в свою базу знаний. Продолжайте, пожалуйста.";
        } else if (lowerInput.includes('объект') || lowerInput.includes('предприятие')) {
          return "Записал информацию об объекте. Важные моменты: условия, специфика, контакты. Есть ли еще что-то важное об этом объекте? Или расскажете про другой?";
        } else {
          return `Записываю: "${userInput}". Очень полезная информация! Есть ли исключения из этого правила? Или дополнительные детали?`;
        }
      }
    };

    const stopTraining = () => {
      setTrainingSession({
        isActive: false,
        mode: 'analysis',
        messages: [],
        currentStep: 0,
        waitingForResponse: false
      });
    };

    const exportTrainingLog = () => {
      const log = trainingSession.messages.map(msg => 
        `[${msg.timestamp}] ${msg.sender.toUpperCase()}: ${msg.text}`
      ).join('\n\n');
      
      const blob = new Blob([log], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `training-session-${new Date().toISOString().split('T')[0]}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Обучение GPT</h2>
          <div className="flex items-center gap-3">
            {trainingSession.isActive && (
              <div className="px-3 py-1 bg-green-900 text-green-300 rounded-full text-sm font-medium animate-pulse">
                🟢 Сессия активна
              </div>
            )}
          </div>
        </div>

        {!trainingSession.isActive ? (
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
            <Bot className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-white mb-4">Выберите режим обучения</h3>
            <p className="text-gray-400 mb-8">GPT готов учиться! Выберите, как будете его обучать:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-700 rounded-lg p-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Анализ чатов</h4>
                <p className="text-gray-300 text-sm mb-4">GPT анализирует реальные диалоги, задает вопросы и учится на ваших ответах</p>
                <button 
                  onClick={() => startTraining('analysis')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Начать анализ
                </button>
              </div>

              <div className="bg-gray-700 rounded-lg p-6">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Уроки и скрипты</h4>
                <p className="text-gray-300 text-sm mb-4">Рассказывайте GPT про условия труда, скрипты ответов и специфику работы</p>
                <button 
                  onClick={() => startTraining('lesson')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Начать урок
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg border border-gray-700 h-[600px] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <Bot className="w-6 h-6 text-blue-400" />
                <div>
                  <h3 className="text-white font-medium">GPT Обучение</h3>
                  <p className="text-gray-400 text-sm">
                    {trainingSession.mode === 'analysis' ? 'Режим: Анализ чатов' : 'Режим: Уроки и скрипты'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={exportTrainingLog}
                  className="p-2 text-gray-400 hover:text-white rounded-lg transition-colors"
                  title="Экспорт лога"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button 
                  onClick={stopTraining}
                  className="p-2 text-gray-400 hover:text-white rounded-lg transition-colors"
                  title="Завершить сессию"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {trainingSession.messages.map(message => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 text-gray-100'
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      {message.sender === 'gpt' ? (
                        <Bot className="w-4 h-4 text-blue-400" />
                      ) : (
                        <User className="w-4 h-4 text-blue-200" />
                      )}
                      <span className="text-xs opacity-75">{message.timestamp}</span>
                    </div>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-700">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder={trainingSession.mode === 'analysis' 
                    ? "Опишите диалог или вставьте сообщение кандидата..." 
                    : "Расскажите о скриптах, условиях труда или задайте вопрос..."}
                  className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim()}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Отправить
                </button>
              </div>
              
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                <span>Шаг: {trainingSession.currentStep}</span>
                <span>•</span>
                <span>Сообщений: {trainingSession.messages.length}</span>
                <span>•</span>
                <span className="text-blue-400">Enter для отправки</span>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Search className="w-5 h-5 text-blue-400" />
              <h4 className="text-white font-medium">Анализ чатов</h4>
            </div>
            <p className="text-2xl font-bold text-white">12</p>
            <p className="text-gray-400 text-sm">Проанализировано диалогов</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-5 h-5 text-green-400" />
              <h4 className="text-white font-medium">Уроки</h4>
            </div>
            <p className="text-2xl font-bold text-white">8</p>
            <p className="text-gray-400 text-sm">Проведено уроков</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Bot className="w-5 h-5 text-purple-400" />
              <h4 className="text-white font-medium">Знания</h4>
            </div>
            <p className="text-2xl font-bold text-white">156</p>
            <p className="text-gray-400 text-sm">Фактов в базе знаний</p>
          </div>
        </div>
      </div>
    );
  };

  // Компонент интеграции
  const IntegrationTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Интеграция с Wazzup24</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Статус подключения</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-400 font-medium">Расширение активно</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-400 font-medium">Wazzup24 подключен</span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-green-900 border border-green-700 rounded-lg">
            <p className="text-green-300 text-sm">
              ✅ Расширение работает корректно. Все функции доступны.
            </p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Настройки синхронизации</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white font-medium mb-2">URL приложения</label>
              <input 
                type="text" 
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white"
                value="http://localhost:3000"
                readOnly
              />
            </div>
            
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium transition-colors">
              Переподключить расширение
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Компонент задач на сегодня
  const TodayTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Задачи на сегодня</h2>
      
      <div className="grid gap-4">