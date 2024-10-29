export default [
  {
    ignores: ['node_modules/**'], // 특정 파일 또는 폴더를 무시할 수 있음
  },
  {
    files: ['**/*.js', '**/*.jsx'], // ESLint가 검사할 파일 확장자 지정
    languageOptions: {
      ecmaVersion: 'latest', // 최신 ECMAScript 버전 사용
      sourceType: 'module', // ES 모듈을 지원하도록 설정
    },
    rules: {
      'no-console': 'error', // console.log 사용 금지
      'no-use-before-define': ['error', { functions: false }], // 함수 선언 전 사용 금지
      'comma-dangle': ['error', 'always-multiline'], // 마지막 요소 뒤에 쉼표 사용
      indent: ['error', 2], // 들여쓰기 2칸
      quotes: ['error', 'single'], // 싱글 쿼테이션 사용
      'eol-last': ['error', 'always'], // 파일 끝에 개행 문자 추가
      'no-trailing-spaces': 'error', // 빈 줄 끝에 공백 금지
      eqeqeq: ['error', 'always'], // 일치 연산자 사용
      'object-curly-spacing': ['error', 'always'], // 객체 리터럴 중괄호 사이에 공백 추가
      'no-unused-vars': ['error', { vars: 'all', args: 'none' }], // 사용하지 않는 변수 금지
      'prefer-const': ['error'], // const 사용 권장
      'no-var': 'error', // var 사용 금지
      'max-len': ['error', { code: 120 }], // 코드 한 줄 길이 제한
      'no-shadow': ['error'], // 변수 중복 선언 금지
      'consistent-return': 'error', // 일관된 return 사용
      'arrow-body-style': ['error', 'as-needed'], // 필요할 때만 중괄호 사용
      'no-duplicate-imports': 'error', // 중복된 import 금지
      'prefer-template': 'error', // 문자열 연결 시 템플릿 리터럴 사용 권장
      'no-nested-ternary': 'error', // 중첩된 삼항 연산자 금지
      'spaced-comment': ['error', 'always', { exceptions: ['-', '+'] }], // 주석 앞에 공백 추가
      'react/jsx-newline': [1, { prevent: false }], // JSX 요소를 여러 줄로 작성할 수 있도록 설정
    },
  },
]
