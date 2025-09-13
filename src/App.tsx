import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Bot } from 'lucide-react';

interface Level {
  id: number;
  title: string;
  instruction: string;
  hint: string;
  initialCode: string;
  targetCode: string;
  robots: Array<{ id: number; targetPad: number }>;
  pads: number[];
  property: string;
  description: string;
}

const levels: Level[] = [
  {
    id: 1,
    title: "Welcome to Flexbox Robot!",
    instruction: "Welcome to Flexbox Robot, a game where you help robots reach their charging pads using CSS flexbox! The robot on the left needs to reach the charging pad on the right. You can use the justify-content property to align items horizontally.",
    hint: "justify-content accepts the following values:\nflex-start: Items align to the left side of the container.\nflex-end: Items align to the right side of the container.\ncenter: Items align at the center of the container.\nspace-between: Items display with equal spacing between them.\nspace-around: Items display with equal spacing around them.",
    initialCode: "#pond {\n  display: flex;\n}",
    targetCode: "justify-content: flex-end;",
    robots: [{ id: 1, targetPad: 1 }],
    pads: [1],
    property: "justify-content",
    description: "Use justify-content: flex-end to move the robot to the right side."
  },
  {
    id: 2,
    title: "justify-content",
    instruction: "Use justify-content again to help this robot reach the center charging pad.",
    hint: "justify-content: center will center the robot horizontally.",
    initialCode: "#pond {\n  display: flex;\n}",
    targetCode: "justify-content: center;",
    robots: [{ id: 1, targetPad: 1 }],
    pads: [1],
    property: "justify-content",
    description: "Center the robot using justify-content: center."
  },
  {
    id: 3,
    title: "justify-content",
    instruction: "Now the robot needs to go to the right side again. Use justify-content to send the robot to its charging pad.",
    hint: "Use flex-end to align items to the right side of the container.",
    initialCode: "#pond {\n  display: flex;\n}",
    targetCode: "justify-content: flex-end;",
    robots: [{ id: 1, targetPad: 1 }],
    pads: [1],
    property: "justify-content",
    description: "Move the robot to the right with justify-content: flex-end."
  },
  {
    id: 4,
    title: "justify-content",
    instruction: "When robots are distributed with space-between, the first robot goes to the left side and the last robot goes to the right side.",
    hint: "space-between distributes items evenly with the first item at the start and the last item at the end.",
    initialCode: "#pond {\n  display: flex;\n}",
    targetCode: "justify-content: space-between;",
    robots: [{ id: 1, targetPad: 1 }, { id: 2, targetPad: 2 }],
    pads: [1, 2],
    property: "justify-content",
    description: "Use space-between to distribute robots to opposite ends."
  },
  {
    id: 5,
    title: "align-items",
    instruction: "Now use align-items to help the robot reach the bottom charging pad. This CSS property aligns items vertically.",
    hint: "align-items accepts the following values:\nflex-start: Items align to the top of the container.\nflex-end: Items align to the bottom of the container.\ncenter: Items align at the vertical center of the container.\nbaseline: Items display along the baseline of the container.\nstretch: Items are stretched to fit the container.",
    initialCode: "#pond {\n  display: flex;\n}",
    targetCode: "align-items: flex-end;",
    robots: [{ id: 1, targetPad: 1 }],
    pads: [1],
    property: "align-items",
    description: "Use align-items: flex-end to move the robot to the bottom."
  },
  {
    id: 6,
    title: "justify-content & align-items",
    instruction: "This robot needs to go to the center charging pad. You can use both justify-content and align-items on the same element.",
    hint: "Combine both properties to center the robot both horizontally and vertically.",
    initialCode: "#pond {\n  display: flex;\n}",
    targetCode: "justify-content: center;\n  align-items: center;",
    robots: [{ id: 1, targetPad: 1 }],
    pads: [1],
    property: "both",
    description: "Center the robot both ways using both properties."
  },
  {
    id: 7,
    title: "justify-content & align-items",
    instruction: "The robots need to go to their respective charging pads. Use both justify-content and align-items to get them there.",
    hint: "Use space-around for horizontal distribution and flex-end for vertical alignment.",
    initialCode: "#pond {\n  display: flex;\n}",
    targetCode: "justify-content: space-around;\n  align-items: flex-end;",
    robots: [{ id: 1, targetPad: 1 }, { id: 2, targetPad: 2 }],
    pads: [1, 2],
    property: "both",
    description: "Distribute robots with space-around and align them to the bottom."
  },
  {
    id: 8,
    title: "flex-direction",
    instruction: "The robots need to reach the charging pads below them. Use flex-direction to change the direction of the flex container from horizontal to vertical.",
    hint: "flex-direction accepts the following values:\nrow: Items are placed horizontally (default)\nrow-reverse: Items are placed horizontally in reverse order\ncolumn: Items are placed vertically\ncolumn-reverse: Items are placed vertically in reverse order",
    initialCode: "#pond {\n  display: flex;\n}",
    targetCode: "flex-direction: column;",
    robots: [{ id: 1, targetPad: 1 }, { id: 2, targetPad: 2 }],
    pads: [1, 2],
    property: "flex-direction",
    description: "Change direction to column to stack robots vertically."
  },
  {
    id: 9,
    title: "flex-direction",
    instruction: "Help the robots reach the charging pads in the top row using flex-direction and justify-content.",
    hint: "Use column-reverse to flip the vertical direction, then use justify-content to align to the start.",
    initialCode: "#pond {\n  display: flex;\n}",
    targetCode: "flex-direction: column-reverse;\n  justify-content: flex-start;",
    robots: [{ id: 1, targetPad: 1 }, { id: 2, targetPad: 2 }],
    pads: [1, 2],
    property: "flex-direction",
    description: "Use column-reverse and justify-content to reach the top pads."
  },
  {
    id: 10,
    title: "order",
    instruction: "The robots are in the wrong order! Use the order property to rearrange them. By default, items have an order value of 0, but this can be set to any positive or negative integer.",
    hint: "The order property accepts integer values. Items with lower values appear first.",
    initialCode: "#pond {\n  display: flex;\n}\n\n.robot1 {\n  \n}\n\n.robot2 {\n  \n}",
    targetCode: ".robot1 {\n  order: 2;\n}\n\n.robot2 {\n  order: 1;\n}",
    robots: [{ id: 1, targetPad: 2 }, { id: 2, targetPad: 1 }],
    pads: [1, 2],
    property: "order",
    description: "Use order property to rearrange the robots."
  }
];

