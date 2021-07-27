import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MultipleInputs from '../components/forms/multipleInputs';
import Login from '../components/forms/login';
import HomePage from './HomePage';
import Home from './forms/home';
import CreateMeals from './forms/createMeal';
import Showmeals from './forms/showMeals';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className="container">
        
        <Switch>
          <Route path="/" component={HomePage} exact={true} />
          <Route path="/Signup" component={MultipleInputs} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home}/>
          <Route path="/createmeal" component={CreateMeals}/>
          
          <Route path="/showmeals" component={Showmeals}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;