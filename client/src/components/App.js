import { CreateLink, LinkList, UpdateLink } from 'components/links'
import { Login } from 'components/auth'
import { Header } from 'components/layout'
import { Search } from 'components/search'

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
                    <Route
                        path="/link/:id"
                        element={<UpdateLink />}
                    />
                </Routes>
            </div>
        </div>
    )
}

export default App
