import { BrowserRouter, Switch, Route } from "react-router-dom";
import Batch from "./view/batch";

export default () => {

  return (
    <BrowserRouter>
      <Switch>
          <Route path="/" component={Batch}></Route>
      </Switch>
    </BrowserRouter>
  )
}