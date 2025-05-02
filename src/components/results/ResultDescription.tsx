
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TestResults } from '@/types/test';
import Icon from '@/components/ui/icon';

interface ResultDescriptionProps {
  title: string;
  icon: string;
  value: number;
  color: string;
  descriptions: { range: [number, number]; text: string }[];
}

const getDescriptionByValue = (
  value: number,
  descriptions: { range: [number, number]; text: string }[]
): string => {
  for (const desc of descriptions) {
    const [min, max] = desc.range;
    if (value >= min && value <= max) {
      return desc.text;
    }
  }
  return "Описание не найдено";
};

export const PersonalityDescription: React.FC<{ personality: number }> = ({ personality }) => {
  const descriptions = [
    {
      range: [0, 30],
      text: "Вы типичный интроверт. Предпочитаете глубокие беседы с небольшим кругом близких людей. Общение с малознакомыми людьми может быть для вас энергозатратным. Ваша сильная сторона - умение слушать и анализировать."
    },
    {
      range: [31, 50],
      text: "Вы умеренный интроверт. Цените время, проведенное наедине с собой, но способны эффективно общаться, когда это необходимо. Предпочитаете небольшие компании и глубокое общение."
    },
    {
      range: [51, 70],
      text: "Вы амбиверт с небольшим уклоном в экстраверсию. Хорошо чувствуете себя как в компании, так и в одиночестве. Умеете находить баланс между социальной активностью и личным пространством."
    },
    {
      range: [71, 100],
      text: "Вы явный экстраверт. Легко заводите новые знакомства, любите быть в центре внимания. Общение с другими людьми заряжает вас энергией. Ваша сильная сторона - коммуникабельность и энтузиазм."
    }
  ];

  return (
    <ResultDescription
      title="Общительность"
      icon="Users"
      value={personality}
      color="blue"
      descriptions={descriptions}
    />
  );
};

export const TemperamentDescription: React.FC<{ temperament: number }> = ({ temperament }) => {
  const descriptions = [
    {
      range: [0, 30],
      text: "Вы обладаете чертами флегматика - спокойны, уравновешены, редко проявляете сильные эмоции. Предпочитаете стабильность и постепенные изменения. Ваша сильная сторона - надежность и последовательность."
    },
    {
      range: [31, 50],
      text: "В вашем темпераменте преобладают черты меланхолика с элементами флегматика. Вы чувствительны, склонны к глубоким размышлениям, но обычно сохраняете внешнее спокойствие."
    },
    {
      range: [51, 70],
      text: "Вы сангвиник с элементами холерика. Активны, энергичны, быстро переключаетесь между задачами. Умеете адаптироваться к новым ситуациям, но иногда можете проявлять нетерпеливость."
    },
    {
      range: [71, 100],
      text: "В вашем темпераменте ярко выражены черты холерика. Вы эмоциональны, энергичны, быстро реагируете на изменения. Ваша сильная сторона - страстность и решительность в действиях."
    }
  ];

  return (
    <ResultDescription
      title="Темперамент"
      icon="Zap"
      value={temperament}
      color="yellow"
      descriptions={descriptions}
    />
  );
};

export const ConfidenceDescription: React.FC<{ confidence: number }> = ({ confidence }) => {
  const descriptions = [
    {
      range: [0, 30],
      text: "У вас низкий уровень уверенности в себе. Вы часто сомневаетесь в своих силах и способностях, избегаете рисков и новых ситуаций. Работа над повышением самооценки поможет раскрыть ваш потенциал."
    },
    {
      range: [31, 50],
      text: "У вас умеренный уровень уверенности. В знакомых ситуациях вы чувствуете себя уверенно, но можете испытывать тревогу перед новыми вызовами. Вы реалистично оцениваете свои возможности."
    },
    {
      range: [51, 70],
      text: "Вы обладаете здоровой уверенностью в себе. Хорошо знаете свои сильные стороны, готовы принимать вызовы и рисковать в разумных пределах. Умеете учиться на ошибках."
    },
    {
      range: [71, 100],
      text: "У вас высокий уровень уверенности в себе. Вы решительны, не боитесь трудностей и новых начинаний. Ваша сильная сторона - вера в свои способности и готовность брать на себя ответственность."
    }
  ];

  return (
    <ResultDescription
      title="Уверенность"
      icon="Shield"
      value={confidence}
      color="green"
      descriptions={descriptions}
    />
  );
};

