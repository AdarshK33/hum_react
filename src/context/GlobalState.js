import React, { createContext, useState,useReducer,useEffect } from 'react';
import AppReducer from '../reducers/AppReducer';
import ConfigDB from '../data/customizer/config';

export const GlobalContextTheme = createContext();
export const GlobalCustomThemeProvider = ({ children }) => {
    const [state,dispatch] = useReducer(AppReducer);

    const primary_color = localStorage.getItem('primary_color');
    const secondary_color = localStorage.getItem('secondary_color');
    const layout_version = localStorage.getItem('layout_version');
    const sidebar_type = localStorage.getItem('wrapper')
    const body_sidebar_type = localStorage.getItem('bodyWrapper');
    const [modal, setModal] = useState();
    const [rightSidebar, setRightSidebar] = useState(true);
    //const configDB = useSelector(content => content.Customizer.customizer);
     const configDB = ConfigDB.data 
    // console.log("****CONFIG DB.."+JSON.stringify(configDB));
    const color = localStorage.getItem('color')

    const mix_layout = configDB.color.mix_layout;
    const [layout_type, setLayout_type] = useState(configDB.settings.layout_type);
    const config_primary = configDB.color.primary_color;
    const config_secondary = configDB.color.secondary_color;
    const config_color = configDB.color.color;
    const config_layout_version = configDB.color.layout_version;
    configDB.settings.sidebar.wrapper = sidebar_type;
    configDB.settings.sidebar.bodyWrapper = body_sidebar_type;
  

    useEffect(() => {
         dispatch({ type: 'ADD_COSTOMIZER' });   

        dispatch({
            type: 'ADD_COLOR',
            payload: {
                color,
                primary_color,
                secondary_color,
                layout_version,
            }
        })


        //set layout_type
        document.body.setAttribute('main-theme-layout', layout_type);
        document.documentElement.dir = layout_type;

        //set sidebar wrapper
        if(sidebar_type === null && body_sidebar_type === null){
            document.querySelector(".page-wrapper").className = 'page-wrapper ' + configDB.settings.sidebar.wrapper;
            document.querySelector(".page-body-wrapper").className = 'page-body-wrapper ' + configDB.settings.sidebar.bodyWrapper;
        }else{
            document.querySelector(".page-wrapper").className = 'page-wrapper ' + sidebar_type;
            document.querySelector(".page-body-wrapper").className = 'page-body-wrapper ' + body_sidebar_type;
        }

        //set sidebar setting
        document.querySelector(".page-sidebar").setAttribute('sidebar-layout', configDB.settings.sidebar_setting);

        //set colors
        document.body.className = mix_layout;
        document.documentElement.className = color;

        if (localStorage.getItem('primary_color') == null || 
                localStorage.getItem('secondary_color') == null ||
                localStorage.getItem('color') == null ||
                localStorage.getItem('layout_version') == null)
           {
            document.documentElement.className = config_color;
            localStorage.setItem('primary_color', config_primary)
            localStorage.setItem('secondary_color', config_secondary);
            localStorage.setItem('color', config_color);
            localStorage.setItem('layout_version', config_layout_version)
            dispatch({
                type: 'ADD_COLOR',
                payload: {
                    color: config_color,
                    primary_color: config_primary,
                    secondary_color: config_secondary,
                    layout_version: config_layout_version
                }
            })
        }

        if (sidebar_type === 'compact-wrapper' || configDB.settings.sidebar.wrapper === 'compact-wrapper') {
            document.querySelector(".compactLogo").className = 'compactLogo show';
        } else {
            document.querySelector(".compactLogo").className = 'compactLogo hide';
        }
        // eslint-disable-next-line
    }, []);



    function handleSidebarSetting(e) {
        //alert("handleSidebarSetting");
        e.preventDefault();
        document.querySelectorAll(".sidebar-setting li").forEach((item) => {
            item.classList.remove('active');
        });
        document.querySelector(".page-sidebar").setAttribute('sidebar-layout', e.currentTarget.getAttribute('data-attr'));
        e.currentTarget.classList.add('active');
        dispatch({ type: 'ADD_SIDEBAR_SETTINGS', payload: e.currentTarget.getAttribute('data-attr') })
    }

    function handleCustomizerMix(e) {
       // alert("handleCustomizerMix");
        e.preventDefault();
        document.querySelectorAll(".customizer-mix li").forEach((item) => {
            item.classList.remove('active');
        });
        document.body.className = e.currentTarget.getAttribute('data-attr');
        e.currentTarget.classList.add('active');
        dispatch({ type: 'ADD_MIXlAYOUT', payload: e.currentTarget.getAttribute('data-attr') });
    }

    function handleSidebarType(e, wrapper, bodyWrapper)  {
        //("handleSidebarType")
        e.preventDefault();
        document.querySelectorAll(".sidebar-type li").forEach((item) => {
            item.classList.remove('active');
        });
        document.querySelector(".page-wrapper").className = 'page-wrapper ' + wrapper;
        document.querySelector(".page-body-wrapper").className = 'page-body-wrapper ' + bodyWrapper;
        e.currentTarget.classList.add('active');
        dispatch({ type: 'ADD_SIDEBAR_TYPES', payload: { wrapper, bodyWrapper } })
        localStorage.setItem('wrapper', wrapper);
        localStorage.setItem('bodyWrapper', bodyWrapper);
        console.log("sidebar_type", sidebar_type);
        window.location.reload();
    }
    function toggle () {
         //alert("modal")
        setModal(!modal)
    }

    function openCustomizer(){
         //alert("handle openCustomizer");
        if (rightSidebar) {
            setRightSidebar(!rightSidebar)
            document.querySelector(".customizer-contain").classList.add('open');
            document.querySelector(".customizer-links").classList.add('open');
        }
    }

    function closeCustomizer  ()  {
         //alert("closeCustomizer");
        setRightSidebar(!rightSidebar)
        document.querySelector(".customizer-contain").classList.remove('open');
        document.querySelector(".customizer-links").classList.remove('open');
    }

    function handleSidebarColor(e){
         //alert("hanleSidebarColor")
        document.querySelectorAll(".sidebar-bg-settings li").forEach((item) => {
            item.classList.remove('active');
        });
        document.querySelector(".page-sidebar").className = 'page-sidebar ' + e.target.classList.value;
        e.target.classList.add('active');
    }

    function handleLayout(layout)  {
        // alert("handle layout");
        setLayout_type(layout)
        document.querySelectorAll(".main-layout li").forEach((item) => {
            item.classList.remove('active');
        });
        document.body.setAttribute('main-theme-layout', layout);
        document.documentElement.dir = layout;
        dispatch({ type: 'ADD_LAYOUT', payload: layout });
    }

 
    function colorChangeTheme (value) {
             // alert("colorChangeTheme");
        if (value === 'light-1') {
            localStorage.setItem('color', 'color-1');
            localStorage.setItem('layout_version', 'light');
            localStorage.setItem('primary_color', '#4466f2');
            localStorage.setItem('secondary_color', '#1ea6ec');
        } if (value === 'light-2') {
            localStorage.setItem('color', 'color-2');
            localStorage.setItem('layout_version', 'light');
            localStorage.setItem('primary_color', '#0288d1');
            localStorage.setItem('secondary_color', '#26c6da');
        } if (value === 'light-3') {
            localStorage.setItem('color', 'color-3');
            localStorage.setItem('layout_version', 'light');
            localStorage.setItem('primary_color', '#8e24aa');
            localStorage.setItem('secondary_color', '#ff6e40');
        } if (value === 'light-4') {
            localStorage.setItem('color', 'color-4');
            localStorage.setItem('layout_version', 'light');
            localStorage.setItem('primary_color', '#4c2fbf');
            localStorage.setItem('secondary_color', '#2e9de4');
        } if (value === 'light-5') {
            localStorage.setItem('color', 'color-5');
            localStorage.setItem('layout_version', 'light');
            localStorage.setItem('primary_color', '#7c4dff');
            localStorage.setItem('secondary_color', '#7b1fa2');
        } if (value === 'light-6') {
            localStorage.setItem('color', 'color-6');
            localStorage.setItem('layout_version', 'light');
            localStorage.setItem('primary_color', '#3949ab');
            localStorage.setItem('secondary_color', '#4fc3f7');
        } if (value === 'dark-1') {
            localStorage.setItem('color', 'color-1');
            localStorage.setItem('layout_version', 'dark-only');
            localStorage.setItem('primary_color', '#4466f2');
            localStorage.setItem('secondary_color', '#1ea6ec');
        } if (value === 'dark-2') {
            localStorage.setItem('layout_version', 'dark-only');
            localStorage.setItem('primary_color', '#0288d1');
            localStorage.setItem('secondary_color', '#26c6da');
            localStorage.setItem('color', 'color-2');
        } if (value === 'dark-3') {
            localStorage.setItem('layout_version', 'dark-only');
            localStorage.setItem('primary_color', '#8e24aa');
            localStorage.setItem('secondary_color', '#ff6e40');
            localStorage.setItem('color', 'color-3');
        } if (value === 'dark-4') {
            localStorage.setItem('layout_version', 'dark-only');
            localStorage.setItem('primary_color', '#4c2fbf');
            localStorage.setItem('secondary_color', '#2e9de4');
            localStorage.setItem('color', 'color-4');
        } if (value === 'dark-5') {
            localStorage.setItem('layout_version', 'dark-only');
            localStorage.setItem('primary_color', '#7c4dff');
            localStorage.setItem('secondary_color', '#7b1fa2');
            localStorage.setItem('color', 'color-5');
        } if (value === 'dark-6') {
            localStorage.setItem('layout_version', 'dark-only');
            localStorage.setItem('primary_color', '#3949ab');
            localStorage.setItem('secondary_color', '#4fc3f7');
            localStorage.setItem('color', 'color-6');
        }
        window.location.reload();
    }

    return (<GlobalContextTheme.Provider value={{
        closeCustomizer,
        openCustomizer,
        handleSidebarSetting,
        handleLayout,
        handleSidebarType,
        toggle,
        colorChangeTheme,
        handleCustomizerMix,
        handleSidebarColor
    }}>
        {children}
    </GlobalContextTheme.Provider>);
}