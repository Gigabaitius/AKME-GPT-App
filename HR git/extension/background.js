// background.js - исправленная версия
chrome.runtime.onInstalled.addListener(() => {
  console.log('🤖 AKME GPT Extension установлено');
});

// Обработка сообщений от content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "generateResponse") {
    generateGPTResponse(request.data).then(response => {
      sendResponse({success: true, response: response});
    }).catch(error => {
      sendResponse({success: false, error: error.message});
    });
    return true;
  }
  
  if (request.action === "saveToKnowledge") {
    saveToKnowledgeBase(request.data);
    sendResponse({success: true});
    return true;
  }
});

async function generateGPTResponse(data) {
  const { message } = data;
  const lowerMessage = message.toLowerCase();
  
  // Простые ответы на основе ключевых слов
  if (lowerMessage.includes('зарплата') || lowerMessage.includes('сколько')) {
    return 'Зарплата от 80 000 рублей в месяц, выплачивается два раза: аванс 15 числа, основная часть до 5 числа.';
  }
  
  if (lowerMessage.includes('документы') || lowerMessage.includes('справка')) {
    return 'Для трудоустройства нужны: паспорт, ИНН, СНИЛС, справка о несудимости (не старше 6 месяцев), медкнижка.';
  }
  
  if (lowerMessage.includes('далеко') || lowerMessage.includes('не хочу')) {
    return 'Понимаю ваши опасения. У нас компенсируются билеты в обе стороны, плюс хорошая зарплата за счет вахтового метода.';
  }
  
  if (lowerMessage.includes('хорошо') || lowerMessage.includes('нормально')) {
    return 'Отлично! Рад слышать, что все хорошо. Когда планируете вернуться домой?';
  }
  
  return 'Спасибо за ваше сообщение! Сейчас разберем ваш вопрос.';
}

function saveToKnowledgeBase(data) {
  chrome.storage.local.get(['akme_knowledge'], (result) => {
    const knowledge = result.akme_knowledge || [];
    knowledge.push({
      ...data,
      timestamp: Date.now(),
      id: Date.now().toString()
    });
    
    chrome.storage.local.set({ akme_knowledge: knowledge });
  });
}