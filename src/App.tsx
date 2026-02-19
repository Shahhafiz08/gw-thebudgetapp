import { DesktopView } from '@/views/DesktopView';
import { useMortgageCalculator } from '@/controllers/hooks/useMortgageCalculator';

function App() {
  const {
    inputs,
    calculation,
    validation,
    updateInput
  } = useMortgageCalculator();

  return (
    <DesktopView
      inputs={inputs}
      calculation={calculation}
      onInputChange={updateInput}
      validation={validation}
    />
  );
}

export default App;
