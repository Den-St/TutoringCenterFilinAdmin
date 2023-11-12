import { Route, Routes } from 'react-router-dom';
import AboutUsSections from '../components/AboutUsSections';
import Classes from '../components/Classes';
import Courses from '../components/Courses';
import CourseThemes from '../components/CourseThemes';
import { Login } from '../components/Login';
import Tests from '../components/Tests';
import VideoLessons from '../components/VideoLessons';
import { navRoutesType } from '../types/routes';
export const routes = {
    classes:'/classes',
    courses:'/courses',
    courseThemes:'/course-themes',
    videoLessons:'/video-lessons',
    tests:'/tests',
    users:'/users',
    login:'/login',
    aboutUsSections:'/aboutUsSections'
}
export type routesKeysType = 'classes' | 'courses' | 'courseThemes' | 'videoLessons' | 'tests' | 'users' | 'login' | 'aboutUsSections';

const baseRoute = '/TutoringCenterFilinAdmin';
const routeWrap = (route:string) => baseRoute + route;
export const wrappedRoutes:Record<routesKeysType,string>  = {
    classes:'',
    courses:'',
    courseThemes:'',
    videoLessons:'',
    tests:'',
    users:'',
    login:'',
    aboutUsSections:''
};
Object.keys(routes).forEach(key => wrappedRoutes[key as routesKeysType] = routeWrap(routes[key as routesKeysType]));

export type adminNavRoutesKeysType = 'users' | 'classes' | 'courses' | 'courseThemes'  | 'aboutUsSections';//| 'tests' | 'videoLessons'
export const adminNavRoutes:Record<adminNavRoutesKeysType,navRoutesType> = {
    users:{
        title:'Користувачі',
        route:wrappedRoutes.users
    },
    classes:{
        title:'Класи',
        route:wrappedRoutes.classes,
    },
    courses:{
        title:'Курси',
        route:wrappedRoutes.courses,
    },
    courseThemes:{
        title:'Теми курсів',
        route:wrappedRoutes.courseThemes,
    },
    // videoLessons:{
    //     title:'Відео уроки',
    //     route:wrappedRoutes.videoLessons,
    // },
    // tests:{
    //     title:'Тести',
    //     route:wrappedRoutes.tests,
    // },
    aboutUsSections:{
        title:'Розділи "Про нас"',
        route:wrappedRoutes.aboutUsSections,
    },
}


export const PublicRoutes = [
    <Route key={wrappedRoutes.login} element={<Login/>} path={wrappedRoutes.login}/>,
    <Route key={adminNavRoutes.classes.route} element={<Classes/>} path={adminNavRoutes.classes.route}/>,
    <Route key={adminNavRoutes.courses.route} element={<Courses/>} path={adminNavRoutes.courses.route}/>,
    <Route key={adminNavRoutes.courseThemes.route} element={<CourseThemes/>} path={adminNavRoutes.courseThemes.route}/>,
    // <Route key={adminNavRoutes.videoLessons.route} element={<VideoLessons/>} path={adminNavRoutes.videoLessons.route}/>,
    // <Route key={adminNavRoutes.tests.route} element={<Tests/>} path={adminNavRoutes.tests.route}/>,
    <Route key={adminNavRoutes.aboutUsSections.route} element={<AboutUsSections/>} path={adminNavRoutes.aboutUsSections.route}/>,

    // <Route key={routes.githubPage} element={<GitHubPages/>} path={routes.githubPage}/>,
]

export const RoutesSwitch = () => {
    return <Routes>
        {PublicRoutes}
    </Routes>
}