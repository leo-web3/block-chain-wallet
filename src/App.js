import { BrowserRouter, Switch, Route } from "react-router-dom";
import Batch from "./view/batch";
import Consecutive from "./view/consecutive";

export default () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Batch} />
        <Route exact path="/consecutive" component={Consecutive} />
      </Switch>
    </BrowserRouter>
  )
}