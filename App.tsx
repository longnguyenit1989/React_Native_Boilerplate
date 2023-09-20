import {Provider} from "react-redux";
import {store} from "./src/redux/store";
import RootNavigationStack from "./src/navigations/rootNavigationStack";

const App = () => {
  return (
      <Provider store={store}>
        <RootNavigationStack />
      </Provider>
  );
};

export default App;
