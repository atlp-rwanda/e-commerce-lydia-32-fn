import React from 'react';

interface TestComponentProps {
  title: string;
}

const TestComponent: React.FC<TestComponentProps> = ({ title }) => {
  return (
    <div className="p-4 bg-blue-500 text-white">
      <h1 className="text-xl font-bold">{title}</h1>
      <p>This is a Test component.</p>
    </div>
  );
};

export default TestComponent;
