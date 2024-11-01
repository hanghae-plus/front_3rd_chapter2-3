# [6주차] 기본과제

여러분은 게시판을 관리할 수 있는 Admin 코드를 인수인계 받았습니다. 다행히 못 알아볼 정도의 더티코드가 적당히 잘 만든 것 같지만 정리는 된 것 같지 않은 아주 현실감 있는 익숙한 느낌의 코드였습니다.

우리는 지금까지 배웠던 내용을 토대로 해당 코드들을 클린하게 정돈하고 FSD 아키텍쳐를 활용해서 정리해보려고 합니다.

**여러분들은 해당 코드를 분석해보니 다음과 같은 문제점들을 발견할 수 있었습니다.**

1. 컴포넌트가 너무 크고 복잡하다.
2. Typescript를 사용하고 있지만 Type처리가 부실하다.
3. 상태관리의 개념없이 너무 많은 상태를 가지고 있다.
4. useEffect 관리가 안되고 있다.
5. 비동기 처리 로직이 복잡하게 구성되어 있다.

**여러분들은 해당 코드를 개선하기 위해서 다음과 같은 목표를 세웠습니다.**

1. Typescript를 확실히 사용해서 코드의 이해와 리팩토링에 대한 안정성을 확보합니다.
2. 컴포넌트에 단일 책임 원칙을 부여하여 작게 만들고자 합니다.
3. 적절한 관심사의 분리를 통해서 폴더구조를 만드려고 합니다.
4. 이때 배웠던 FSD를 한번 적용해보려고 합니다.

**Basic 과제**

상태관리를 사용하여 관심리를 분리하고 FSD 폴더 구조를 적용하기

```markdown
목표:
상태관리를 이용한 적절한 분리와 계층에 대한 이해를 통한 FSD 폴더 구조 적용하기

- 관심사를 하나만 가지고 있는가!?
- 관심사의 분리에 대한 이해
- FSD(Feature-Sliced Design)에 대한 이해

체크포인트

- [ ] shared 공통 컴포넌트를 분리했나요?
- [ ] shared 공통 로직을 분리했나요?
- [ ] entities를 중심으로 type을 정의하고 model을 분리했나요?
- [ ] entities를 중심으로 ui를 분리했나요?
- [ ] entities를 중심으로 api를 분리했나요?
- [ ] feature별로 ui/model을 분리했나요?
- [ ] widget별로 ui를 분리했나요?
```

# [6주차] 심화과제

여러분들은 비동기 코드가 들어가고 서버와 통신을 하기 시작하니 상태관리가 엄청나게 복잡해진다는 것을 알았습니다. 그래서 서버상태관리를 도입을 하면 보다 함수형 패러다임으로 선언적으로 비동기를 관리할 수 있다는 사실을 알게 되었습니다.

**여러분들은 해당 코드를 개선하기 위해서 다음과 같은 목표를 세웠습니다.**

1. TanstackQuery를 이해하고 적용해보자.
2. api의 관리를 잘 할 수 있는 표준을 만들자.

**Advanced 과제**

TanstackQuery를 이용하여 코드를 개선하기

```markdown
목표:
서버상태관리 도구인 TanstackQuery를 이용하여 비동기코드를 선언적인 함수형 프로그래밍으로 작성하기

- useState를 줄여라!
- TanstackQuery의 사용법에 대한 이해
- TanstackQuery를 이용한 비동기 코드 작성에 대한 이해
- 비동기 코드를 선언적인 함수형 프로그래밍으로 작성하는 방법에 대한 이해

체크포인트

- [ ] 모든 API 호출이 TanStack Query의 useQuery와 useMutation으로 대체되었는가?
- [ ] 쿼리 키가 적절히 설정되었는가?
- [ ] useState가 아닌 선언적인 함수형 프로그래밍이 적절히 적용되었는가?
- [ ] 캐싱과 리프레시 전략이 올바르게 구현되었는가?
```
