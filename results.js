const DEFAULT_SCORES = {
  analytical: 0,
  creative: 0,
  logic: 0,
  communication: 0,
};

const RESULT_CONTENT = {
  analytical: {
    emoji: '💼',
    title: 'Аналітичне мислення',
    description:
      'Ти шукаєш опору в цифрах і фактах, легко бачиш закономірності та не боїшся копати глибоко. Системність та увага до деталей роблять твої рішення переконливими.',
  },
  creative: {
    emoji: '🎨',
    title: 'Креативне мислення',
    description:
      'Ти генеруєш ідеї, там де інші бачать глухий кут. Експерименти, візуальні метафори та сміливі ходи заряджають команду натхненням.',
  },
  logic: {
    emoji: '🧠',
    title: 'Логічне мислення',
    description:
      'Ти структуруєш хаос і перетворюєш його на зрозумілий алгоритм. Послідовність, причинно-наслідкові зв’язки та прозорі правила — твоя стихія.',
  },
  communication: {
    emoji: '💬',
    title: 'Комунікаційне мислення',
    description:
      'Ти об’єднуєш людей, допомагаєш домовлятися та бачити спільну мету. Вмієш слухати, ставити питання й робити складні речі зрозумілими.',
  },
};

function readScores() {
  try {
    const raw = JSON.parse(localStorage.getItem('thinkingScores'));
    if (!raw || typeof raw !== 'object') return { ...DEFAULT_SCORES };
    return { ...DEFAULT_SCORES, ...raw };
  } catch (err) {
    return { ...DEFAULT_SCORES };
  }
}

function findDominant(scores) {
  const entries = Object.entries(scores);
  if (!entries.length) return 'logic';

  entries.sort(([, a], [, b]) => b - a);
  const [topType, topValue] = entries[0];
  if (topValue === 0) return 'logic';
  return topType;
}

function renderResult() {
  const scores = readScores();
  const bestType = findDominant(scores);
  const content = RESULT_CONTENT[bestType] || RESULT_CONTENT.logic;

  const typeEl = document.getElementById('result-type');
  const titleEl = document.getElementById('result-title');
  const descriptionEl = document.getElementById('result-description');

  if (typeEl) typeEl.textContent = `${content.emoji} ${content.title}`;
  if (titleEl) titleEl.textContent = content.title;
  if (descriptionEl) descriptionEl.textContent = content.description;
}

document.addEventListener('DOMContentLoaded', renderResult);