import { Route, Routes } from 'react-router-dom';
import Classes from '../components/Classes';
import Courses from '../components/Courses';
import CourseThemes from '../components/CourseThemes';
import { Login } from '../components/Login';
import Tests from '../components/Tests';
import VideoLessons from '../components/VideoLessons';
import { navRoutesType } from '../types/routes';
export const routes = {
    adminClasses:'/classes',
    adminCourses:'/courses',
    adminCourseThemes:'/course-themes',
    adminVideoLessons:'/video-lessons',
    adminTests:'/tests',
    adminUsers:'/users',
    login:'/login'
}
export type routesKeysType = 'adminClasses' | 'adminCourses' | 'adminCourseThemes' | 'adminVideoLessons' | 'adminTests' | 'adminUsers' | 'login';

const baseRoute = '/TutoringCenterFilinAdmin';
const routeWrap = (route:string) => baseRoute + route;
export const wrappedRoutes:Record<routesKeysType,string>  = {
    adminClasses:'',
    adminCourses:'',
    adminCourseThemes:'',
    adminVideoLessons:'',
    adminTests:'',
    adminUsers:'',
    login:''
};
Object.keys(routes).forEach(key => wrappedRoutes[key as routesKeysType] = routeWrap(routes[key as routesKeysType]));

export type adminNavRoutesKeysType = 'users' | 'classes' | 'courses' | 'courseThemes' | 'tests' | 'videoLessons';
export const adminNavRoutes:Record<adminNavRoutesKeysType,navRoutesType> = {
    users:{
        title:'Користувачі',
        route:wrappedRoutes.adminUsers
    },
    classes:{
        title:'Класи',
        route:wrappedRoutes.adminClasses,
    },
    courses:{
        title:'Курси',
        route:wrappedRoutes.adminCourses,
    },
    courseThemes:{
        title:'Теми курсів',
        route:wrappedRoutes.adminCourseThemes,
    },
    videoLessons:{
        title:'Відео уроки',
        route:wrappedRoutes.adminVideoLessons,
    },
    tests:{
        title:'Тести',
        route:wrappedRoutes.adminTests,
    },
}


export const PublicRoutes = [
    <Route key={wrappedRoutes.login} element={<Login/>} path={wrappedRoutes.login}/>,
    <Route key={adminNavRoutes.classes.route} element={<Classes/>} path={adminNavRoutes.classes.route}/>,
    <Route key={adminNavRoutes.courses.route} element={<Courses/>} path={adminNavRoutes.courses.route}/>,
    <Route key={adminNavRoutes.courseThemes.route} element={<CourseThemes/>} path={adminNavRoutes.courseThemes.route}/>,
    <Route key={adminNavRoutes.videoLessons.route} element={<VideoLessons/>} path={adminNavRoutes.videoLessons.route}/>,
    <Route key={adminNavRoutes.tests.route} element={<Tests/>} path={adminNavRoutes.tests.route}/>,

    // <Route key={routes.githubPage} element={<GitHubPages/>} path={routes.githubPage}/>,
]

export const RoutesSwitch = () => {
    return <Routes>
        {PublicRoutes}
    </Routes>
}