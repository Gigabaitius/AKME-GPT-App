(function() {
  'use strict';
  
  let akmeGPTPanel = null;
  
  const knowledgeBase = {
    objections: {
      'далеко': 'Понимаю ваши опасения. У нас компенсируются билеты в обе стороны, плюс хорошая зарплата за счет вахтового метода.',
      'не хочу': 'Понимаю, решение непростое. Могу рассказать подробнее об условиях - возможно, что-то заинтересует.',
      'мало': 'Зарплата от 80 000 рублей + премии + компенсация билетов. За вахту можно заработать очень хорошо.'
    },
    salary: {
      'зарплата': 'Зарплата от 80 000 рублей в месяц, выплачивается два раза: аванс 15 числа, основная часть до 5 числа.',
      'сколько': 'Заработная плата составляет от 80 000 рублей в месяц + премии по результатам работы.',
      'деньги': 'Оплата достойная - от 80 000 рублей + компенсация проезда + питание на объекте.'
    },
    documents: {
      'документы': 'Для трудоустройства нужны: паспорт, ИНН, СНИЛС, справка о несудимости (не старше 6 месяцев), медкнижка.',
      'справка': 'Справка о несудимости должна быть не старше 6 месяцев. Получить можно в МФЦ или через Госуслуги.',
      'медкнижка': 'Медкнижка оформляется по месту работы, мы поможем с этим вопросом.'
    },
    rotation: {
      'хорошо': 'Отлично! Рад слышать, что все хорошо. Когда планируете вернуться домой?',
      'нормально': 'Прекрасно! Как обстановка на объекте? Есть ли вопросы по работе?',
      'все ок': 'Замечательно! Скажите, как самочувствие? Работа не слишком тяжелая?'
    }
  };
  
  function initAKMEGPT() {
    console.log('🤖 AKME GPT: Инициализация...');
    createAKMEPanel();
    observeMessages();
    addGPTButtons();
  }
  
  function createAKMEPanel() {
    if (akmeGPTPanel) return;
    
    akmeGPTPanel = document.createElement('div');
    akmeGPTPanel.id = 'akme-gpt-panel';
    akmeGPTPanel.innerHTML = `
      <div class="akme-header">
        <div class="akme-logo">🤖 AKME GPT</div>
        <div class="akme-status">
          <span class="status-dot online"></span>
          Активен
        </div>
        <button class="akme-toggle" id="akme-toggle">−</button>
      </div>
      <div class="akme-content" id="akme-content">
        <div class="akme-suggestions" id="akme-suggestions">
          <div class="suggestion-item">
            <div class="suggestion-text">Готов помочь с ответами! 🚀</div>
          </div>
        </div>
        <div class="akme-controls">
          <button id="generate-response" class="akme-btn primary">Генерировать ответ</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(akmeGPTPanel);
    setupPanelEvents();
  }
  
  function setupPanelEvents() {
    document.getElementById('akme-toggle').addEventListener('click', function() {
      const content = document.getElementById('akme-content');
      const toggle = document.getElementById('akme-toggle');
      
      if (content.style.display === 'none') {
        content.style.display = 'block';
        toggle.textContent = '−';
      } else {
        content.style.display = 'none';
        toggle.textContent = '+';
      }
    });
    
    document.getElementById('generate-response').addEventListener('click', generateResponse);
  }
  
  function addGPTButtons() {
    const messageInputs = document.querySelectorAll('[contenteditable="true"], textarea[placeholder*="сообщение" i], input[placeholder*="сообщение" i]');
    
    messageInputs.forEach(input => {
      if (input.closest('#akme-gpt-panel')) return;
      
      const gptButton = document.createElement('button');
      gptButton.className = 'akme-gpt-btn';
      gptButton.innerHTML = '🤖';
      gptButton.title = 'Генерировать ответ с помощью AKME GPT';
      gptButton.onclick = (e) => {
        e.preventDefault();
        generateResponseForInput(input);
      };
      
      const parent = input.parentNode;
      if (parent && !parent.querySelector('.akme-gpt-btn')) {
        gptButton.style.position = 'absolute';
        gptButton.style.right = '10px';
        gptButton.style.top = '50%';
        gptButton.style.transform = 'translateY(-50%)';
        gptButton.style.zIndex = '1000';
        parent.style.position = 'relative';
        parent.appendChild(gptButton);
      }
    });
  }
  
  function observeMessages() {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1) {
            const messages = node.querySelectorAll('.message, .chat-message, [class*="message"]');
            messages.forEach(analyzeMessage);
            
            setTimeout(addGPTButtons, 100);
          }
        });
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  function analyzeMessage(messageElement) {
    const messageText = messageElement.textContent || messageElement.innerText;
    const isIncoming = !messageElement.classList.contains('outgoing') && 
                      !messageElement.classList.contains('sent');
    
    if (isIncoming && messageText.trim()) {
      const analysis = analyzeIncomingMessage(messageText);
      if (analysis.suggested) {
        showSuggestion(analysis);
      }
    }
  }
  
  function analyzeIncomingMessage(text) {
    const lowerText = text.toLowerCase();
    
    // Проверяем возражения
    for (const [key, response] of Object.entries(knowledgeBase.objections)) {
      if (lowerText.includes(key)) {
        return {
          type: 'objection',
          category: key,
          text: text,
          suggested: response
        };
      }
    }
    
    // Проверяем вопросы о зарплате
    for (const [key, response] of Object.entries(knowledgeBase.salary)) {
      if (lowerText.includes(key)) {
        return {
          type: 'salary',
          category: key,
          text: text,
          suggested: response
        };
      }
    }
    
    // Проверяем вопросы о документах
    for (const [key, response] of Object.entries(knowledgeBase.documents)) {
      if (lowerText.includes(key)) {
        return {
          type: 'documents',
          category: key,
          text: text,
          suggested: response
        };
      }
    }
    
    // Проверяем ответы перевахтовиков
    for (const [key, response] of Object.entries(knowledgeBase.rotation)) {
      if (lowerText.includes(key)) {
        return {
          type: 'rotation',
          category: key,
          text: text,
          suggested: response
        };
      }
    }
    
    return {
      type: 'general',
      category: 'unknown',
      text: text,
      suggested: 'Спасибо за сообщение! Сейчас разберем ваш вопрос.'
    };
  }
  
  function showSuggestion(analysis) {
    const suggestionsContainer = document.getElementById('akme-suggestions');
    if (!suggestionsContainer) return;
    
    const suggestionElement = document.createElement('div');
    suggestionElement.className = 'suggestion-item';
    suggestionElement.innerHTML = `
      <div class="suggestion-header">
        <span class="suggestion-type">${getTypeLabel(analysis.type)}</span>
        <span class="suggestion-time">${new Date().toLocaleTimeString()}</span>
      </div>
      <div class="suggestion-text">${analysis.suggested}</div>
      <div class="suggestion-actions">
        <button class="suggestion-btn use" onclick="akmeGPT.useSuggestion(\`${analysis.suggested}\`)">
          Использовать
        </button>
        <button class="suggestion-btn edit" onclick="akmeGPT.editSuggestion(\`${analysis.suggested}\`)">
          Редактировать
        </button>
      </div>
    `;
    
    suggestionsContainer.insertBefore(suggestionElement, suggestionsContainer.firstChild);
    
    while (suggestionsContainer.children.length > 5) {
      suggestionsContainer.removeChild(suggestionsContainer.lastChild);
    }
  }
  
  function getTypeLabel(type) {
    const labels = {
      'objection': '🚫 Возражение',
      'salary': '💰 Зарплата',
      'documents': '📄 Документы',
      'rotation': '🔄 Перевахтовик',
      'general': '💬 Общее'
    };
    return labels[type] || '💬 Сообщение';
  }
  
  function generateResponse() {
    const activeInput = findActiveMessageInput();
    if (!activeInput) {
      alert('Не найдено поле для ввода сообщения');
      return;
    }
    
    generateResponseForInput(activeInput);
  }
  
  function generateResponseForInput(input) {
    const lastMessage = getLastIncomingMessage();
    const analysis = analyzeIncomingMessage(lastMessage);
    
    if (analysis.suggested) {
      insertTextIntoInput(input, analysis.suggested);
      showSuggestion(analysis);
    } else {
      insertTextIntoInput(input, 'Спасибо за ваше сообщение! Сейчас разберем ваш вопрос.');
    }
  }
  
  function findActiveMessageInput() {
    const selectors = [
      '[contenteditable="true"]',
      'textarea[placeholder*="сообщение" i]',
      'input[placeholder*="сообщение" i]',
      '.message-input',
      '#message-input'
    ];
    
    for (const selector of selectors) {
      const elements = document.querySelectorAll(selector);
      for (const element of elements) {
        if (element.offsetParent !== null && !element.closest('#akme-gpt-panel')) {
          return element;
        }
      }
    }
    
    return null;
  }
  
  function getLastIncomingMessage() {
    const messages = document.querySelectorAll('.message, .chat-message, [class*="message"]');
    for (let i = messages.length - 1; i >= 0; i--) {
      const msg = messages[i];
      const isIncoming = !msg.classList.contains('outgoing') && !msg.classList.contains('sent');
      if (isIncoming) {
        return msg.textContent || msg.innerText;
      }
    }
    return '';
  }
  
  function insertTextIntoInput(input, text) {
    if (input.contentEditable === 'true') {
      input.focus();
      input.innerText = text;
      
      const event = new Event('input', { bubbles: true });
      input.dispatchEvent(event);
    } else {
      input.focus();
      input.value = text;
      
      const inputEvent = new Event('input', { bubbles: true });
      const changeEvent = new Event('change', { bubbles: true });
      input.dispatchEvent(inputEvent);
      input.dispatchEvent(changeEvent);
    }
  }
  
  window.akmeGPT = {
    useSuggestion: function(text) {
      const activeInput = findActiveMessageInput();
      if (activeInput) {
        insertTextIntoInput(activeInput, text);
      }
    },
    
    editSuggestion: function(text) {
      const newText = prompt('Редактировать ответ:', text);
      if (newText) {
        this.useSuggestion(newText);
      }
    }
  };
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAKMEGPT);
  } else {
    initAKMEGPT();
  }
  
  let currentUrl = location.href;
  new MutationObserver(() => {
    if (location.href !== currentUrl) {
      currentUrl = location.href;
      setTimeout(initAKMEGPT, 1000);
    }
  }).observe(document, { subtree: true, childList: true });
  
})();