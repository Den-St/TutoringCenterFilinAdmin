import { Route, Routes } from 'react-router-dom';
import Classes from '../components/Classes';
import { Login } from '../components/Login';
import { navRoutesType } from '../types/routes';
export const routes:Record<string,string> = {
    adminClasses:'/classes',
    adminCourses:'/courses',
    adminCourseThemes:'/course-themes',
    adminTests:'/tests',
    adminUsers:'/users',
    login:'/login'
}

export type adminNavRoutesKeysType = 'users' | 'classes' | 'courses' | 'courseThemes' | 'tests';
export const adminNavRoutes:Record<adminNavRoutesKeysType,navRoutesType> = {
    users:{
        title:'Users',
        route:routes.adminUsers
    },
    classes:{
        title:'Classes',
        route:routes.adminClasses,
    },
    courses:{
        title:'Courses',
        route:routes.adminCourses,
    },
    courseThemes:{
        title:'Course themes',
        route:routes.adminCourseThemes,
    },
    tests:{
        title:'Tests',
        route:routes.adminTests,
    },
}



export const PublicRoutes = [
    <Route key={routes.login} element={<Login/>} path={routes.login}/>,
    <Route key={adminNavRoutes.classes.route} element={<Classes/>} path={adminNavRoutes.classes.route}/>,

    // <Route key={routes.githubPage} element={<GitHubPages/>} path={routes.githubPage}/>,
]

export const RoutesSwitch = () => {
    return <Routes>
        {PublicRoutes}
    </Routes>
}