import { Route, Routes } from 'react-router-dom'

import Home from '../pages/Home/Home'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            {/* Not found for 404 */}
            <Route path="*" element={<div>Not Found</div>} />
        </Routes>
    )
}

export default AppRoutes
