import { store } from './store/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routers'

// eslint-disable-next-line @typescript-eslint/no-empty-function
function AppContent() {
    return (
        <div>
            <AppRoutes />
        </div>
    )
}

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </Provider>
    )
}

export default App
