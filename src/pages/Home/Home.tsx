import { Outlet } from 'react-router-dom'

import {
    FolderContentContainer,
    HomeContainer,
    TreeGridContainer,
} from './Home.styled'

const Home = () => {
    return (
        <HomeContainer>
            <TreeGridContainer>Tree placeholder</TreeGridContainer>

            <FolderContentContainer>
                <Outlet />
            </FolderContentContainer>
        </HomeContainer>
    )
}

export default Home
