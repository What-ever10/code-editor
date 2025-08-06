import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import HomePage from './pages/HomePage';
import EditorPage from './pages/EditorPage';
function App(){
    return (
        <>
        <div>
        <Toaster
            position='top-right'
            toastOptions={{//double //  because one to sepcify that js starts here and one for the object declaration
                success:{
                    theme:{
                        primary:'#4aed88',//green color
                    }
                }
            }}
        ></Toaster>
        </div>
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route
            path="/editor/:roomId"
            element={<EditorPage />}
            ></Route>
        </Routes>
        </BrowserRouter>
        </>
    );
}
export default App;