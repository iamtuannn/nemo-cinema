import { createGlobalStyle } from "styled-components";
import { Breakpoints } from "./Breakpoints";

export const GlobalStyles = createGlobalStyle`
    :root{
        --color-primary: #423F57;
        --color-secondary: rgba(51, 51, 51, 0.7);
        --color-light-blue: #a5abbd;
        --color-nav: rgba(33, 33, 33, 0.98);
        --color-footer: rgba(19, 18, 20, 0.98);
        --color-red: #ca4242;
        --light-red: #dea3a3;
        --deep-peach: #FFC5A3;
        --blue-magenta: #483f5e;
        --vampire-black: #080808;
        --rgba-blue-magenta: rgba(66, 63, 87, 0.8);
        --border: 1px solid hsl(0, 0%, 18.82%);
        --color-magenta: #715d70;
        --text-light: hsla(0, 100%, 100%, 0.88);
        --light: hsla(0, 100%, 100%, 0.88);
        --dark: hsla(248, 14%, 11%, 0.88);
        --shadow-light: 0 4px 8px 0 #ffffff4d;
        --shadow-dark: 0 4px 8px 0 #00000040;
        --dark-gray:#696969 ;
        --dark-blue: #4b4762;
        --dark-pink: #713758;
        --color-lumber: #FFDFD3;
    }

    html, body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-size: 16px;
        height: inherit;
        color: var(--text-light);
        font-family: 'Khand', sans-serif;
    }

    a{
        color: var(--text-light);
        
        :hover{
            color: var(--color-red);
        }
    }

    .logo {
        user-select: none;
    }

    .swal2-timer-progress-bar {
        background: var(--color-red);
    }

    .swal2-popup{
        width: 30rem;
        max-width: 90%;
    }

    .ant-btn-sm{
        height: auto;
    }

    .ant-dropdown-menu-title-content span {
        color: var(--color-primary);
    }

    .ant-checkbox-checked .ant-checkbox-inner{
        background-color: var(--color-primary);
        border-color: var(--color-primary);
    }

    .ant-checkbox-input:focus+.ant-checkbox-inner{
        border-color: var(--color-red);
    }

    .ant-select span{
        color: var(--color-red);;
    }

    ::-webkit-scrollbar{
        width: 0.5rem;
        height: 0.5rem;
        background-color: #424242;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #686868; 
        border-radius: 4px;
    }

    h1, h2, h3, h4{
        margin-bottom: 0;
        color: var(--text-light);
    }

    p, span {
        margin-bottom: 0;
        font-size: 1.2rem;
        font-family: 'Source Sans Pro', sans-serif;
        color: var(--text-light);
        
        ${Breakpoints.md}{
            font-size: 1rem;
        }
    }

    @keyframes fade-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
            transform: none;
        }
    }   

  @keyframes zoom-left {
        0% {
            opacity: 0;
            transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0px, 0px);
            animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
        }
        60% {
            opacity: 1;
            transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0px, 0px);
            animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
        }
    }

    
    @keyframes close {
        0% {
            opacity: 0;
            transform: rotate(0deg);
        }
        100% {
            opacity: 1;
            transform: rotate(45deg);
        }
    }

    @keyframes loading {
        0% {
            background-position: 100% 50%;
        }    
        100% {
            background-position: 0 50%;
        }   
    }







`;
