import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/style.scss';

import {Routes, Route} from 'react-router-dom';
import {DefaultLayout} from 'layouts/Default';
import {ListPage} from 'pages/list/ListPage';
import {DetailPage} from 'pages/detail/DetailPage';


function App() {

   return (
      <Routes>
         <Route path="/" element={<DefaultLayout />}>
            <Route index element={<ListPage />} />
            <Route path=":id" element={<DetailPage />} />
         </Route>
      </Routes>
   );
}

export default App;
