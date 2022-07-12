import { CreateLink, LinkList } from './links'
import { Login } from './auth'
import { Header } from './layout'
import { Search } from './search'

import { Route, Routes, Navigate } from 'react-router-dom'

function App() {
    return (
        <div className="center w85">
            <Header />
            <div className="ph3 pv1 background-gray">
                <Routes>
                    <Route path="/" element={<Navigate replace to="/new/1" />} />
                    <Route
                        path="/create"
                        element={<CreateLink />}
                    />
                    <Route
                        path="/login"
                        element={<Login />}
                    />
                    <Route
                        path="/search"
                        element={<Search />}
                    />
                    <Route path="/top" element={<LinkList />} />
                    <Route
                        path="/new/:page"
                        element={<LinkList />}
                    />
                </Routes>
            </div>
        </div>
    )
}

export default App
