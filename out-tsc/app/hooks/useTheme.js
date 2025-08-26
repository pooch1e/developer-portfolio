"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTheme = useTheme;
var react_1 = require("react");
function useTheme() {
    var _a = (0, react_1.useState)(function () {
        if (typeof window !== 'undefined') {
            var saved = localStorage.getItem('theme');
            if (saved) {
                return saved === 'dark';
            }
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    }), isDark = _a[0], setIsDark = _a[1];
    (0, react_1.useEffect)(function () {
        var root = document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);
    var toggleTheme = function () {
        setIsDark(!isDark);
    };
    return { isDark: isDark, toggleTheme: toggleTheme };
}