function App() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const level = levels[currentLevel];

  useEffect(() => {
    setUserCode(level.initialCode);
    setIsCompleted(false);
    setShowHint(false);
  }, [currentLevel]);

  useEffect(() => {
    checkCompletion();
  }, [userCode]);

  const checkCompletion = () => {
    const normalizedUserCode = userCode.replace(/\s+/g, ' ').toLowerCase().trim();
    const normalizedTargetCode = level.targetCode.replace(/\s+/g, ' ').toLowerCase().trim();
    
    const isComplete = normalizedUserCode.includes(normalizedTargetCode.replace(/\n/g, ''));
    setIsCompleted(isComplete);
  };

  const resetCode = () => {
    setUserCode(level.initialCode);
  };

  const nextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
    }
  };

  const prevLevel = () => {
    if (currentLevel > 0) {
      setCurrentLevel(currentLevel - 1);
    }
  };

  const getRobotStyle = (robotId: number) => {
    const baseStyle = "w-8 h-8 transition-all duration-500 ease-in-out flex items-center justify-center";
    return isCompleted ? `${baseStyle} text-green-400` : `${baseStyle} text-blue-500`;
  };

  const getPadStyle = () => {
    return "w-8 h-8 rounded-lg bg-green-200 border-2 border-green-400 opacity-70";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Bot className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">Flexbox Robot</h1>
          </div>
          <p className="text-gray-600">A game for learning CSS flexbox</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Instructions Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Level {level.id}: {level.title}
                </h2>
                <span className="text-sm text-gray-500">
                  {currentLevel + 1} of {levels.length}
                </span>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                {level.instruction}
              </p>

              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors font-medium"
                >
                  {showHint ? 'Hide' : 'Show'} Hint
                </button>
                <button
                  onClick={resetCode}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>

              {showHint && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <pre className="text-sm text-yellow-800 whitespace-pre-wrap font-mono">
                    {level.hint}
                  </pre>
                </div>
              )}
            </div>

            {/* Code Editor */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gray-800 text-white px-4 py-2 text-sm font-medium">
                CSS Editor
              </div>
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                className="w-full h-64 p-4 font-mono text-sm bg-gray-900 text-green-400 resize-none focus:outline-none border-none"
                placeholder="Write your CSS here..."
                style={{
                  fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                  outline: 'none',
                  border: 'none'
                }}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
              {isCompleted && (
                <div className="bg-green-50 border-t border-green-200 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-green-800 font-medium">Level Complete!</span>
                    </div>
                    {currentLevel < levels.length - 1 && (
                      <button
                        onClick={nextLevel}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
                      >
                        Next Level
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Game Area */}
          <div className="space-y-6">
            {/* Game Board */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Charging Station</h3>
              
              <div className="relative">
                <div 
                  id="pond"
                  className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl p-8 min-h-64 border-2 border-blue-200"
                  style={{
                    display: 'flex',
                    ...(userCode && (() => {
                      const style: any = {};
                      const cssRules = userCode.match(/[^{}]+{[^}]*}/g) || [];
                      
                      cssRules.forEach(rule => {
                        if (rule.includes('#pond') || rule.includes('display: flex')) {
                          const declarations = rule.split('{')[1]?.replace('}', '') || '';
                          declarations.split(';').forEach(decl => {
                            const [prop, value] = decl.split(':').map(s => s.trim());
                            if (prop && value) {
                              const camelCaseProp = prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                              style[camelCaseProp] = value;
                            }
                          });
                        }
                      });
                      return style;
                    })())
                  }}
                >
                  {/* Robots */}
                  {level.robots.map((robot, index) => (
                    <div
                      key={robot.id}
                      className={`robot${robot.id} ${getRobotStyle(robot.id)}`}
                      style={{
                        ...(userCode && (() => {
                          const style: any = {};
                          const cssRules = userCode.match(/[^{}]+{[^}]*}/g) || [];
                          
                          cssRules.forEach(rule => {
                            if (rule.includes(`.robot${robot.id}`)) {
                              const declarations = rule.split('{')[1]?.replace('}', '') || '';
                              declarations.split(';').forEach(decl => {
                                const [prop, value] = decl.split(':').map(s => s.trim());
                                if (prop && value) {
                                  const camelCaseProp = prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                                  style[camelCaseProp] = value;
                                }
                              });
                            }
                          });
                          return style;
                        })())
                      }}
                    >
                      <Bot className="w-6 h-6" />
                    </div>
                  ))}
                </div>

                {/* Target positions overlay */}
                <div 
                  className="absolute inset-0 rounded-xl p-8 pointer-events-none"
                  style={{
                    display: 'flex',
                    justifyContent: level.pads.length === 1 ? 
                      (level.id === 2 ? 'center' : 'flex-end') : 
                      (level.id === 4 ? 'space-between' : 
                       level.id === 7 ? 'space-around' : 'space-between'),
                    alignItems: level.id >= 5 ? 'flex-end' : 'flex-start',
                    flexDirection: level.id >= 8 ? 'column' : 'row',
                    ...(level.id === 9 && { flexDirection: 'column-reverse' as any })
                  }}
                >
                  {level.pads.map((pad) => (
                    <div key={pad} className={getPadStyle()}></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center bg-white rounded-xl shadow-lg p-4">
              <button
                onClick={prevLevel}
                disabled={currentLevel === 0}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <div className="flex gap-1">
                {levels.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentLevel(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentLevel 
                        ? 'bg-blue-600' 
                        : index < currentLevel 
                          ? 'bg-green-500' 
                          : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextLevel}
                disabled={currentLevel === levels.length - 1 || !isCompleted}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-600">
          <p>Learn CSS Flexbox by helping robots reach their charging stations!</p>
        </footer>
      </div>
    </div>
  );
}

export default App;