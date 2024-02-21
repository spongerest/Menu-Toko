import { BrowserRouter as Router, Route } from 'react-router-dom';
import AdminLogin from './components/admin/AdminLogin';

// ...

<Router>
    {/* ... other routes */}
    <Route path="/admin/login" component={AdminLogin} />
</Router>
