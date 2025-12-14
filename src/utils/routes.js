import Main from '../pages/main/main';
import Container from '../pages/Container/Container';
import AddPost from '../pages/AddPost/AddPost';
import Category from '../pages/Category/Category';
import CategoryNews from '../pages/CategoryNews/CategoryNews';
import Update from '../pages/Update/Update'
import AuthForm from '../Components/Auth/AuthForm';


import { HOME_PAGE_ROUTE, CONTAINER_PAGE_ROUTE ,ADD_POST_PAGE_ROUTE,CATEGORY_PAGE_ROUTE,CATEGORY_NEWS_PAGE_ROUTE,UPDATE_PAGE_ROUTE,LOGIN_PAGE_ROUTE,REGISTER_PAGE_ROUTE} from './consts';

export const routes = [
  {
    path: HOME_PAGE_ROUTE,
    element: <Main/>,
  },
  {
    path: CONTAINER_PAGE_ROUTE,
    element: <Container/>,
  },
  {
    path: ADD_POST_PAGE_ROUTE,
    element:<AddPost/>,
  },
  {
    path: CATEGORY_PAGE_ROUTE,
    element:<Category/>,
  },
  {
    path: CATEGORY_NEWS_PAGE_ROUTE,
    element:<CategoryNews/>,
  },
  {
    path:UPDATE_PAGE_ROUTE,
    element:<Update/>,
  },
  {
    path:REGISTER_PAGE_ROUTE,
    element: <AuthForm mode="register" />,
  },
  {
    path:LOGIN_PAGE_ROUTE,
    element: <AuthForm mode="login" />,
  },

];