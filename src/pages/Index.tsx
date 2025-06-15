
import Calculator from "@/components/Calculator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8 drop-shadow-lg">
          Calculator
        </h1>
        <Calculator />
        <p className="text-white/70 mt-6 text-sm">
          A modern calculator built with React & TypeScript
        </p>
      </div>
    </div>
  );
};

export default Index;
