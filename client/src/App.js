import './styles/App.css'
import LinkList from './components/LinkList'
import CreateLink from './components/CreateLink'
import Login from './components/Login'
import Header from './components/Header'

import { Route, Routes, BrowserRouter } from 'react-router-dom'

function App() {
    return (
        <BrowserRouter>
            <div className="center w85">
                <Header />
                <div className="ph3 pv1 background-gray">
                    <Routes>
                        <Route path="/" element={<LinkList />} />
                        <Route
                            path="/create"
                            element={<CreateLink />}
                        />
                        <Route
                            path="/login"
                            element={<Login />}
                        />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App
