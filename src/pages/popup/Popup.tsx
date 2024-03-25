import App from './App';
import { AppContextProvider } from './AppContext';

import '@pages/popup/Popup.scss';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';

const Popup = () => {

  return (
    <AppContextProvider>
      <App />
    </AppContextProvider>
  )
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);


