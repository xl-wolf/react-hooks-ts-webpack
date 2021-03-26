module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "settings": {
        "import/resolver": {
            "node": {
                "extensions": [".js", ".jsx", ".ts", ".tsx"]
            }
        }
    },
    "parser": "@typescript-eslint/parser",
    "extends": [
        "alloy",
        "alloy/react",
        "alloy/typescript"
    ],
    "globals": {
        // 您的全局变量（设置为 false 表示它不允许被重新赋值）
        // Your global variables (setting to false means it's not allowed to be reassigned)
        //
        // myGlobal: false
    },
    "rules": {
        // 自定义您的规则
        // Customize your rules
        "no-require-imports": 0,
        '@typescript-eslint/no-require-imports': 0,
        'prefer-numeric-literals': 'off',
    }
};