export const IrritabilityDescription: React.FC<{ irritability: number }> = ({ irritability }) => {
  const descriptions = [
    {
      range: [0, 30],
      text: "У вас высокий уровень раздражительности. Вы легко выходите из себя, бурно реагируете на неприятные ситуации. Работа над управлением эмоциями поможет улучшить качество жизни и отношения."
    },
    {
      range: [31, 50],
      text: "У вас повышенный уровень раздражительности. В стрессовых ситуациях вы можете терять контроль над эмоциями, но обычно быстро восстанавливаете равновесие."
    },
    {
      range: [51, 70],
      text: "У вас умеренный уровень раздражительности. Вы обычно хорошо контролируете свои эмоции, но в особенно напряженных ситуациях можете проявлять недовольство."
    },
    {
      range: [71, 100],
      text: "У вас низкий уровень раздражительности. Вы спокойно реагируете на большинство ситуаций, умеете контролировать негативные эмоции. Ваша сильная сторона - эмоциональная стабильность."
    }
  ];

  return (
    <ResultDescription
      title="Раздражительность"
      icon="AlertTriangle"
      value={irritability}
      color="red"
      descriptions={descriptions}
    />
  );
};

export const AnxietyDescription: React.FC<{ anxiety: number }> = ({ anxiety }) => {
  const descriptions = [
    {
      range: [0, 30],
      text: "У вас высокий уровень тревожности. Вы часто беспокоитесь о будущем, ожидаете негативных исходов. Техники релаксации и работа с негативными мыслями помогут снизить тревогу."
    },
    {
      range: [31, 50],
      text: "У вас повышенный уровень тревожности. В важных или неопределенных ситуациях вы испытываете беспокойство, но обычно справляетесь с ним."
    },
    {
      range: [51, 70],
      text: "У вас умеренный уровень тревожности. Вы обычно спокойны, но проявляете здоровую осторожность в неопределенных ситуациях. Умеете планировать и предвидеть риски."
    },
    {
      range: [71, 100],
      text: "У вас низкий уровень тревожности. Вы редко беспокоитесь о будущем, уверенно смотрите вперед. Ваша сильная сторона - психологическая устойчивость и оптимизм."
    }
  ];

  return (
    <ResultDescription
      title="Тревожность"
      icon="Brain"
      value={anxiety}
      color="purple"
      descriptions={descriptions}
    />
  );
};

const ResultDescription: React.FC<ResultDescriptionProps> = ({
  title,
  icon,
  value,
  color,
  descriptions,
}) => {
  const description = getDescriptionByValue(value, descriptions);

  return (
    <Card className={`border-${color}-200 shadow-sm`}>
      <CardHeader className="flex flex-row items-center gap-3 py-3">
        <div className={`bg-${color}-100 p-2 rounded-full`}>
          <Icon name={icon} className={`h-5 w-5 text-${color}-600`} />
        </div>
        <h3 className="font-medium text-lg">{title}</h3>
        <div className={`ml-auto px-2 py-1 bg-${color}-100 text-${color}-800 rounded-md font-medium text-sm`}>
          {value.toFixed(0)}%
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-4 px-4">
        <p className="text-gray-700 text-sm">{description}</p>
      </CardContent>
    </Card>
  );
};

export const AllPersonalityResults: React.FC<{ results: TestResults }> = ({ results }) => {
  return (
    <div className="space-y-4">
      <PersonalityDescription personality={results.personality} />
      <TemperamentDescription temperament={results.temperament} />
      <ConfidenceDescription confidence={results.confidence} />
      <IrritabilityDescription irritability={results.irritability} />
      <AnxietyDescription anxiety={results.anxiety} />
    </div>
  );
};

export default ResultDescription;
