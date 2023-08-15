import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import ToasterContext from './app/context/ToasterContext'
import { PageNotFound } from './components/PageNotfound'
import Chat from './page/Chat'

const AuthPage = lazy(() => import('./page/Auth'))
const UserMain = lazy(()=> import('./app/user/UserMain'))

function App() {
    return (
        <Suspense>
                <Routes>
                    <Route path='/auth' element={<AuthPage />} />

                    <Route path='/user' element={<UserMain />} />
                    <Route path='/chat/:id' element={<Chat />} />
                    <Route path='/chat' element={<Chat />} />

                    <Route path='*' element={<PageNotFound />} />
                </Routes>
                <ToasterContext />
        </Suspense>
    )
}

export default App
